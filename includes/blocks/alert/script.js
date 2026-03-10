( function( wp ) {
    wp.blocks.registerBlockType('ert-content-tools/alert', {
        edit: function(props) {
            return wp.element.createElement(
                'div',
                { className: 'ct-alert ct-alert-' + props.attributes.type },
                props.attributes.message || 'VarsayÄ±lan alert mesajÄ±'
            );
        },
        save: function(props) {
            return wp.element.createElement(
                'div',
                { className: 'ct-alert ct-alert-' + props.attributes.type },
                props.attributes.message
            );
        }
    });
} )( window.wp );
