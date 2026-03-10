( function(wp) {
    wp.blocks.registerBlockType('ert-content-tools/progress', {
        edit: props => wp.element.createElement('div', { className: 'ct-progress' },
            wp.element.createElement('div', { className: 'ct-progress-bar', style: { width: props.attributes.value + '%' } })
        ),
        save: props => wp.element.createElement('div', { className: 'ct-progress' },
            wp.element.createElement('div', { className: 'ct-progress-bar', style: { width: props.attributes.value + '%' } })
        )
    });
})(window.wp);

jQuery(document).ready(function($) {
    // Progress bar animation on scroll
    function animateProgressBars() {
        $('.ct-progress-bar').each(function() {
            const $bar = $(this);
            const width = $bar.data('width') || $bar.attr('style').match(/width:\s*(\d+%)/);

            if (width && !$bar.hasClass('animated')) {
                const targetWidth = typeof width === 'string' ? width : width[1];
                $bar.css('width', '0%').addClass('animated');
                setTimeout(() => {
                    $bar.css('width', targetWidth);
                }, 100);
            }
        });
    }

    // Initial animation
    animateProgressBars();

    // Re-animate on scroll
    $(window).on('scroll', animateProgressBars);
});
