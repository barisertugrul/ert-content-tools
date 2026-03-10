import { useBlockProps } from '@wordpress/block-editor';

export default function save({ attributes }) {
    const blockProps = useBlockProps.save({
        className: 'ct-tooltip'
    });

    return (
        <span {...blockProps} data-tooltip={attributes.tooltip}>
            {attributes.text}
        </span>
    );
}