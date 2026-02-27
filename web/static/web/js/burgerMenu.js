$(document).ready(function () {
    let $burgerBtn = $('#burgerBtn');
    let $drawer = $('#headerDrawer');
    let $overlay = $('#drawerOverlay');
    let $closeBtn = $('#drawerCloseBtn');
    let $body = $('body');
    let $makeOrderButton = $('#makeOrderButton');

    function openDrawer() {
        $burgerBtn.addClass('active');
        $drawer.addClass('active');
        $overlay.addClass('active');
        $body.css('overflow', 'hidden');
    }

    function closeDrawer() {
        $burgerBtn.removeClass('active');
        $drawer.removeClass('active');
        $overlay.removeClass('active');
        $body.css('overflow', '');
    }

    $burgerBtn.on('click', function () {
        if ($drawer.hasClass('active')) {
            closeDrawer();
        } else {
            openDrawer();
        }
    });

    $closeBtn.on('click', function () {
        closeDrawer();
    });

    $overlay.on('click', function () {
        closeDrawer();
    });

    $makeOrderButton.on('click', function () {
        closeDrawer();
        setTimeout(() => {
          window.location.href = '/#ticket-form';
        }, 1);
    });

    $('.drawer__nav-item, .drawer__login, .drawer__phone').on('click', function () {
        closeDrawer();
    });
    
    $(document).on('keydown', function (e) {
        if (e.key === 'Escape' && $drawer.hasClass('active')) {
            closeDrawer();
        }
    });

    $(window).on('resize', function () {
        if ($(window).width() > 1184 && $drawer.hasClass('active')) {
            closeDrawer();
        }
    });
});