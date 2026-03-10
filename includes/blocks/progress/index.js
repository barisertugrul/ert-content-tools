import { registerBlockType } from '@wordpress/blocks';
import { useBlockProps } from '@wordpress/block-editor';
import Edit from './edit';
import save from './save';
import metadata from './block.json';

function deprecatedSaveV1({ attributes }) {
    const variant = attributes.variant || 'primary';
    const styleVars = {
        ...(attributes.trackColor ? { '--ct-progress-track': attributes.trackColor } : {}),
        ...(attributes.barColor ? { '--ct-progress-bar': attributes.barColor } : {}),
        ...(attributes.textColor ? { '--ct-progress-text': attributes.textColor } : {}),
    };

    const blockProps = useBlockProps.save({
        className: `ct-progress progress ct-progress-${variant}`,
        style: styleVars,
    });

    return (
        <div {...blockProps}>
            <div className="progress-bar" style={{ width: attributes.value + '%' }}>
                {attributes.value}%
            </div>
        </div>
    );
}

function deprecatedSaveV0({ attributes }) {
    const blockProps = useBlockProps.save({
        className: 'ct-progress progress'
    });

    return (
        <div {...blockProps}>
            <div className="progress-bar" style={{ width: attributes.value + '%' }}>
                {attributes.value}%
            </div>
        </div>
    );
}

registerBlockType(metadata.name, {
    edit: Edit,
    save,
    deprecated: [
        { save: deprecatedSaveV1 },
        { save: deprecatedSaveV0 },
    ],
});
