<?php

/**
 * @package ThemePlate
 * @since   0.1.0
 */

namespace PBWebDev\NamiPress;

class Collection
{
    private array $data;

    public const ASSETS_URL = 'https://ipfs.blockfrost.dev/ipfs';

    public function __construct(array $data)
    {
        $this->data = $data;
    }

    public function getAssetData(string $name): array
    {
        $list = array_values($this->data);
        $assets = array_column($list, 'asset_name');
        $index = array_search($name, $assets, true);

        if (false === $index) {
            return [];
        }

        return $list[$index];
    }

    public function filteredAsset(): array
    {
        $data = $this->data;

        if ($this->shouldSkip($data)) {
            return [];
        }

        $data['packed_name'] = pack("H*", $data['asset_name']);
        $data['parsed_image'] = '';

        if (isset($data['onchain_metadata']['image'])) {
            $data['parsed_image'] = $this->getImageSrc($data['onchain_metadata']['image']);
        } elseif (isset($data['metadata']['logo'])) {
            $data['parsed_image'] = $this->getImageSrc($data['metadata']['logo'], true);
        }

        return $data;
    }

    private function shouldSkip(array $data): bool
    {
        if (empty($data)) {
            return true;
        }

        $app = Application::instance();
        $policyIds = $app->option('policy_ids');
        $values = array_column($policyIds, 'value');

        if (! in_array($data['policy_id'], $values, true)) {
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
        } elseif ($this->startsWith("ipfs://", $link)) {
            return str_replace(
                'ipfs:/',
                self::ASSETS_URL,
                $link,
            );
        } elseif (
            ($this->startsWith("Qm", $link) && 46 === strlen($link)) ||
            ($this->startsWith("baf", $link) && 59 === strlen($link))
        ) {
            return self::ASSETS_URL . $link;
        } elseif ($base64 && preg_match('/^([0-9a-zA-Z+\/]{4})*(([0-9a-zA-Z+\/]{2}==)|([0-9a-zA-Z+\/]{3}=))?$/', $link)) {
            return "data:image/png;base64," . $link;
        } elseif ($this->startsWith("data:image", $link)) {
            return $link;
        }

        return '';
    }

    private function startsWith(string $query, string $string): bool
    {
        return substr($string, 0, strlen($query)) === $query;
    }
}
