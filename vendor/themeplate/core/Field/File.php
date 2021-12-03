<?php

/**
 * Setup a field type
 *
 * @package ThemePlate
 * @since 0.1.0
 */

namespace ThemePlate\Core\Field;

class File {

	public static function render( $field ) {

		$options = wp_json_encode( $field['options'] );
		echo '<input type="hidden" name="' . esc_attr( $field['name'] ) . '" />';
		echo '<div id="' . esc_attr( $field['id'] ) . '" class="themeplate-file' . ( $field['multiple'] ? ' multiple' : ' single' ) . '" data-options="' . esc_attr( $options ) . '">';
		echo '<div class="preview-holder">';
		if ( ! $field['multiple'] ) {
			echo '<div class="attachment placeholder">';
			echo '<input type="button" class="button attachment-add' . ( $field['value'] ? ' hidden' : '' ) . '" value="Select" />';
			echo '</div>';
		}
		if ( $field['value'] ) {
			foreach ( (array) $field['value'] as $file ) {
				$name    = basename( get_attached_file( $file ) );
				$info    = wp_check_filetype( $name );
				$type    = wp_ext2type( $info['ext'] );
				$preview = ( 'image' === $type ? wp_get_attachment_url( $file ) : includes_url( '/images/media/' ) . $type . '.png' );
				echo '<div class="attachment"><div class="attachment-preview landscape"><div class="thumbnail">';
				echo '<div class="centered"><img src="' . esc_attr( $preview ) . '" alt="' . esc_attr( get_the_title( $file ) ) . '"/></div>';
				echo '<div class="filename"><div>' . esc_html( $name ) . '</div></div>';
				echo '</div></div>';
				echo '<button type="button" class="button-link attachment-close media-modal-icon"><span class="screen-reader-text">Remove</span></button>';
				echo '<input type="hidden" name="' . esc_attr( $field['name'] ) . ( $field['multiple'] ? '[]' : '' ) . '" value="' . esc_attr( $file ) . '" />';
				echo '</div>';
			}
		}
		echo '</div>';
		if ( $field['multiple'] ) {
			echo '<input type="button" class="button attachment-add" value="Add" />';
			echo '<input type="button" class="button attachments-clear' . ( ! $field['value'] ? ' hidden' : '' ) . '" value="Clear" />';
		}
		echo '</div>';

	}

}
