import { registerBlockType } from '@wordpress/blocks';
import { useBlockProps } from '@wordpress/block-editor';
import Edit from './edit';
import save from './save';
import metadata from './block.json';

function deprecatedSaveV1({ attributes }) {
    const classes = `ct-spinner spinner-${attributes.type} spinner-${attributes.size}`;
    const blockProps = useBlockProps.save({
        className: classes
    });

    return <div {...blockProps}></div>;
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
