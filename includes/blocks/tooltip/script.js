jQuery(document).ready(function($) {
    // Tooltip functionality
    $(document).on('mouseenter', '.ct-tooltip[data-tooltip]', function(e) {
        const $tooltip = $(this);
        const tooltipText = $tooltip.data('tooltip');

        if (tooltipText && !$tooltip.find('.ct-tooltip-text').length) {
            const $tooltipText = $('<span class="ct-tooltip-text">' + tooltipText + '</span>');
            $tooltip.append($tooltipText);

            $tooltipText.css({
                visibility: 'visible',
                bottom: '100%',
                left: '50%',
                transform: 'translateX(-50%) translateY(-8px)'
            });
        }
    });

    $(document).on('focus', '.ct-tooltip[data-tooltip]', function() {
        $(this).trigger('mouseenter');
    });

    $(document).on('mouseleave', '.ct-tooltip[data-tooltip]', function() {
        $(this).find('.ct-tooltip-text').remove();
    });

    $(document).on('blur', '.ct-tooltip[data-tooltip]', function() {
        $(this).find('.ct-tooltip-text').remove();
    });
});
