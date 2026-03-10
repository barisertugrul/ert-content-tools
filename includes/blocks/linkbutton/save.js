import { useBlockProps } from '@wordpress/block-editor';

export default function save({ attributes }) {
    const { style } = attributes;

    const blockProps = useBlockProps.save({
        className: `ct-linkbutton btn btn-${attributes.type} ${attributes.className || ''}`
    });

    return (
        <a {...blockProps} href={attributes.url} style={{ display: "inline-flex", alignItems: "center" }}>
            {attributes.icon && attributes.icon.startsWith("dashicons-") ? (
                <span className={`dashicons dashicons-before ${attributes.icon}`} style={{ marginRight: "0.5rem", fontSize: "1.2em", verticalAlign: "middle", display: "inline-flex", alignItems: "center", height: "1.5em" }}></span>
            ) : attributes.icon ? (
                <i className={attributes.icon} style={{ marginRight: "0.5rem", fontSize: "1.2em", verticalAlign: "middle", display: "inline-flex", alignItems: "center", height: "1.5em" }}></i>
            ) : null}
            {attributes.text}
        </a>
    );
}