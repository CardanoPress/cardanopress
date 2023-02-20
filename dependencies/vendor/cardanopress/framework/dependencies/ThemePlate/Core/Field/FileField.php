<?php

/**
 * Setup a field type
 *
 * @package CardanoPress\Dependencies\ThemePlate
 * @since 0.1.0
 */

namespace CardanoPress\Dependencies\ThemePlate\Core\Field;

use CardanoPress\Dependencies\ThemePlate\Core\Field;

class FileField extends Field {

	protected function can_have_multiple_value(): bool {

		return true;

	}


	public function render( $value ): void {

		$options = wp_json_encode( $this->get_config( 'options' ) );

		echo '<input type="hidden" name="' . esc_attr( $this->get_config( 'name' ) ) . '" />';
		echo '<div
				id="' . esc_attr( $this->get_config( 'id' ) ) . '"
				class="themeplate-file' . ( $this->get_config( 'multiple' ) ? ' multiple' : ' single' ) . '"
				data-options="' . esc_attr( $options ) . '">';
		echo '<div class="preview-holder">';

		if ( ! $this->get_config( 'multiple' ) ) {
			echo '<div class="attachment placeholder">';
			echo '<input type="button" class="button attachment-add' . ( $value ? ' hidden' : '' ) . '" value="Select" />';
			echo '</div>';
		}

		if ( $value ) {
			foreach ( (array) $value as $file ) {
				$name    = basename( get_attached_file( $file ) );
				$info    = wp_check_filetype( $name );
				$type    = wp_ext2type( $info['ext'] );
				$preview = ( 'image' === $type ? wp_get_attachment_url( $file ) : includes_url( '/images/media/' ) . $type . '.png' );

				echo '<div class="attachment"><div class="attachment-preview landscape"><div class="thumbnail">';
				echo '<div class="centered"><img src="' . esc_attr( $preview ) . '" alt="' . esc_attr( get_the_title( $file ) ) . '"/></div>';
				echo '<div class="filename"><div>' . esc_html( $name ) . '</div></div>';
				echo '</div></div>';
				echo '<button type="button" class="button-link attachment-close media-modal-icon"><span class="screen-reader-text">Remove</span></button>';
				echo '<input
					type="hidden"
					name="' . esc_attr( $this->get_config( 'name' ) ) . ( $this->get_config( 'multiple' ) ? '[]' : '' ) . '"
					value="' . esc_attr( $file ) . '" />';
				echo '</div>';
			}
		}

		echo '</div>';

		if ( $this->get_config( 'multiple' ) ) {
			echo '<input type="button" class="button attachment-add" value="Add" />';
			echo '<input type="button" class="button attachments-clear' . ( ! $value ? ' hidden' : '' ) . '" value="Clear" />';
		}

		echo '</div>';

	}

}
