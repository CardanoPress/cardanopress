<?php

/**
 * Setup meta fields
 *
 * @package CardanoPress\Dependencies\ThemePlate
 * @since 0.1.0
 */

namespace CardanoPress\Dependencies\ThemePlate\Core;

use CardanoPress\Dependencies\ThemePlate\Core\Helper\FieldsHelper;
use CardanoPress\Dependencies\ThemePlate\Core\Helper\FormHelper;
use CardanoPress\Dependencies\ThemePlate\Core\Helper\MetaHelper;

class Fields {

	/**
	 * @var Field[]
	 */
	protected array $collection;


	public function __construct( array $collection ) {

		$this->collection = $this->filter( $collection );

	}


	/**
	 * @return Field[]
	 */
	protected function filter( array $fields ): array {

		$processed = array();

		foreach ( $fields as $id => $field ) {
			if ( $field instanceof Field ) {
				$processed[ $id ] = $field;

				continue;
			}

			if ( ! is_array( $field ) || empty( $field ) ) {
				continue;
			}

			if ( empty( $field['type'] ) ) {
				$field['type'] = Field::DEFAULTS['type'];
			}

			if ( 'group' === $field['type'] && empty( $field['fields'] ) ) {
				continue;
			}

			$processed[ $id ] = FormHelper::make_field( $id, $field );

		}

		return $processed;

	}


	public function layout( Field $field, $value ): void {

		$field->maybe_adjust( $value );

		$field_config = $field->get_config();

		/* phpcs:disable Generic.WhiteSpace.ScopeIndent.IncorrectExact */
		echo '<div class="field-wrapper ' . $field->get_classname() . '">'; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
			MetaHelper::render_options( $field_config );

			if ( ! empty( $field->get_config( 'title' ) ) || ! empty( $field->get_config( 'description' ) ) ) {
				echo '<div class="field-label">';
					echo ! empty( $field->get_config( 'title' ) ) ? '<label class="label" for="' . esc_attr( $field->get_config( 'id' ) ) . '">' . esc_html( $field->get_config( 'title' ) ) . '</label>' : '';
					echo ! empty( $field->get_config( 'description' ) ) ? '<p class="description">' . $field->get_config( 'description' ) . '</p>' : ''; // phpcs:ignore WordPress.XSS.EscapeOutput.OutputNotEscaped
				echo '</div>';
			}

			echo '<div class="field-input' . ( esc_attr( $field->get_config( 'repeatable' ) ) ? ' repeatable' : '' ) . '" data-min="' . esc_attr( $field->get_config( 'minimum' ) ) . '" data-max="' . esc_attr( $field->get_config( 'maximum' ) ) . '">';
				if ( ! $field->get_config( 'repeatable' ) ) {
					$field->render( $value );
				} else {
					$base_id   = $field->get_config( 'id' );
					$base_name = $field->get_config( 'name' );

					foreach ( $value as $i => $val ) {
						$field->set_id( $base_id . '_' . $i );
						$field->set_name( $base_name . '[' . $i . ']' );
						$this->cloner( $field, $val );
					}

					$field->set_id( $base_id . '_i-x' );
					$field->set_name( $base_name . '[i-x]' );
					$this->cloner( $field, $field->clone_value(), true );
				}

				echo ! empty( $field->get_config( 'information' ) ) ? '<p class="description">' . $field->get_config( 'information' ) . '</p>' : ''; // phpcs:ignore WordPress.XSS.EscapeOutput.OutputNotEscaped
			echo '</div>';
		echo '</div>';
		/* phpcs:enable */

	}


	protected function cloner( Field $field, $value, bool $last = false ): void {

		echo '<div class="themeplate-clone' . ( $last ? ' hidden' : '' ) . '">';
			echo '<div class="themeplate-handle"></div>';
			$field->render( $value );
			echo '<button type="button" class="button-link attachment-close media-modal-icon"><span class="screen-reader-text">Remove</span></button>';

		if ( 'group' === $field->get_config( 'type' ) ) {
			echo '<fieldset class="themeplate-mover">';
				echo '<button type="button" class="button-link clone-move" data-move="up">Move Up</button>';
				echo '<button type="button" class="button-link clone-move" data-move="down">Move Down</button>';
			echo '</fieldset>';
		}

		echo '</div>';

		if ( $last ) {
			echo '<input type="button" class="button clone-add" value="Add Field" />';
			echo '<div class="button disabled themeplate-counter">';

			if ( $field->get_config( 'repeatable' ) && $field->get_config( 'maximum' ) ) {
				echo 'Remaining : <strong>' . ( $field->get_config( 'maximum' ) - $field->get_config( 'count' ) ) . '</strong>'; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
			}

			echo '</div>';
		}

	}


	/**
	 * @return Field[]
	 */
	public function get_collection(): array {

		return $this->collection;

	}

}
