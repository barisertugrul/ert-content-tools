import { registerBlockType } from '@wordpress/blocks';
import { useBlockProps, RichText } from '@wordpress/block-editor';
import Edit from './edit';
import save from './save';
import metadata from './block.json';

function deprecatedSaveV1({ attributes }) {
    const blockProps = useBlockProps.save({
        className: 'ct-accordion accordion'
    });

    return (
        <div {...blockProps}>
            {attributes.items && attributes.items.map((item, index) => {
                const id = `acc${index}`;
                return (
                    <div className="accordion-item" key={index}>
                        <div
                            className="accordion-header"
                            data-toggle="collapse"
                            data-target={`#${id}`}
                        >
                            <RichText.Content tagName="span" value={item.title} />
                        </div>
                        <div id={id} className="accordion-body collapse">
                            <RichText.Content tagName="div" value={item.content} />
                        </div>
                    </div>
                );
            })}
        </div>
    );
}

registerBlockType(metadata.name, {
    edit: Edit,
    save,
    deprecated: [
        {
            save: deprecatedSaveV1,
        },
    ],
});
