$(document).ready(function() {
    
    // Function to toggle dropdown
    function toggleDropdown($dropdown) {
        const $content = $dropdown.find('.dropdown-content');
        
        if ($dropdown.hasClass('active')) {
            // Closing
            $content.css('max-height', $content.prop('scrollHeight') + "px");
            // Force reflow
            $content[0].offsetHeight; 
            $content.css('max-height', '0px');
            
            // Remove active class after animation starts to hide chevron rotation immediately or wait for transition end
            setTimeout(() => {
                $dropdown.removeClass('active');
            }, 300); // Match CSS transition time roughly
        } else {
            // Opening
            $dropdown.addClass('active');
            $content.css('max-height', $content.prop('scrollHeight') + "px");
        }
    }

    // Toggle Dropdowns - Allow multiple open
    $('.dropdown-header').click(function(e) {
        e.stopPropagation();
        const $dropdown = $(this).parent('.dropdown');
        toggleDropdown($dropdown);
    });

    // Close dropdowns when clicking outside
    $(document).click(function() {
        $('.dropdown').each(function() {
            const $dropdown = $(this);
            if ($dropdown.hasClass('active')) {
                toggleDropdown($dropdown);
            }
        });
    });

    // Prevent closing when clicking inside the content
    $('.dropdown-content').click(function(e) {
        e.stopPropagation();
    });

    // Handle Apply Button Click
    $('#apply-btn').click(function() {
        const minPrice = $('#min-price').val();
        const maxPrice = $('#max-price').val();
        
        // Get selected collections
        const selectedCollections = [];
        $('.collection-list input:checked').each(function() {
            selectedCollections.push($(this).next().next().text().trim());
        });

        // Construct result message
        let message = "Выбрано:\n";
        
        if (minPrice || maxPrice) {
            message += `Цена: от ${minPrice || '0'} до ${maxPrice || '∞'}\n`;
        } else {
            message += "Цена: без ограничений\n";
        }

        if (selectedCollections.length > 0) {
            message += `Коллекции: ${selectedCollections.join(', ')}`;
        } else {
            message += "Коллекции: все";
        }

        alert(message);
    });
});