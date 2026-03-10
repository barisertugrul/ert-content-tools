import { useBlockProps, RichText } from '@wordpress/block-editor';

export default function save({ attributes }) {
    const blockProps = useBlockProps.save({
        className: 'ct-collapse'
    });

    const collapseId = attributes.collapseId || 'ct-collapse';
    const triggerId = `${collapseId}_trigger`;

    return (
        <div {...blockProps}>
            <RichText.Content
                tagName="div"
                id={triggerId}
                className="ct-collapse header"
                data-toggle="collapse"
                data-target={`#${collapseId}`}
                role="button"
                tabIndex={0}
                aria-controls={collapseId}
                aria-expanded="false"
                value={attributes.title}
            />
            <RichText.Content
                tagName="div"
                className="ct-collapse body collapse"
                id={collapseId}
                aria-hidden="true"
                value={attributes.content}
            />
        </div>
    );
}