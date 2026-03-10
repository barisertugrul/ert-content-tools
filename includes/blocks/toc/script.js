( function(wp) {
    wp.blocks.registerBlockType('ert-content-tools/toc', {
        edit: props => wp.element.createElement('div', { className: 'ct-toc' }, 'TOC Placeholder'),
        save: props => wp.element.createElement('div', { className: 'ct-toc' }, props.attributes.content)
    });
})(window.wp);
