$(document).ready(function() {
            // Simple interaction log to demonstrate jQuery usage
    $('#sortSelect').on('change', function() {
        const selectedValue = $(this).val();
        const selectedText = $(this).find('option:selected').text();
                
        console.log(`Выбрано значение: ${selectedValue}`);
        console.log(`Текст опции: ${selectedText}`);
                
                // Example animation effect on change
        $('.sort-select-wrapper').css('transform', 'scale(0.98)');
        setTimeout(() => {
            $('.sort-select-wrapper').css('transform', 'scale(1)');
        }, 150);
    });
});