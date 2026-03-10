( function(wp) {
    wp.blocks.registerBlockType('ert-content-tools/listgroup', {
        edit: function(props) {
            const items = props.attributes.items || ['Ã–ÄŸe 1', 'Ã–ÄŸe 2', 'Ã–ÄŸe 3'];
            return wp.element.createElement(
                'ul',
                { className: 'ct-listgroup' },
                items.map((item, index) =>
                    wp.element.createElement(
                        'li',
                        { className: 'ct-listgroup listgroup-item' + (index === 0 ? ' active' : '') },
                        item
                    )
                )
            );
        },
        save: function(props) {
            const items = props.attributes.items || [];
            return wp.element.createElement(
                'ul',
                { className: 'ct-listgroup' },
                items.map((item, index) =>
                    wp.element.createElement(
                        'li',
                        { className: 'ct-listgroup listgroup-item' + (index === 0 ? ' active' : '') },
                        item
                    )
                )
            );
        }
    });
})(window.wp);
