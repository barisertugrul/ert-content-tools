import { useBlockProps } from '@wordpress/block-editor';

export default function save({ attributes }) {
    const { style } = attributes;

    const blockProps = useBlockProps.save({
    className: `ct-linkbutton btn btn-${attributes.type} ${attributes.className || ''}`
});



    return (
        <a {...blockProps} href={attributes.url}>
            {attributes.icon && <i className={`fa ${attributes.icon}`}></i>}
            {attributes.text}
        </a>
    );
}