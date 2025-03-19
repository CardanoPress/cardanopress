<?php

/**
 * @package ThemePlate
 * @since   0.1.0
 */

namespace CardanoPress\Traits;

use CardanoPress\Helpers\LicenseHelper;

trait HasLicense
{
    protected function licenseKeyConfig(callable $optionGetter): array
    {
        $status = $optionGetter('license_status');
        $data = json_decode($status, true);
        $isValid = LicenseHelper::isValid($data);

        return [
            'data_prefix' => 'license_',
            'fields'      => [
                'key'    => [
                    'type' => $isValid ? 'password' : 'text',
                ],
                'status' => [
                    'type'     => 'html',
                    'required' => true,
                    'options'  => [LicenseHelper::class, 'statusHandler'],
                ],
            ],
        ];
    }
}
