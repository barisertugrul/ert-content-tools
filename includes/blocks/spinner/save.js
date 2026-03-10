import { useBlockProps } from '@wordpress/block-editor';

export default function save({ attributes }) {
    const classes = `ct-spinner spinner-${attributes.type} spinner-${attributes.color} spinner-${attributes.size}`;
    const blockProps = useBlockProps.save({
        className: classes
    });

    return (
        <div {...blockProps}></div>
    );
}