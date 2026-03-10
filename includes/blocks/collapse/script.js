jQuery(document).ready(function($) {
    $('.ct-collapse.header[data-toggle="collapse"]').each(function() {
        const $trigger = $(this);
        const targetSelector = $trigger.attr('data-target');
        const $target = $(targetSelector);

        if (!$trigger.attr('role')) {
            $trigger.attr('role', 'button');
        }
        if (!$trigger.attr('tabindex')) {
            $trigger.attr('tabindex', '0');
        }

        if (targetSelector && !$trigger.attr('aria-controls')) {
            $trigger.attr('aria-controls', targetSelector.replace('#', ''));
        }

        const isOpen = $target.length ? $target.is(':visible') : false;
        $trigger.attr('aria-expanded', isOpen ? 'true' : 'false');

        if ($target.length) {
            $target.attr('aria-hidden', isOpen ? 'false' : 'true');
            $target.toggleClass('show', isOpen);
            $target.toggleClass('collapsed', !isOpen);
        }
    });

    $(document).on('keydown', '.ct-collapse.header[data-toggle="collapse"]', function(e) {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            $(this).trigger('click');
        }
    });

    // Collapse functionality
    $(document).on('click', '.ct-collapse.header[data-toggle="collapse"]', function(e) {
        e.preventDefault();

        const $trigger = $(this);
        const targetSelector = $trigger.attr('data-target');
        const $target = $(targetSelector);

        if ($target.length) {
            const willOpen = !$target.is(':visible');
            $target.stop(true, true).slideToggle(200);
            $target.toggleClass('show', willOpen);
            $target.toggleClass('collapsed', !willOpen);
            $trigger.attr('aria-expanded', willOpen ? 'true' : 'false');
            $target.attr('aria-hidden', willOpen ? 'false' : 'true');
        }
    });
});