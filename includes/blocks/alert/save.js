import { useBlockProps, RichText } from '@wordpress/block-editor';

export default function save({ attributes }) {
    const { style } = attributes;

    const blockProps = useBlockProps.save({
        className: `ct-alert alert alert-${attributes.type}`
    });

    return (
        <div {...blockProps}>
            <RichText.Content tagName="div" value={attributes.message} />
        </div>
    );
}