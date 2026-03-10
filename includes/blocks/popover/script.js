jQuery(document).ready(function($) {
    function hideAllPopovers() {
        $('.ct-popover .ct-popover-content').css('visibility', 'hidden');
    }

    $('.ct-popover[data-popover], .ct-popover[data-content]').each(function() {
        const $trigger = $(this);

        if (!$trigger.attr('role')) {
            $trigger.attr('role', 'button');
        }

        if (!$trigger.attr('tabindex')) {
            $trigger.attr('tabindex', '0');
        }

        if (!$trigger.find('.ct-popover-content').length) {
            const content = $trigger.attr('data-popover') || $trigger.attr('data-content') || '';
            $trigger.append(`<span class="ct-popover-content">${content}</span>`);
        }
    });

    $(document).on('click', '.ct-popover[data-popover], .ct-popover[data-content]', function(e) {
        e.preventDefault();
        e.stopPropagation();

        const $content = $(this).find('.ct-popover-content').first();
        const currentlyVisible = $content.css('visibility') === 'visible';

        hideAllPopovers();
        $content.css('visibility', currentlyVisible ? 'hidden' : 'visible');
    });

    $(document).on('keydown', '.ct-popover[data-popover], .ct-popover[data-content]', function(e) {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            $(this).trigger('click');
        }

        if (e.key === 'Escape') {
            hideAllPopovers();
        }
    });

    $(document).on('click', function() {
        hideAllPopovers();
    });
});
