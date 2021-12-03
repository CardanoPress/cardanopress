/* global wp */

(function( $, TP ) {

	'use strict';


	var changesHolder = {};
	var initialized = false;


	$.extend( TP.checkCallbacks, {
		'template': function( value ) {
			var current = wp.data.select( 'core/editor' ).getEditedPostAttribute( 'template' );

			if ( TP.compareValue( current, '/', 'contains' ) ) {
				current = current.substr( current.lastIndexOf( '/' ) + 1 );
			}

			return TP.compareValue( current, TP.sureArray( value ), 'in' );
		},
		'format': function( value ) {
			var current = wp.data.select( 'core/editor' ).getEditedPostAttribute( 'format' );
			return TP.compareValue( current, TP.sureArray( value ), 'in' );
		},
		'parent': function( value ) {
			var current = wp.data.select( 'core/editor' ).getEditedPostAttribute( 'parent' );
			current = parseInt( current );

			return TP.compareValue( current, TP.sureArray( value ), 'in' );
		},
		term: function( argument ) {
			var taxonomy = argument[0];
			var value = argument[1];
			var current = wp.data.select( 'core/editor' ).getEditedPostAttribute( taxonomy );

			for ( var i in current ) {
				if ( ! Object.prototype.hasOwnProperty.call( current, i ) ) {
					continue;
				}

				if ( TP.compareValue( current[i], TP.sureArray( value ), 'in' ) ) {
					return true;
				}
			}

			return false;
		},
	});


	function listenDataChanges() {
		if ( ! wp.data ) {
			return;
		}

		if ( ! initialized ) {
			applyCurrentChanges();
			initialized = true;
		}

		wp.data.subscribe( function() {
			var currentChanges = wp.data.select( 'core/editor' ).getPostEdits();

			if ( changesHolder !== currentChanges ) {
				changesHolder = currentChanges;
				applyCurrentChanges();
			}
		} );
	}

	function applyCurrentChanges() {
		$( '.themeplate-options' ).each( function() {
			var $this = $( this );
			var $container = TP.getContainer( $this );
			var conditions;

			if ( $this.data( 'show' ) ) {
				conditions = $this.data( 'show' );
				TP.maybeShowHide( $container, 'show', conditions );
			}

			if ( $this.data( 'hide' ) ) {
				conditions = $this.data( 'hide' );
				TP.maybeShowHide( $container, 'hide', conditions );
			}
		});
	}


	$( window ).on( 'load', listenDataChanges );

}( jQuery, window.ThemePlate ));
