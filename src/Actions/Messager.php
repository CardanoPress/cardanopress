<?php

/**
 * @package ThemePlate
 * @since   0.1.0
 */

namespace PBWebDev\CardanoPress\Actions;

use CardanoPress\Foundation\AbstractMessager;
use PBWebDev\CardanoPress\Manifest;

class Messager extends AbstractMessager
{
    public const HOOK_PREFIX = 'cardanopress_';

    /** @return array{
     *     'ajax': array{
     *         'notPermitted': string,
     *         'somethingWrong': string,
     *     } & array<string, string>,
     *     'error': array{
     *         'unauthorized': string,
     *         'incomplete': string,
     *     } & array<string, string>,
     *     'script': array<string, string>,
     * } */
    public static function customizableMessages(): array
    {
        return [
            'script' => [
                'connected' => __('Successfully connected', 'cardanopress'),
                'connecting' => __('Connecting...', 'cardanopress'),
                'verifying' => __('Verifying...', 'cardanopress'),
                'reconnected' => __('Wallet reconnected', 'cardanopress'),
                'reconnecting' => __('Reconnecting...', 'cardanopress'),
                'walletSyncing' => __('Syncing...', 'cardanopress'),
                'newAssetsPulled' => __('New assets pulled', 'cardanopress'),
                'handleSaving' => __('Saving...', 'cardanopress'),
                'delegating' => __('Processing...', 'cardanopress'),
                'paying' => __('Processing...', 'cardanopress'),
                'clipboardCopy' => __('Successfully copied', 'cardanopress'),
            ],
            'ajax' => [
                /* translators: %s: connected username */
                'welcome' => __('Welcome %s', 'cardanopress'),
                'connected' => __('Successfully connected', 'cardanopress'),
                'walletSynced' => __('Successfully synced', 'cardanopress'),
                'handleSaved' => __('Successfully saved', 'cardanopress'),
                /* translators: %s: transaction action */
                'successfulTransaction' => __('Successful %s', 'cardanopress'),
                'somethingWrong' => __('Something is wrong. Please try again', 'cardanopress'),
                /* translators: %s: cardano environment */
                'unsupportedNetwork' => __('Unsupported network %s', 'cardanopress'),
                'blockfrostError' => __('Blockfrost API Error. Please try again', 'cardanopress'),
                'notPermitted' => __('You don\'t have permission to do this.', 'cardanopress'),
                'incorrectSignature' => __('Provided data signature is incorrect.', 'cardanopress'),
            ],
            'error' => [
                /* translators: %s: http origin */
                'unauthorized' => __('Bad AJAX request. Unauthorized HTTP origin %s', 'cardanopress'),
                'incomplete' => __('Bad AJAX request. Received missing required field/s data.', 'cardanopress'),
                'delegation' => __('Incomplete delegation settings. Empty pool details.', 'cardanopress'),
                'transaction' => __('Unable to save transaction details to user meta.', 'cardanopress'),
                'payment' => __('Incomplete payment settings. Empty wallet address to send funds.', 'cardanopress'),
                'blockfrost' => __('Bad blockfrost response. Actual data received in separate log.', 'cardanopress'),
            ],
        ];
    }

    protected static function localizeScript(array $messages): void
    {
        $messages['dataMessage'] = CoreAction::dataMessage();

        wp_localize_script(Manifest::HANDLE_PREFIX . 'script', 'cardanoPressMessages', $messages);
    }
}
