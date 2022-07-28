<?php

/**
 * @package ThemePlate
 * @since   0.1.0
 */

namespace PBWebDev\CardanoPress;

class Collection
{
    private array $data;

    public const ASSETS_URL = 'https://ipfs.blockfrost.dev/ipfs';
    public const ADA_HANDLE = [
        'mainnet' => 'f0ff48bbb7bbe9d59a40f1ce90e9e9d0ff5002ec48f232b49ca0fb9a',
        'testnet' => 'c21f8b778503fbcee295d6e633c125f70bcc16c897d8873163c6577e',
    ];

    public function __construct(array $data)
    {
        $this->data = $data;
    }

    public static function wantedPolicyIds(array $custom = array()): array
    {
        $policyIds = Application::getInstance()->option('policy_ids');

        return array_merge(
            array_values(self::ADA_HANDLE),
            array_column($policyIds, 'value'),
            array_filter($custom)
        );
    }

    public function filteredAsset(int $quantity = 0): array
    {
        $data = $this->data;

        if ($this->shouldSkip($data)) {
            return [];
        }

        $data['_quantity'] = $quantity;
        $data['packed_name'] = pack("H*", $data['asset_name']);
        $data['parsed_image'] = '';

        if (isset($data['onchain_metadata']['image'])) {
            $link = $data['onchain_metadata']['image'];

            if (is_array($link)) {
                $link = implode('', $link);
            }

            $data['parsed_image'] = $this->getImageSrc($link);
        } elseif (isset($data['metadata']['logo'])) {
            $data['parsed_image'] = $this->getImageSrc($data['metadata']['logo'], true);
        }

        return $data;
    }

    public function grabHandle(): string
    {
        $data = $this->data;

        if (empty($data) || ! in_array($data['policy_id'], self::ADA_HANDLE, true)) {
            return '';
        }

        return $data['onchain_metadata']['name'] ?? '';
    }

    private function shouldSkip(array $data): bool
    {
        if (empty($data)) {
            return true;
        }

        if (
            ! empty($data['onchain_metadata']) &&
            1 === count($data['onchain_metadata']) &&
            $data['policy_id'] === array_key_first($data['onchain_metadata'])
        ) {
            return true;
        }

        return false;
    }

    private function getImageSrc(string $link, bool $base64 = false): string
    {
        if ($this->startsWith("https://", $link)) {
            return $link;
        }

        if ($this->startsWith("ipfs://", $link)) {
            return str_replace(
                'ipfs:/',
                self::ASSETS_URL,
                $link,
            );
        }

        if (
            ($this->startsWith("Qm", $link) && 46 === strlen($link)) ||
            ($this->startsWith("baf", $link) && 59 === strlen($link))
        ) {
            return self::ASSETS_URL . $link;
        }

        if ($base64 && preg_match('/^([0-9a-zA-Z+\/]{4})*(([0-9a-zA-Z+\/]{2}==)|([0-9a-zA-Z+\/]{3}=))?$/', $link)) {
            return "data:image/png;base64," . $link;
        }

        if ($this->startsWith("data:image", $link)) {
            return $link;
        }

        return '';
    }

    private function startsWith(string $query, string $string): bool
    {
        return 0 === strpos($string, $query);
    }
}
