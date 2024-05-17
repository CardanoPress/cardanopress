/* global wp, wpLink, ThemePlate */

(function( $ ) {

	'use strict';


	$( 'div[id^="themeplate_"].postbox' ).addClass( 'themeplate' );

	$( '.themeplate .fields-container.seamless' ).removeClass( 'seamless' )
		.parents( '.themeplate' ).addClass( 'seamless' )
		.find( '.hndle' ).removeClass();


	$( '.meta-box-sortables' ).on( 'sortstart', function() {
		if ( $( '#after_title-sortables' ).is( ':empty' ) || $( '#after_title-sortables' ).children( ':visible' ).length === 0 ) {
			$( '#after_title-sortables' ).css( 'min-height', 20 );
		}
	});

	$( '.meta-box-sortables' ).on( 'sortstop', function() {
		if ( $( '#after_title-sortables' ).is( ':empty' ) || $( '#after_title-sortables' ).children( ':visible' ).length === 0 ) {
			$( '#after_title-sortables' ).css( 'min-height', '' );
		}
	});


	$( document ).on( 'click', '.tpo.postbox .hndle, .tpo.postbox .handlediv', function() {
		var $el = $( this ),
			p = $el.parent( '.postbox' ),
			ariaExpandedValue;

		p.toggleClass( 'closed' );

		ariaExpandedValue = ! p.hasClass( 'closed' );

		if ( $el.hasClass( 'handlediv' ) ) {
			$el.attr( 'aria-expanded', ariaExpandedValue );
		} else {
			$el.closest( '.postbox' ).find( 'button.handlediv' )
				.attr( 'aria-expanded', ariaExpandedValue );
		}
	});


	var meta_media_frame;

	$( document ).on( 'click', '.themeplate-file .attachment-add', function( e ) {
		e.preventDefault();

		var $parent = $( this ).parents( '.themeplate-file' );
		var isMultiple = false;

		if ( $parent.hasClass( 'multiple' ) ) {
			isMultiple = true;
		}

		var fieldname = $parent.siblings( 'input' ).attr( 'name' ) + ( isMultiple ? '[]' : '' );

		meta_media_frame = wp.media( $.extend( {
			title: 'Select Media',
			multiple: isMultiple
		}, $parent.data( 'options' ) ) );

		meta_media_frame.on( 'select', function() {
			var selection = meta_media_frame.state().get( 'selection' ).toJSON();
			var src, centered, filename, field, close, preview;

			if ( isMultiple ) {
				$parent.find( '.attachments-clear' ).removeClass( 'hidden' );
			} else {
				$parent.find( '.attachment-add' ).addClass( 'hidden' );
			}

			$parent.find( '.hidden.placeholder' ).remove();

			selection.forEach( function( media ) {
				src = ( media.type === 'image' ? media.url : media.icon );
				centered = '<div class="centered"><img src="' + src + '"/></div>';
				filename = '<div class="filename"><div>' + media.filename + '</div></div>';
				field = '<input type="hidden" name="' + fieldname + '" value="' + media.id + '">';
				close = '<button type="button" class="button-link attachment-close media-modal-icon"><span class="screen-reader-text">Remove</span></button>';
				preview = '<div class="attachment"><div class="attachment-preview landscape"><div class="thumbnail">' + centered + filename +'</div></div>' + close + field + '</div>';

				$parent.find( '.preview-holder' ).append( preview );
			});
		});

		meta_media_frame.open();
	});

	$( document ).on( 'click', '.themeplate-file .attachments-clear', function( e ) {
		e.preventDefault();

		var $parent = $( this ).parents( '.themeplate-file' );

		$parent.find( '.preview-holder' ).html( '' );
		$( this ).addClass( 'hidden' );
	});

	$( document ).on( 'click', '.themeplate-file .attachment-close', function( e ) {
		e.preventDefault();

		var $parent = $( this ).parents( '.themeplate-file' );
		var isMultiple = false;
		var $attachment = $( this ).parents( '.attachment' );

		if ( $parent.hasClass( 'multiple' ) ) {
			isMultiple = true;
		}

		if ( ! isMultiple ) {
			$attachment.siblings( '.placeholder' ).find( '.attachment-add' ).removeClass( 'hidden' );
		}

		$attachment.remove();

		if ( ! $parent.find( '.preview-holder' ).html().length ) {
			$parent.find( '.attachments-clear' ).addClass( 'hidden' );
		}
	});

	$( '.themeplate-file.multiple' ).sortable( {
		opacity: 0.65,
		placeholder: 'attachment clone-placeholder',
		items: '.attachment'
	});


	$( document ).on( 'click', '.themeplate-link .link-select', function( e ) {
		e.preventDefault();

		var $this = $( this );
		var $parent = $this.parents( '.themeplate-link' );
		var p_id = $parent.attr( 'id' );
		var $textarea = $( '<textarea id="themeplate-' + p_id + '" class="hidden"></textarea>' );
		var $url = $this.siblings( '.input-url' );
		var $text = $this.siblings( '.input-text' );
		var $target = $this.siblings( '.input-target' );

		$( document ).one( 'wplink-open', function() {
			$( '#wp-link-text' ).val( $text.val() );
			$( '#wp-link-url' ).val( $url.val() );
			$( '#wp-link-target' ).prop( 'checked', $target.val() === '_blank' );
		});

		$( document ).one( 'wplink-close', function() {
			$textarea.remove();

			setTimeout( function(){
				$this.siblings( '.link-holder' )
					.html( '<span>' + $text.val() + '</span>' )
					.append( '<a href="' + $url.val() + '" target="_blank">' + $url.val() + '</a>' );
			}, 100 );
		});

		$parent.append( $textarea );
		wpLink.open( 'themeplate-' + p_id );

		$( '#wp-link-submit' ).one( 'click', function() {
			var link_text = $( '#wp-link-text' ).val();
			var link_url = $( '#wp-link-url' ).val();

			if ( ! link_text ) {
				link_text = link_url;
			}

			if ( link_url ) {
				$text.val( link_text );
				$url.val( link_url );
				$target.val( $( '#wp-link-target' ).prop( 'checked' ) ? '_blank' : '_self' );
				$this.siblings( '.link-remove' ).removeClass( 'hidden' );
			}
		});
	});

	$( document ).on( 'click', '.themeplate-link .link-remove', function( e ) {
		e.preventDefault();

		var $this = $( this );

		$this.siblings( '.input-url' ).val( '' );
		$this.siblings( '.input-text' ).val( '' );
		$this.siblings( '.input-target' ).val( '' );
		$this.siblings( '.link-holder' ).html( '' );
		$this.addClass( 'hidden' );
	});


	function preloadDates( loaded ) {
		var dates = [];

		loaded.split( ',' ).forEach( function( value ) {
			dates.push( new Date( value ) );
		});

		return dates;
	}


	function handleFields() {
		$( '.themeplate-color-picker' ).each( function() {
			if ( $( this ).closest( '.themeplate-clone' ).hasClass( 'hidden' ) ) {
				return;
			}

			$( this ).wpColorPicker();
		});

		$( '.themeplate-date-picker' ).each( function() {
			if ( $( this ).closest( '.themeplate-clone' ).hasClass( 'hidden' ) ) {
				return;
			}

			$( this ).bootstrapDP( {
				container: $( this ).parents( '.wrapper' ),
				format: 'yyyy-mm-dd',
				multidate: $( this ).hasClass( 'multiple' ),
				clearBtn: $( this ).data( 'none' ),
			}).on( 'changeDate', function( e ) {
				var $element = $( e.target );
				var selected = $element.bootstrapDP( 'getFormattedDate' );

				$element.find( 'input' ).val( selected );

				if ( $element.hasClass( 'multiple' ) && selected ) {
					var list = '<li>' + selected.split(',').join('</li><li>') + '</li>';
					$element.next().html( $( list ) );
				}
			});

			var loaded = $( this ).find( 'input' ).val();

			if ( loaded ) {
				$( this ).bootstrapDP( 'setDate', preloadDates( loaded ) );
			}
		});

		$( '.themeplate-select2' ).each( function() {
			if ( $( this ).closest( '.themeplate-clone' ).hasClass( 'hidden' ) ) {
				return;
			}

			var $this = $( this );
			var s2data = {};
			var oajax;

			if ( $this.siblings( '.select2-options' ).length !== 0 ) {
				s2data.action  = $this.siblings( '.select2-options' ).data( 'action' );
				s2data.options = $this.siblings( '.select2-options' ).data( 'options' );
				s2data.value   = $this.siblings( '.select2-options' ).data( 'value' );

				if ( $.isEmptyObject( s2data.value ) ) {
					s2data.value = [ s2data.value ];
				}

				oajax = {
					url: ThemePlate.ajax_url,
					delay: 250,
					cache: true,
					dataType: 'json',
					data: function( params ) {
						$this = $( this ).siblings( '.select2-options' );

						return {
							search: params.term,
							_page: { paged: params.page || 1 },
							action: s2data.action,
							options: s2data.options,
						};
					},
					processResults: function( data ) {
						return data;
					},
				};
			}

			$this.select2( {
				width: '100%',
				allowClear: $this.data( 'none' ),
				placeholder: '— Select —',
				dropdownCssClass: 'themeplate-select2',
				containerCssClass: 'themeplate-select2',
				ajax: oajax ? oajax : null,
				templateSelection: function (data, container) {
					$( data.element ).attr( 'data-title', data.text );
					return data.text;
				}
			});

			if ( ! $.isEmptyObject( s2data ) && s2data.value !== '""' ) {
				$.ajax( {
					url: ThemePlate.ajax_url,
					dataType: 'json',
					data: {
						search: '',
						_page: { paged: 1 },
						action: s2data.action,
						options: s2data.options,
						ids__in: s2data.value,
					},
					success: function( data ) {
						var selected = $.map( data.results, function( item ) {
							return {
								index: $.isEmptyObject( s2data.value ) ? 0 : s2data.value.indexOf( item.id ),
								option: new Option( item.text, item.id, true, true ),
							};
						}).sort( function( a, b ) {
							return a.index - b.index;
						}).map( function( item ) {
							return item.option;
						});

						$this.html( selected ).trigger( 'change' );
						$this.siblings( 'select[disabled]' ).remove()
							.end().addClass( 'loaded' );
					},
				});
			} else {
				$this.siblings( 'select[disabled]' ).remove()
					.end().addClass( 'loaded' );
			}

			if ( ! $this.attr( 'multiple' ) ) {
				return;
			}

			var $ul = $this.next( '.select2-container' ).find( 'ul' );

			$ul.sortable( {
				opacity: 0.65,
				stop: function() {
					$ul.find( '.select2-selection__choice' ).each( function( i, obj ) {
						var $option = $this.find( '[data-title="' + obj.title + '"]' );
						$option.detach().appendTo( $this );
					});
				}
			});
		});
	}

	wp.domReady( function() {
		console.log( 'ThemePlate!' );

		handleFields();
	});
	$( document ).on( 'clone', handleFields );

}( jQuery ));
