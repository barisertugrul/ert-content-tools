import { useBlockProps } from '@wordpress/block-editor';

export default function save({ attributes }) {
    const blockProps = useBlockProps.save({
        className: `ct-badge badge badge-${attributes.type}`
    });

    return (
        <span {...blockProps}>
            {attributes.text}
        </span>
    );
}