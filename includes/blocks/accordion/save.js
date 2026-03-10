import { useBlockProps, RichText } from '@wordpress/block-editor';

export default function save({ attributes }) {
    const blockProps = useBlockProps.save({
        className: 'ct-accordion accordion'
    });

    return (
        <div {...blockProps}>
            {attributes.items && attributes.items.map((item, index) => {
                const id = `acc${index}`;
                return (
                    <div className="accordion-item" key={index}>
                        <div
                            className="accordion-header"
                            data-toggle="collapse"
                            data-target={`#${id}`}
                            role="button"
                            tabIndex={0}
                            aria-controls={id}
                            aria-expanded="false"
                        >
                            <RichText.Content tagName="span" value={item.title} />
                        </div>
                        <div id={id} className="accordion-body collapse" aria-hidden="true">
                            <RichText.Content tagName="div" value={item.content} />
                        </div>
                    </div>
                );
            })}
        </div>
    );
}