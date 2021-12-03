<?php

/**
 * Setup meta fields
 *
 * @package ThemePlate
 * @since 0.1.0
 */

namespace ThemePlate\Core;

use ThemePlate\Core\Helper\Field;
use ThemePlate\Core\Helper\Meta;

class Fields {

	private $collection;


	public function __construct( $collection ) {

		if ( ! is_array( $collection ) || empty( $collection ) ) {
			throw new \Exception();
		}

		$this->collection = $this->filter( $collection );

	}


	private function filter( $fields ) {

		$processed = array();

		foreach ( $fields as $id => $field ) {
			if ( ! is_array( $field ) || empty( $field ) ) {
				continue;
			}

			$field = Field::filter( $field );

			if ( 'group' === $field['type'] ) {
				if ( array_key_exists( 'fields', $field ) && ! empty( $field['fields'] ) ) {
					$field['fields'] = $this->filter( $field['fields'] );
				} else {
					continue;
				}
			}

			$field['id'] = $id;

			$processed[ $id ] = $field;
		}

		return $processed;

	}


	public function setup( $metabox_id = '', $object_type = 'post', $object_id = 0 ) {

		foreach ( $this->collection as $id => $field ) {
			$object_menu = false;

			$field['id'] = $metabox_id . '_' . $id;
			if ( 'options' === $object_type ) {

				$options = get_option( $object_id );
				$stored  = isset( $options[ $field['id'] ] ) ? $options[ $field['id'] ] : '';
				$key     = $object_id;
			} else {

				if ( 'menu' === $object_type ) {
					$object_type = 'post';
					$object_menu = true;
				}

				$stored = get_metadata( $object_type, $object_id, $field['id'], ! $field['repeatable'] );
				$key    = 'themeplate';
			}

			$value = $stored ?: $field['default'];
			$name  = $key . '[' . $field['id'] . ']';

			if ( $object_menu ) {
				$name .= '[' . $object_id . ']';

				$object_type = 'menu';
			}

			$this->layout( $field, $value, $name );
		}

	}


	private function layout( $field, $value, $name ) {

		$current = count( (array) $value );

		if ( $current < $field['minimum'] ) {
			$balance = $field['minimum'] - $current;
			$value   = array_merge( (array) $value, array_fill( $current, $balance, null ) );
		}

		/* phpcs:disable Generic.WhiteSpace.ScopeIndent.IncorrectExact */
		echo '<div class="field-wrapper type-' . esc_attr( $field['type'] ) . ' ' . esc_attr( $field['style'] ) . '">';
			Meta::render_options( $field );

			if ( ! empty( $field['title'] ) || ! empty( $field['description'] ) ) {
				echo '<div class="field-label">';
					echo ! empty( $field['title'] ) ? '<label class="label" for="' . esc_attr( $field['id'] ) . '">' . esc_html( $field['title'] ) . '</label>' : '';
					echo ! empty( $field['description'] ) ? '<p class="description">' . $field['description'] . '</p>' : ''; // phpcs:ignore WordPress.XSS.EscapeOutput.OutputNotEscaped
				echo '</div>';
			}

			echo '<div class="field-input' . ( esc_attr( $field['repeatable'] ) ? ' repeatable' : '' ) . '" data-min="' . esc_attr( $field['minimum'] ) . '" data-max="' . esc_attr( $field['maximum'] ) . '">';
				if ( ! $field['repeatable'] ) {
					$field['value'] = $value;
					$field['name']  = $name;

					$this->render( $field );
				} else {
					$base_id = $field['id'];

					foreach ( (array) $value as $i => $val ) {
						$field['value'] = $val;
						$field['id']    = $base_id . '_' . $i;
						$field['name']  = $name . '[' . $i . ']';

						$this->cloner( $field );
					}

					$field['value'] = $field['default'];
					$field['id']    = $base_id . '_i-x';
					$field['name']  = $name . '[i-x]';
					$field['count'] = count( (array) $value );

					$this->cloner( $field, true );
				}

				echo ! empty( $field['information'] ) ? '<p class="description">' . $field['information'] . '</p>' : ''; // phpcs:ignore WordPress.XSS.EscapeOutput.OutputNotEscaped
			echo '</div>';
		echo '</div>';
		/* phpcs:enable */

	}


	private function cloner( $field, $last = false ) {

		echo '<div class="themeplate-clone' . ( $last ? ' hidden' : '' ) . '">';
			echo '<div class="themeplate-handle"></div>';
			$this->render( $field );
			echo '<button type="button" class="button-link attachment-close media-modal-icon"><span class="screen-reader-text">Remove</span></button>';

		if ( 'group' === $field['type'] ) {
			echo '<fieldset class="themeplate-mover">';
				echo '<button type="button" class="button-link clone-move" data-move="up">Move Up</button>';
				echo '<button type="button" class="button-link clone-move" data-move="down">Move Down</button>';
			echo '</fieldset>';
		}

		echo '</div>';

		if ( $last ) {
			echo '<input type="button" class="button clone-add" value="Add Field" />';
			echo '<div class="button disabled themeplate-counter">';

			if ( $field['repeatable'] && $field['maximum'] ) {
				echo 'Remaining : <strong>' . ( $field['maximum'] - $field['count'] ) . '</strong>';
			}

			echo '</div>';
		}

	}


	private function render( $field ) {

		if ( 'custom' === $field['type'] ) {
			call_user_func( $field['callback'], $field );

			return;
		}

		if ( 'group' !== $field['type'] ) {
			Field::render( $field );

			return;
		}

		foreach ( $field['fields'] as $id => $sub ) {
			$sub['id'] = $field['id'] . '_' . $id;

			$stored = isset( $field['value'][ $id ] ) ? $field['value'][ $id ] : '';
			$value  = $stored ?: $sub['default'];
			$name   = $field['name'] . '[' . $id . ']';

			$this->layout( $sub, $value, $name );
		}

	}


	public function get_collection() {

		return $this->collection;

	}

}
