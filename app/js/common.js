$(document).ready(function(){

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

    /** animations start */
    function animateTypicItems($item, $firstDelay, $timeoutDelay){
        $item.each(function(){
            $(this).css("animation-delay", $firstDelay + "s");
            $firstDelay += $timeoutDelay;
        });
    }

    animateTypicItems($('.main-mnu-mobile li'), 0.5, 0.1);

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
