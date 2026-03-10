( function(wp) {
    wp.blocks.registerBlockType('ert-content-tools/linkbutton', {
        edit: props => wp.element.createElement('a', { href: props.attributes.url, className: 'ct-linkbutton ct-linkbutton-' + props.attributes.type }, props.attributes.label),
        save: props => wp.element.createElement('a', { href: props.attributes.url, className: 'ct-linkbutton ct-linkbutton-' + props.attributes.type }, props.attributes.label)
    });
})(window.wp);
