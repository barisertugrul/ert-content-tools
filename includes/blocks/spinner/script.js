( function( wp ) {
    wp.blocks.registerBlockType('ert-content-tools/spinner', {
        edit: function(props) {
            return wp.element.createElement(
                'div',
                { className: 'ct-spinner-' + props.attributes.type + ' text-' + props.attributes.color },
                'Spinner (' + props.attributes.size + ')'
            );
        },
        save: function(props) {
            return wp.element.createElement(
                'div',
                { className: 'ct-spinner-' + props.attributes.type + ' text-' + props.attributes.color },
                ''
            );
        }
    });
} )( window.wp );
