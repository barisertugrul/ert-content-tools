( function(wp) {
    wp.blocks.registerBlockType('ert-content-tools/card', {
        edit: props => wp.element.createElement('div', { className: 'ct-card' },
            wp.element.createElement('div', { className: 'ct-card card-title' }, props.attributes.title),
            wp.element.createElement('div', { className: 'ct-card card-body' }, props.attributes.content)
        ),
        save: props => wp.element.createElement('div', { className: 'ct-card' },
            wp.element.createElement('div', { className: 'ct-card card-title' }, props.attributes.title),
            wp.element.createElement('div', { className: 'ct-card card-body' }, props.attributes.content)
        )
    });
})(window.wp);
