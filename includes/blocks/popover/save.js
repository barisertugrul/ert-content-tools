import { useBlockProps } from '@wordpress/block-editor';

export default function save({ attributes }) {
    const blockProps = useBlockProps.save({
        className: 'ct-popover btn btn-secondary'
    });

    return (
        <button {...blockProps} data-popover={attributes.popover}>
            {attributes.text}
        </button>
    );
}