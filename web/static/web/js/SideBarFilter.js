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

    
    

});