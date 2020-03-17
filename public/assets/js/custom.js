/* =============================================================================

* Template name : Ecada - Responsive Multipurpose Template
* Author : @encodeslife
* Version : v2.0
* Website: http://encodeslife.com
* Created : 22 November 2017
* Last update : 12 June 2019

============================================================================= */

function scrollPage() {
    var scrollTop = $(window).scrollTop();
    var header = $('nav');
    if (scrollTop >= 75) {
        header.addClass('navbar-shrink');
    } else {
        header.removeClass('navbar-shrink');
    }
}

(function() {
    'use strict';

    scrollPage();

    new Typed('.main-intro p span', {
        strings: ['Multipurpose', 'App', 'Landing', 'Agency', 'Restaurant', 'Photography', 'Gallery', 'Real Estate'],
        startDelay: 3500,
        typeSpeed: 115,
        backSpeed: 75,
        loop: true,
        loopCount: Infinity,
        showCursor: false,
        onComplete: (self) => {
            self.startDelay = 0;
            self.currentElContent = null;
        }
    });

    $('a[href*="#"]').on('click', function(event) {
        var anchor = $(this);
        $('html, body').stop().animate({
            scrollTop: $(anchor.attr('href')).offset().top - 45
        }, 1500, 'easeInOutExpo');
        event.preventDefault();
    });

    // Wow animation
    new WOW({
        boxClass: 'wow',
        animateClass: 'animated',
        offset: 0,
        mobile: true,
        live: true
    }).init();

    // Lazy load images
    new HqyLazyload({
        success: function(t) {
            var e = t.parentNode;
            e.className = e.className.replace(/demo-card-loading/g, '');
        }
    });
})();

$(window).on('load', function() {
    $('.loader').delay(350).fadeOut('slow');
    $('body').delay(350).css({ 'overflow': 'visible' });
});

$(window).scroll(function() {
    scrollPage();
});