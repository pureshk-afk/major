$(document).ready(function() {
    const $thumbnails = $('.thumbnail');
    const $mainImage = $('.main-image');
    const $prevArrow = $('.prev-arrow');
    const $nextArrow = $('.next-arrow');
    let currentIndex = 0;
    const totalImages = $thumbnails.length;

    function updateGallery(index) {
        // Обновляем основное изображение
        const newSrc = $thumbnails.eq(index).find('img').attr('src');
        $mainImage.fadeOut(150, function() {
            $(this).attr('src', newSrc).fadeIn(150);
        });

        // Обновляем активный класс у миниатюр
        $thumbnails.removeClass('active');
        $thumbnails.eq(index).addClass('active');

        currentIndex = index;
    }

    // Обработчик клика по миниатюре
    $thumbnails.on('click', function() {
        const index = $(this).data('index');
        if (index !== currentIndex) {
            updateGallery(index);
        }
    });

    // Обработчик клика по стрелке "Назад"
    $prevArrow.on('click', function() {
        let newIndex = currentIndex - 1;
        if (newIndex < 0) {
            newIndex = totalImages - 1;
        }
        updateGallery(newIndex);
    });

    // Обработчик клика по стрелке "Вперед"
    $nextArrow.on('click', function() {
        let newIndex = currentIndex + 1;
        if (newIndex >= totalImages) {
            newIndex = 0;
        }
        updateGallery(newIndex);
    });

    // Обработчик клика по кнопке заявки
    $('.action-button').on('click', function() {
        alert('Заявка оставлена! Мы свяжемся с вами в ближайшее время.');
    });
});
