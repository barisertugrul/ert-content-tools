import { registerBlockType } from '@wordpress/blocks';
import { useBlockProps, RichText } from '@wordpress/block-editor';
import Edit from './edit';
import save from './save';
import metadata from './block.json';

function deprecatedSaveV1({ attributes }) {
    const blockProps = useBlockProps.save({
        className: 'ct-collapse'
    });

    const collapseId = attributes.collapseId || 'ct-collapse';

    return (
        <div {...blockProps}>
            <RichText.Content
                tagName="div"
                id={collapseId}
                className="ct-collapse header"
                data-toggle="collapse"
                data-target={`#${collapseId}`}
                value={attributes.title}
            />
            <RichText.Content
                tagName="div"
                className="ct-collapse body collapse"
                id={collapseId}
                value={attributes.content}
            />
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
