$(document).ready(function () {

    $('#contactForm').on('submit', function (e) {
        e.preventDefault();

        const form = $('#contactForm')[0];
        const formData = new FormData(form);

        $.ajax({
            url: '/api/orders/create-order/',
            type: 'POST',
            data: formData,

            processData: false,
            contentType: false,

            success: function (response) {

                if (response.success) {
                    alert('Заявка успешно отправлена');

                    $('#contactForm')[0].reset();
                    $('#uploadedFiles').html('');
                } else {
                    alert('Ошибка отправки');
                    console.log(response.errors);
                }
            },

            error: function (xhr) {
                console.log(xhr);
                if (xhr.responseJSON?.errors) {
                    console.log(xhr.responseJSON.errors);
                }
                alert('Ошибка при отправке формы');
            }
        });
    });

});