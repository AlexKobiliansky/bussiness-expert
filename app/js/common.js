$(document).ready(function(){

    /**
     * mobile-mnu customization
     */
    var mmenu = $('#mobile-mnu');
    var menuTitle = mmenu.data("title");
    var $mmenu = mmenu.mmenu({
        "pageScroll": true,

        "navbar": {
            "title" : menuTitle,
        },
        "extensions": [
            "theme-dark",
            "pagedim-black",
            "position-front",
            "fx-listitems-slide",
        ],
    }, {
        offCanvas: {
            pageSelector: "#page-container"
        },
    });

    var mmenuBtn = $(".mmenu-btn");
    var API = $mmenu.data("mmenu");

    mmenuBtn.click(function() {
        API.open();
        $(this).addClass('is-active')
    });


    API.bind( "close:start", function() {
        setTimeout(function() {
            mmenuBtn.removeClass( "is-active" );
        }, 300);
    });
    /**
     * end mobile-mnu customization
     */



    $('img.svg').each(function(){
        var $img = jQuery(this);
        var imgID = $img.attr('id');
        var imgClass = $img.attr('class');
        var imgURL = $img.attr('src');

        jQuery.get(imgURL, function(data) {
            // Get the SVG tag, ignore the rest
            var $svg = jQuery(data).find('svg');

            // Add replaced image's ID to the new SVG
            if(typeof imgID !== 'undefined') {
                $svg = $svg.attr('id', imgID);
            }
            // Add replaced image's classes to the new SVG
            if(typeof imgClass !== 'undefined') {
                $svg = $svg.attr('class', imgClass+' replaced-svg');
            }

            // Remove any invalid XML tags as per http://validator.w3.org
            $svg = $svg.removeAttr('xmlns:a');

            // Check if the viewport is set, if the viewport is not set the SVG wont't scale.
            if(!$svg.attr('viewBox') && $svg.attr('height') && $svg.attr('width')) {
                $svg.attr('viewBox', '0 0 ' + $svg.attr('height') + ' ' + $svg.attr('width'))
            }

            // Replace image with new SVG
            $img.replaceWith($svg);
        }, 'xml');
    });

    $('.reviews-slider').owlCarousel({
        loop: true,
        nav: true,
        margin: 30,
        dots: true,
        navText: ["",""],
        responsive : {
            0 : {
                slideBy: 1,
                items: 1,
                autoHeight: true,
                nav: false,
            },
            768 : {
                slideBy: 2,
                items: 2,
                autoHeight: false,
                margin: 20,
            },
            992: {
                slideBy: 3,
                items: 3,
                autoHeight: false,
                margin: 30,
            }
        }
    });

    function heightses() {

        if ($(window).width()>=768) {

            $('.review-item-desc').height('auto').equalHeights();
        }
    }

    $(window).resize(function() {
        heightses();
    });

    heightses();

    $('.coin').on('click', function(){
        var wrap = $('.index-wrap');

        $('.main-mnu li').addClass('animate__animated').toggle();

        $('.s-index').toggleClass('opened')

        if(!wrap.hasClass('closed') && !wrap.hasClass('opened')) {
            wrap.addClass('opened');
        } else {
            wrap.toggleClass('opened closed');
        }
    })

    $('.s-intro').parallax({
        bleed: '50',
    });

    $('.preloader').fadeOut();

    $(function() {
        $("a[href='#popup-form']").magnificPopup({
            type: "inline",
            fixedContentPos: !1,
            fixedBgPos: !0,
            overflowY: "auto",
            closeBtnInside: !0,
            preloader: !1,
            midClick: !0,
            removalDelay: 300,
            mainClass: "my-mfp-zoom-in"
        })
    });

    /** animations start */
    function animateTypicItems($item, $firstDelay, $timeoutDelay){
        $item.each(function(){
            $(this).css("animation-delay", $firstDelay + "s");
            $firstDelay += $timeoutDelay;
        });
    }

    animateTypicItems($('.main-mnu-mobile li'), 0.5, 0.1);
    /**
     * FORMS
     */
    var uPhone = $('.user-phone');
    uPhone.mask("+7 (999) 999-99-99",{autoclear: false});

    uPhone.on('click', function (ele) {
        var needelem = ele.target || event.srcElement;
        needelem.setSelectionRange(4,4);
        needelem.focus();
    });

    $.validate({
        form : '.contact-form',
        scrollToTopOnError: false
    });

    //E-mail Ajax Send
    $("form").submit(function() { //Change
        var th = $(this);

        $.ajax({
            type: "POST",
            url: "mail.php", //Change
            data: th.serialize()
        }).done(function() {

        });
        return false;
    });
});
