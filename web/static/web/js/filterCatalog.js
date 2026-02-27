$(document).ready(function() {
    function getCurrentParams() {
        const urlParams = new URLSearchParams(window.location.search);
        return {
            category: urlParams.get('category'),
            collection: urlParams.get('collection'),
            sort: urlParams.get('sort')
        };
    }
    
    function buildUrl(params) {
        const urlParams = new URLSearchParams();
        
        if (params.category) urlParams.set('category', params.category);
        if (params.collection) urlParams.set('collection', params.collection);
        if (params.sort && params.sort !== 'default') urlParams.set('sort', params.sort);
        
        const queryString = urlParams.toString();
        return window.location.pathname + (queryString ? '?' + queryString : '');
    }
    
    $('.menu__item a').on('click', function(e) {
        e.preventDefault();
        const href = $(this).attr('href');
        window.location.href = href;
    });
  });

document.addEventListener('DOMContentLoaded', function() {
    const categoryLinks = document.querySelectorAll('.menu__item a');
    const cardsContainer = document.querySelector('.cards_container');
    
    categoryLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const url = this.href;
            
            cardsContainer.innerHTML = '<div class="loading"><p>Загрузка...</p></div>';
            
            fetch(url, {
                headers: {
                    'X-Requested-With': 'XMLHttpRequest'
                }
            })
            .then(response => response.text())
            .then(html => {
                const parser = new DOMParser();
                const doc = parser.parseFromString(html, 'text/html');
                const newCardsContainer = doc.querySelector('.cards_container');
                
                if (newCardsContainer) {
                    cardsContainer.innerHTML = newCardsContainer.innerHTML;
                }
                
                categoryLinks.forEach(link => {
                    link.classList.remove('active');
                });
                this.classList.add('active');
            })
            .catch(error => {
                console.error('Ошибка:', error);
                cardsContainer.innerHTML = '<div class="error"><p>Ошибка загрузки товаров</p></div>';
            });
        });
    });
});