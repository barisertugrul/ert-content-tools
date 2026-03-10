( function(wp) {
    wp.blocks.registerBlockType('ert-content-tools/badge', {
        edit: props => wp.element.createElement('span', { className: 'ct-badge badge badge-' + props.attributes.type }, props.attributes.label),
        save: props => wp.element.createElement('span', { className: 'ct-badge badge badge-' + props.attributes.type }, props.attributes.label)
    });
})(window.wp);
