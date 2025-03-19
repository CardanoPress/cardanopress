<?php

namespace CardanoPress\Helpers;

class LicenseHelper
{
    public static function isValid(?array $data): bool
    {
        if (empty($data)) {
            return false;
        }

        return isset($data['license']) && 'valid' === $data['license'];
    }

    public static function statusHandler(string $raw, array $config): string
    {
        $data = json_decode($raw, true);
        $action = self::isValid($data) ? __('Deactivate') : __('Activate');

        ob_start();
        ?>
        <div id="<?php echo str_replace('_status', '', $config['id']); ?>">
            <button class="button" data-action-type="<?php echo strtolower($action); ?>_license">
                <?php echo $action; ?>
            </button>
            <strong class="result"><?php echo ucfirst($data['license'] ?? ''); ?></strong>
            <span class="spinner" style="margin-top: -4px; float: none;"></span>
        </div>
        <?php
        return ob_get_clean();
    }

    public static function customStyle(string $page): void
    {
        $uid = $page . '_license';

        ob_start();
        ?>
        <style>
            #<?php echo $uid; ?>
            {
                display: flex;
                align-items: center;
                gap: 1rem;
            }

            #<?php echo $uid; ?>_key
            {
                width: 100%;
            }
        </style>
        <?php
        echo wp_kses(ob_get_clean(), ['style' => []]);
    }

    public static function customScript(string $page): void
    {
        $action = $page . '_license';

        ob_start();
        ?>
        <script>
            jQuery(function() {
                var $key = jQuery('#<?php echo $action . '_key'; ?>')

                if ('password' === $key.attr('type')) {
                    $key.attr('readonly', 'readonly')
                }
            });

            jQuery(document).on('click', '#<?php echo $action; ?> .button', function(e) {
                e.preventDefault()

                var $this = jQuery(this)
                var $spinner = $this.siblings('.spinner')
                var $result = $this.siblings('.result')
                var $key = jQuery('#<?php echo $action . '_key'; ?>')
                var $status = jQuery('#<?php echo $action . '_status'; ?>')

                if ('' === $key.val()) {
                    return
                }

                jQuery.ajax({
                    type: 'POST',
                    url: ajaxurl,
                    data: {
                        _wpnonce: '<?php echo wp_create_nonce($action); ?>',
                        action: '<?php echo $action; ?>',
                        type: $this.data('action-type'),
                        license: $key.val()
                    },
                    beforeSend: function() {
                        $result.html('').hide()
                        $spinner.addClass('is-active')
                    }
                }).done(function(e) {
                    var message = e.data.message

                    $spinner.removeClass('is-active')
                    $status.val(JSON.stringify(e.data.response))

                    if (e.data.response.success) {
                        var action = $this.text().trim()

                        $this.text(action + 'd').prop('disabled', true)
                        message += ' <?php echo __('Saving');?>...'

                        if ('Deactivate' === action) {
                            $key.val('')
                            $status.val('')
                        }

                        setTimeout(function() {
                            jQuery('#submit').click()
                        }, 1500)
                    }

                    $result.html(message).show()
                })
            })
        </script>
        <?php
        echo wp_kses(ob_get_clean(), ['script' => [], 'input' => ['type' => [], 'name' => []]]);
    }
}
