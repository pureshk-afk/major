$(document).ready(function() {
    // Функция для получения текущих параметров фильтрации из URL
    function getCurrentFilters() {
        const urlParams = new URLSearchParams(window.location.search);
        const filters = {};
        
        if (urlParams.has('category')) {
            filters.category = urlParams.get('category');
        }
        if (urlParams.has('collection')) {
            filters.collection = urlParams.get('collection');
        }
        
        return filters;
    }
    
    // Функция для обновления URL с новыми параметрами
    function updateURLWithFilters(sortValue) {
        const filters = getCurrentFilters();
        const urlParams = new URLSearchParams();
        
        // Добавляем существующие фильтры
        if (filters.category) {
            urlParams.set('category', filters.category);
        }
        if (filters.collection) {
            urlParams.set('collection', filters.collection);
        }
        
        // Добавляем сортировку (если не default)
        if (sortValue !== 'default') {
            urlParams.set('sort', sortValue);
        }
        
        // Формируем новый URL
        let newUrl = window.location.pathname;
        const paramsString = urlParams.toString();
        if (paramsString) {
            newUrl += '?' + paramsString;
        }
        
        return newUrl;
    }
    
    // Обработчик изменения сортировки
    $('#sortSelect').on('change', function() {
        const selectedValue = $(this).val();
        const newUrl = updateURLWithFilters(selectedValue);
        
        // Анимация нажатия
        $('.sort-select-wrapper').css('transform', 'scale(0.98)');
        
        // Перенаправляем на новый URL с сохранением всех фильтров
        setTimeout(() => {
            window.location.href = newUrl;
        }, 150);
    });
    
    // Небольшая анимация при загрузке страницы
    $('.sort-select-wrapper').css('transform', 'scale(1)');
});