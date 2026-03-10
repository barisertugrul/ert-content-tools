import { useBlockProps, RichText } from '@wordpress/block-editor';

export default function save({ attributes }) {
    const blockProps = useBlockProps.save({
        className: 'ct-card card'
    });

    return (
        <div {...blockProps}>
            <RichText.Content tagName="div" className="ct-card card-header" value={attributes.title} />
            <RichText.Content tagName="div" className="ct-card card-body" value={attributes.content} />
        </div>
    );
}