<?php

/**
 * Helper for registered dependencies
 *
 * @package CardanoPress\Dependencies\ThemePlate
 * @since   0.1.0
 */

namespace CardanoPress\Dependencies\ThemePlate\Enqueue;

class StylesTag extends LoaderTag {

	public const MAIN_PROPERTY = 'href';

	// https://developer.mozilla.org/en-US/docs/Web/HTML/Element/style#attributes
	public const ATTRIBUTES = array(
		'as',
		'disabled',
		'fetchpriority',
		'href',
		'hreflang',
		'imagesizes',
		'imagesrcset',
		'media',
		'rel',
		'sizes',
		'title',

		// deprecated
		'rev',
		'type',

		// non-standard
		'target',

		// custom
		'noscript',
	);

}
