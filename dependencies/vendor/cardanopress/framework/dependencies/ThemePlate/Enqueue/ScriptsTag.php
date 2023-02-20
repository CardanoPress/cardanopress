<?php

/**
 * Helper for registered dependencies
 *
 * @package CardanoPress\Dependencies\ThemePlate
 * @since   0.1.0
 */

namespace CardanoPress\Dependencies\ThemePlate\Enqueue;

class ScriptsTag extends LoaderTag {

	public const MAIN_PROPERTY = 'src';

	// https://developer.mozilla.org/en-US/docs/Web/HTML/Element/script#attributes
	public const ATTRIBUTES = array(
		'async',
		'defer',
		'nomodule',
		'nonce',
		'src',
	);

}
