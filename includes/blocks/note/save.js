import { useBlockProps, RichText } from '@wordpress/block-editor';

export default function save({ attributes }) {
    const blockProps = useBlockProps.save({
        className: `ct-note note-${attributes.corner}`,
        style: { backgroundColor: attributes.paperColor }
    });

    return (
        <div {...blockProps}>
            <div className="note-pin" style={{ backgroundColor: attributes.pinColor }}></div>
            <div className="note-fold" style={{ '--ct-note-fold-color': attributes.foldColor }}></div>
            <RichText.Content tagName="div" className="note-text" value={attributes.text} />
        </div>
    );
}