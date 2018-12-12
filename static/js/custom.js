/*

	Template Name: Eventor - Conference & Event HTML Template
	Author: Themewinter
	Author URI: https://themeforest.net/user/themewinter
	Description: Eventor - Conference & Event HTML Template
	Version: 1.0

	1. Mobile Menu
	2. Main Slideshow
	3. Gallery popup
	4. Counter
	5. Contact form
	6. Back to top
  
*/


jQuery(function($) {
  "use strict";


	/* ----------------------------------------------------------- */
	/*  Mobile Menu
	/* ----------------------------------------------------------- */

	jQuery(".nav.navbar-nav li a").on("click", function() { 
		jQuery(this).parent("li").find(".dropdown-menu").slideToggle();
		jQuery(this).find("i").toggleClass("fa-angle-down fa-angle-up");
	});


	/* ----------------------------------------------------------- */
	/*  Event counter 
	/* -----------------------------------------------------------*/

	if ( $( '.countdown' ).length > 0 ) {
		$(".countdown").jCounter({
		  	date: $('#start-date').val() + ' 08:00:00',
		  	fallback: function() { console.log("count finished!") }
		});
	}


	/* ----------------------------------------------------------- */
	/*  Main slideshow
	/* ----------------------------------------------------------- */

		$('#main-slide').carousel({
			pause: true,
			interval: 100000,
		});


	/* ----------------------------------------------------------- */
	/*  Gallery popup
	/* ----------------------------------------------------------- */

	  $(document).ready(function(){

			$(".gallery-popup").colorbox({rel:'gallery-popup', transition:"fade", innerHeight:"700"});

			$(".popup").colorbox({iframe:true, innerWidth:650, innerHeight:450});

	  });



	/* ----------------------------------------------------------- */
	/*  Counter
	/* ----------------------------------------------------------- */

		$('.counterUp').counterUp({
		 delay: 10,
		 time: 1000
		});


	
	/* ----------------------------------------------------------- */
	/*  Contact form
	/* ----------------------------------------------------------- */

	$('#contact-form').submit(function(){

		var $form = $(this),
			$error = $form.find('.error-container'),
			action  = $form.attr('action');

		$error.slideUp(750, function() {
			$error.hide();

			var $name = $form.find('.form-control-name'),
				$email = $form.find('.form-control-email'),
				$subject = $form.find('.form-control-subject'),
				$message = $form.find('.form-control-message');

			$.post(action, {
					name: $name.val(),
					email: $email.val(),
					subject: $subject.val(),
					message: $message.val()
				},
				function(data){
					$error.html(data);
					$error.slideDown('slow');

					if (data.match('success') != null) {
						$name.val('');
						$email.val('');
						$subject.val('');
						$message.val('');
					}
				}
			);

		});

		return false;

	});


	/* ----------------------------------------------------------- */
	/*  Back to top
	/* ----------------------------------------------------------- */

		$(window).scroll(function () {
			if ($(this).scrollTop() > 300) {
				 $('#back-to-top').fadeIn();
			} else {
				 $('#back-to-top').fadeOut();
			}
		});

		// scroll body to 0px on click
		$('#back-to-top').on('click', function () {
			 $('#back-to-top').tooltip('hide');
			 $('body,html').animate({
				  scrollTop: 0
			 }, 800);
			 return false;
		});
		
		$('#back-to-top').tooltip('hide');
		$('[data-toggle="tooltip"]').tooltip({'placement': 'bottom'});

    /* ----------------------------------------------------------- */
    /*  Ralative menu
    /* ----------------------------------------------------------- */

        if($(window).width() <= 995) {
            $(".navbar-toggle").css({
                "z-index": "1",
                "position": "static",
                "float": "left",
                "margin-left": "25px"
            });
            $(".navbar-fixed").css({
                "position": "relative",
                "animation": "none"
            });
        }

        $(window).scroll(function() {
            if($(window).width() >= 996) {
                if ($(window).scrollTop() >= 970) {
                    $(".header-transparent").css({
                        "background": "#1c1c1c",
                        "overflow": "hidden",
                        "z-index": "2",
                        "position": "fixed",
                        "top": "0",
                        "width": "100%",
						"opacity": "0.8"
                    });
                } else if ($(window).scrollTop() < 970) {
                    $(".header-transparent").css({
                        "background": "none",
                        "z-index": "2",
                        "position": "absolute",
                        "top": "0",
                        "width": "100%",
                        "left": "0",
						"opacity": "1"
                    });
                }
            } else if($(window).width() <= 995) {
                $(".navbar-toggle").css({
                    "z-index": "1",
                    "position": "static",
                    "float": "left",
                    "margin-left": "25px"
                });
                $(".navbar-fixed").css({
                    "position": "relative",
                    "animation": "none"
                });
            }
		})

    /* ----------------------------------------------------------- */
    /*  Smooth scrolling
    /* ----------------------------------------------------------- */

    // Select all links with hashes
    $('a[href*="#"]')
    // Remove links that don't actually link to anything
        .not('[href="#"]')
        .not('[href="#0"]')
        .click(function(event) {
            // On-page links
            if (
                location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '')
                &&
                location.hostname == this.hostname
            ) {
                // Figure out element to scroll to
                var target = $(this.hash);
                target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
                // Does a scroll target exist?
                if (target.length) {
                    // Only prevent default if animation is actually gonna happen
                    event.preventDefault();
                    $('html, body').animate({
                        scrollTop: target.offset().top
                    }, 1000, function() {
                        // Callback after animation
                        // Must change focus!
                        var $target = $(target);
                        $target.focus();
                        if ($target.is(":focus")) { // Checking if the target was focused
                            return false;
                        } else {
                            $target.attr('tabindex','-1'); // Adding tabindex for elements not focusable
                            $target.focus(); // Set focus again
                        };
                    });
                }
            }
        });

});