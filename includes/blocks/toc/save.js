import { useBlockProps } from '@wordpress/block-editor';

export default function save({ attributes }) {
    const blockProps = useBlockProps.save({
        className: 'ct-toc card'
    });

    return (
        <div {...blockProps}>
            <div className="card-header">{attributes.title}</div>
            <ul className="list-group list-group-flush">
                {/* Frontend’de PHP render başlıkları otomatik çıkaracak */}
            </ul>
        </div>
    );
}