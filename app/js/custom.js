var POLLEXE = POLLEXE || {};

(function($) {
	// USE STRICT
	"use strict";

	POLLEXE.initialize = {

		init: function() {
			POLLEXE.initialize.general();
			POLLEXE.initialize.mobileMenu();
			POLLEXE.initialize.components();
		},

		/*==================================*/
		/*=           Reuseable Component          =*/
		/*==================================*/
		components: function() {

		},

		/*==================================*/
		/*=           General          =*/
		/*==================================*/
		general: function() {

		},

		/*==================================*/
		/*=           Mobile Menu          =*/
		/*==================================*/
		mobileMenu: function() {

		},
		
	};

	POLLEXE.documentOnReady = {
		init: function() {
			POLLEXE.initialize.init();
			
		},
	};

	POLLEXE.documentOnLoad = {
		init: function() {
			
		},
	};

	POLLEXE.documentOnResize = {
		init: function() {

		},
	};

	POLLEXE.documentOnScroll = {
		init: function() {
			if ($(this).scrollTop() > 400) {
				$(".backtotop").fadeIn(500);
			} else {
				$(".backtotop").fadeOut(500);
			}
		},
	};

	// Initialize Functions
	$(document).ready(POLLEXE.documentOnReady.init);
	$(window).on('load', POLLEXE.documentOnLoad.init);
	$(window).on('resize', POLLEXE.documentOnResize.init);
	$(window).on('scroll', POLLEXE.documentOnScroll.init);

})(jQuery);