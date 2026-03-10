jQuery(document).ready(function($) {
    $('.accordion-header').each(function() {
        const $header = $(this);
        const targetSelector = $header.attr('data-target');
        const $target = $(targetSelector);

        if (!$header.attr('role')) {
            $header.attr('role', 'button');
        }
        if (!$header.attr('tabindex')) {
            $header.attr('tabindex', '0');
        }

        if (targetSelector && !$header.attr('aria-controls')) {
            $header.attr('aria-controls', targetSelector.replace('#', ''));
        }

        const isOpen = $target.length ? $target.is(':visible') : false;
        $header.attr('aria-expanded', isOpen ? 'true' : 'false');

        if ($target.length) {
            $target.attr('aria-hidden', isOpen ? 'false' : 'true');
        }
    });

    $(document).on('keydown', '.accordion-header', function(e) {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            $(this).trigger('click');
        }
    });

    // Accordion functionality
    $(document).on('click', '.accordion-header', function(e) {
        e.preventDefault();

        const $header = $(this);
        const $item = $header.closest('.accordion-item');
        const $body = $item.find('.accordion-body');
        const $accordion = $header.closest('.ct-accordion');

        // Check if this accordion should allow multiple open items
        const allowMultiple = $accordion.hasClass('allow-multiple');

        if (!allowMultiple) {
            // Close all other items in this accordion
            $accordion.find('.accordion-item').not($item).removeClass('active');
            $accordion.find('.accordion-body').not($body).slideUp(200).attr('aria-hidden', 'true');
            $accordion.find('.accordion-item').not($item).find('.accordion-header').attr('aria-expanded', 'false');
        }

        // Toggle current item
        $item.toggleClass('active');
        const willOpen = !$body.is(':visible');
        $body.slideToggle(200).attr('aria-hidden', willOpen ? 'false' : 'true');
        $header.attr('aria-expanded', willOpen ? 'true' : 'false');
    });
});