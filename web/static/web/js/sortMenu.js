$(document).ready(function() {
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
    
    function updateURLWithFilters(sortValue) {
        const filters = getCurrentFilters();
        const urlParams = new URLSearchParams();
        
        if (filters.category) {
            urlParams.set('category', filters.category);
        }
        if (filters.collection) {
            urlParams.set('collection', filters.collection);
        }
        
        if (sortValue !== 'default') {
            urlParams.set('sort', sortValue);
        }
        
        let newUrl = window.location.pathname;
        const paramsString = urlParams.toString();
        if (paramsString) {
            newUrl += '?' + paramsString;
        }
        
        return newUrl;
    }
    
    $('#sortSelect').on('change', function() {
        const selectedValue = $(this).val();
        const newUrl = updateURLWithFilters(selectedValue);
        
        $('.sort-select-wrapper').css('transform', 'scale(0.98)');
        
        setTimeout(() => {
            window.location.href = newUrl;
        }, 150);
    });
    
    $('.sort-select-wrapper').css('transform', 'scale(1)');
});