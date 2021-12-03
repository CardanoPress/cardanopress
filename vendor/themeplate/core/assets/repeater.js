(function( $ ) {

	'use strict';


	$( document ).on( 'click', '.clone-add', function( e ) {
		e.preventDefault();

		var $field = $( this ).siblings( '.hidden' );
		var $cloned = $field.clone( true );

		setIndex( $cloned, getIndex( $field ) );
		$cloned.removeClass( 'hidden' ).insertBefore( $field ).trigger( 'clone' );
		setRequired( $( this ).closest( '.repeatable' ) );
	});

	$( document ).on( 'click', '.themeplate-clone .attachment-close', function( e ) {
		e.preventDefault();

		if ( confirm( 'Are you sure?' ) ) {
			setRequired( $( this ).closest( '.repeatable' ), true );
			$( this ).closest( '.themeplate-clone' ).remove();
		}
	});

	$( document ).on( 'click', '.clone-move', function( e ) {
		e.preventDefault();

		var $field = $( this ).closest( '.themeplate-clone' );

		if ( 'up' === $( this ).data( 'move' ) ) {
			$field.prev().before( $field );
		} else {
			$field.next().after( $field );
		}

		setRequired( $field.closest( '.repeatable' ) );
	});

	$( '.field-input.repeatable' ).each( function () {
		var $this = $( this );
		var index = $this.children( '.themeplate-clone' ).length;

		$this.data( 'index', index - 1 );
		$this.sortable( {
			handle: '.themeplate-handle',
			axis: 'y',
			opacity: 0.65,
			items: '> .themeplate-clone:not( .hidden )',
			tolerance: 'pointer',
			placeholder: 'themeplate-clone clone-placeholder',
			start: function ( e, ui ) {
				ui.placeholder.height( ui.item.height() );
			},
			update: function() {
				setRequired( $this );
			}
		} );

		setRequired( $this );
	} );


	function getIndex( $field ) {
		var $input = $field.closest( '.field-input' );
		var index = $input.data( 'index' );

		$input.data( 'index', index + 1 );
		return index;
	}

	var indexAttributes = ['id', 'name', 'for'];

	function setIndex( $field, index ) {
		$field.find( '[' + indexAttributes.join( '],[' ) + ']' ).each( function() {
			for ( var i in indexAttributes ) {
				if ( ! Object.prototype.hasOwnProperty.call( indexAttributes, i ) ) {
					continue;
				}

				if ( $( this ).attr( indexAttributes[i] ) === undefined ) {
					continue;
				}

				var value = $( this ).attr( indexAttributes[i] ).replace( /i-(\d|x)/, index );
				$( this ).attr( indexAttributes[i], value );
			}
		});
	}


	function setRequired( $field, $delayed = false ) {
		$field.find( '> .themeplate-clone' ).removeClass( 'required' )
			.slice( 0, $field.data( 'min' ) ).addClass( 'required' );

		$field.find( '> .themeplate-counter strong' ).html( $field.data( 'max' ) + $delayed - $field.find( '> .themeplate-clone' ).length + 1 );

		if ( $field.data( 'max' ) > 0 && $field.find( '> .themeplate-clone' ).length - 1 >= $field.data( 'max' ) + $delayed ) {
			$field.addClass( 'maxed' ).find( '> .clone-add, > .themeplate-counter' ).hide();
		} else {
			$field.removeClass( 'maxed' ).find( '> .clone-add, > .themeplate-counter' ).show();
		}
	}

}( jQuery ));
