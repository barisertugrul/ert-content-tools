jQuery(document).ready(function($) {
    $('.ct-modal').each(function() {
        const $modal = $(this);
        if (!$modal.parent().is('body')) {
            $modal.appendTo('body');
        }
    });

    // Backward compatibility: old content may have trigger button inside hidden modal.
    $('.ct-modal').each(function() {
        const $modal = $(this);
        const $innerTrigger = $modal.find('> [data-toggle="modal"][data-target], [data-toggle="modal"][data-target]').first();

        if ($innerTrigger.length) {
            $innerTrigger.insertBefore($modal);
        }
    });

    function openModal($modal) {
        $modal.addClass('show').attr('aria-hidden', 'false');
        $('body').addClass('modal-open');
    }

    function closeModal($modal) {
        $modal.removeClass('show').attr('aria-hidden', 'true');
        if ($('.ct-modal.show').length === 0) {
            $('body').removeClass('modal-open');
        }
    }

    $(document).on('click', '[data-toggle="modal"]', function(e) {
        e.preventDefault();

        const $trigger = $(this);
        const targetSelector = $trigger.attr('data-target');
        const $modal = $(targetSelector);

        if ($modal.length) {
            openModal($modal);
        }
    });

    $(document).on('click', '[data-dismiss="modal"]', function(e) {
        e.preventDefault();
        closeModal($(this).closest('.ct-modal'));
    });

    $(document).on('click', '.ct-modal', function(e) {
        if (e.target === this) {
            closeModal($(this));
        }
    });

    $(document).on('keydown', function(e) {
        if (e.key === 'Escape') {
            closeModal($('.ct-modal.show'));
        }
    });
});
