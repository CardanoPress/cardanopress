(function( $, TP ) {

	'use strict';


	$.extend( TP.checkersElements, {
		'template': $( '#page_template' ),
		'format': $( 'input[name="post_format"]' ),
		'parent': $( '#parent_id' ),
	});

	$.extend( TP.checkCallbacks, {
		template: function( value ) {
			var current = TP.checkersElements['template'].val();

			if ( TP.compareValue( current, '/', 'contains' ) ) {
				current = current.substr( current.lastIndexOf( '/' ) + 1 );
			}

			return TP.compareValue( current, TP.sureArray( value ), 'in' );
		},
		format: function( value ) {
			var current = TP.checkersElements['format'].filter( ':checked' ).val();

			if ( current === 0 ) {
				current = 'standard';
			}

			return TP.compareValue( current, TP.sureArray( value ), 'in' );
		},
		parent: function( value ) {
			var current = TP.checkersElements['parent'].val();
			current = parseInt( current );

			if ( isNaN( current ) ) {
				current = -1;
			}

			return TP.compareValue( current, TP.sureArray( value ), 'in' );
		},
		term: function( argument ) {
			var taxonomy = argument[0];
			var value = argument[1];
			var $checker = $( '#' + taxonomy + 'checklist :checked' );
			var current = [];

			$checker.each( function() {
				current.push( parseInt( $( this ).val() ) );
			});

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

	$.extend( TP.eventListeners, {
		template: function( callback ) {
			TP.checkersElements['template'].on( 'change', callback );
		},
		format: function( callback ) {
			TP.checkersElements['format'].on( 'change', callback );
		},
		term: function( callback, taxonomy ) {
			$( '#' + taxonomy + 'checklist' ).on( 'change', callback );
		},
	});

}( jQuery, window.ThemePlate ));
