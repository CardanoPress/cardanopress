<?php // phpcs:ignoreFile

/**
 * CardanoPress security audit — stake-address binding check.
 *
 * Detects accounts that may have been taken over via the pre-1.36.1 wallet-login
 * vulnerability, where `stake_address` was accepted as an unsigned request
 * parameter and used as the account identity. A hijacked account has a stored
 * wallet address (the attacker's, which WAS signature-verified) whose embedded
 * stake credential does NOT match the stored stake address (the victim's).
 *
 * This script is READ-ONLY. It changes nothing; it only reports.
 *
 * Run (from the WordPress root, with WP-CLI):
 *
 *     wp eval-file wp-content/plugins/cardanopress/tools/audit-stake-binding.php
 *
 * Statuses:
 *   OK       wallet is a base address and its stake credential matches the stored stake
 *   SUSPECT  base wallet whose stake credential does NOT match the stored stake  <-- investigate
 *   REVIEW   wallet has no verifiable stake binding (enterprise/pointer) — stake was self-asserted
 *   ERROR    an address could not be decoded / had an unexpected format
 *
 * Reported vulnerability: Cullah (@CullahMusic, https://valt.digital/).
 */

if (! defined('ABSPATH')) {
    fwrite(STDERR, "This script must be run inside WordPress (e.g. `wp eval-file`).\n");
    exit(1);
}

/* ----------------------------------------------------------------------------
 * bech32 (BIP-173) decode — no length limit, as Cardano addresses exceed 90 chars.
 * ------------------------------------------------------------------------- */

/** @param array<int, int> $values */
function cp_audit_polymod(array $values): int
{
    $gen = [0x3b6a57b2, 0x26508e6d, 0x1ea119fa, 0x3d4233dd, 0x2a1462b3];
    $chk = 1;

    foreach ($values as $v) {
        $b   = $chk >> 25;
        $chk = (($chk & 0x1ffffff) << 5) ^ $v;

        for ($i = 0; $i < 5; $i++) {
            if (($b >> $i) & 1) {
                $chk ^= $gen[$i];
            }
        }
    }

    return $chk;
}

/** @return array<int, int> */
function cp_audit_hrp_expand(string $hrp): array
{
    $out = [];
    $len = strlen($hrp);

    for ($i = 0; $i < $len; $i++) {
        $out[] = ord($hrp[$i]) >> 5;
    }

    $out[] = 0;

    for ($i = 0; $i < $len; $i++) {
        $out[] = ord($hrp[$i]) & 31;
    }

    return $out;
}

/**
 * @param array<int, int> $data
 * @return array<int, int>|null
 */
function cp_audit_convertbits(array $data, int $from, int $to, bool $pad): ?array
{
    $acc    = 0;
    $bits   = 0;
    $ret    = [];
    $maxv   = (1 << $to) - 1;
    $maxacc = (1 << ($from + $to - 1)) - 1;

    foreach ($data as $value) {
        if ($value < 0 || ($value >> $from) !== 0) {
            return null;
        }

        $acc   = (($acc << $from) | $value) & $maxacc;
        $bits += $from;

        while ($bits >= $to) {
            $bits -= $to;
            $ret[] = ($acc >> $bits) & $maxv;
        }
    }

    if ($pad) {
        if ($bits > 0) {
            $ret[] = ($acc << ($to - $bits)) & $maxv;
        }
    } elseif ($bits >= $from || (($acc << ($to - $bits)) & $maxv) !== 0) {
        return null;
    }

    return $ret;
}

/** @return array{0:string,1:string}|null [hrp, hex] */
function cp_audit_bech32_to_hex(string $bech): ?array
{
    if ('' === $bech) {
        return null;
    }

    $hasLower = strtolower($bech) === $bech;
    $hasUpper = strtoupper($bech) === $bech;

    if (! $hasLower && ! $hasUpper) {
        return null; // mixed case is invalid
    }

    $bech = strtolower($bech);
    $pos  = strrpos($bech, '1');

    if (false === $pos || $pos < 1 || $pos + 7 > strlen($bech)) {
        return null;
    }

    $hrp      = substr($bech, 0, $pos);
    $dataPart = substr($bech, $pos + 1);

    if (false === $dataPart) {
        return null;
    }

    $alphabet = 'qpzry9x8gf2tvdw0s3jn54khce6mua7l';
    $data     = [];

    for ($i = 0, $n = strlen($dataPart); $i < $n; $i++) {
        $d = strpos($alphabet, $dataPart[$i]);

        if (false === $d) {
            return null;
        }

        $data[] = $d;
    }

    if (1 !== cp_audit_polymod(array_merge(cp_audit_hrp_expand($hrp), $data))) {
        return null; // bad checksum
    }

    $bytes = cp_audit_convertbits(array_slice($data, 0, count($data) - 6), 5, 8, false);

    if (null === $bytes) {
        return null;
    }

    $hex = '';

    foreach ($bytes as $byte) {
        $hex .= sprintf('%02x', $byte);
    }

    return [$hrp, $hex];
}

/* ----------------------------------------------------------------------------
 * Audit
 * ------------------------------------------------------------------------- */

$users = get_users([
    'meta_key'     => 'cardanopress_connected_wallet',
    'meta_compare' => 'EXISTS',
    'fields'       => ['ID', 'user_login'],
    'number'       => -1,
]);

$counts  = ['OK' => 0, 'SUSPECT' => 0, 'REVIEW' => 0, 'ERROR' => 0, 'SKIP' => 0];
$flagged = [];

printf("CardanoPress stake-binding audit — %d account(s) with a connected wallet\n", count($users));
echo str_repeat('=', 92) . "\n";

foreach ($users as $user) {
    $wallet  = (string) get_user_meta($user->ID, 'cardanopress_connected_wallet', true);
    $stake   = (string) get_user_meta($user->ID, 'cardanopress_connected_stake', true);
    $network = (string) get_user_meta($user->ID, 'cardanopress_connected_network', true);

    if ('' === $wallet || '' === $stake) {
        $counts['SKIP']++;
        continue;
    }

    $status = 'OK';
    $detail = '';

    $walletDecoded = cp_audit_bech32_to_hex($wallet);
    $stakeDecoded  = cp_audit_bech32_to_hex($stake);

    if (null === $walletDecoded || null === $stakeDecoded) {
        $status = 'ERROR';
        $detail = 'undecodable address (wallet or stake)';
    } else {
        $walletHex  = $walletDecoded[1];
        $stakeHex   = $stakeDecoded[1];
        $walletType = hexdec(substr($walletHex, 0, 2)) >> 4;
        $walletNet  = hexdec(substr($walletHex, 0, 2)) & 0x0f;
        $stakeNet   = hexdec(substr($stakeHex, 0, 2)) & 0x0f;

        if ($walletType > 3) {
            // 4/5 pointer, 6/7 enterprise, 14/15 reward: no verifiable base->stake binding.
            $status = 'REVIEW';
            $detail = 'wallet has no embedded stake credential (enterprise/pointer); stake was self-asserted';
        } elseif (strlen($walletHex) !== 2 + 56 + 56) {
            $status = 'ERROR';
            $detail = 'base address of unexpected length';
        } else {
            $walletStakeCred = strtolower(substr($walletHex, 2 + 56, 56)); // last 28 bytes
            $storedStakeCred = strtolower(substr($stakeHex, 2, 56));       // reward cred, 28 bytes

            if ($walletNet !== $stakeNet) {
                $status = 'SUSPECT';
                $detail = 'wallet/stake network mismatch';
            } elseif ($walletStakeCred !== $storedStakeCred) {
                $status = 'SUSPECT';
                $detail = 'stored stake does NOT match the wallet\'s stake credential';
            }
        }
    }

    // Integrity note: the account login should be md5() of its stored stake address.
    if (md5($stake) !== $user->user_login) {
        $detail = trim($detail . '; user_login != md5(stake)', '; ');

        if ('OK' === $status) {
            $status = 'REVIEW';
        }
    }

    $counts[$status]++;

    if ('OK' !== $status) {
        $flagged[] = [$status, $user->ID, $user->user_login, $network, $wallet, $stake, $detail];
    }
}

foreach ($flagged as $row) {
    [$status, $id, $login, $network, $wallet, $stake, $detail] = $row;
    printf("[%-7s] user #%d (%s) net=%s\n", $status, $id, $login, $network ?: '?');
    printf("           wallet: %s\n", $wallet);
    printf("           stake : %s\n", $stake);
    printf("           note  : %s\n", $detail);
    echo str_repeat('-', 92) . "\n";
}

echo "\nSummary:\n";
printf("  OK      : %d\n", $counts['OK']);
printf("  SUSPECT : %d   <-- likely account takeover; investigate and remediate\n", $counts['SUSPECT']);
printf("  REVIEW  : %d   <-- stake not cryptographically bound; manual review\n", $counts['REVIEW']);
printf("  ERROR   : %d   <-- could not decode; manual review\n", $counts['ERROR']);
printf("  SKIPPED : %d   (no wallet or stake stored)\n", $counts['SKIP']);

if ($counts['SUSPECT'] > 0) {
    echo "\nAt least one SUSPECT account was found. Do NOT bulk-delete: the same md5(stake)\n";
    echo "username may belong to the legitimate owner. Recommended per-account steps:\n";
    echo "  1. Force a logout / password (stake-hash) reset for the affected user.\n";
    echo "  2. Contact the on-chain owner of the stored stake address to confirm identity.\n";
    echo "  3. Review any privileged roles or actions taken by the account since creation.\n";
}
