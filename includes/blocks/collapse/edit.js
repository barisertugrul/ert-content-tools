import { __ } from '@wordpress/i18n';
import { useBlockProps, RichText } from '@wordpress/block-editor';
import { useEffect } from '@wordpress/element';

export default function Edit({ attributes, setAttributes }) {
    const blockProps = useBlockProps({
        className: 'ct-collapse'
    });

    // Ä°lk yÃ¼klemede collapseId yoksa Ã¼ret ve attributeâ€™a kaydet
    useEffect(() => {
        if (!attributes.collapseId) {
            const uniqueId = 'ct-collapse_' + Math.random().toString(36).substr(2, 9);
            setAttributes({ collapseId: uniqueId });
        }
    }, []);

    const collapseId = attributes.collapseId || 'ct-collapse_preview';
    const triggerId = `${collapseId}_trigger`;

    return (
        <div {...blockProps}>
            <RichText
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
                onChange={(val) => setAttributes({ title: val })}
                placeholder={__('Collapse title...', 'ert-content-tools')}
            />
            <RichText
                tagName="div"
                className="ct-collapse body collapse"
                id={collapseId}
                aria-hidden="true"
                value={attributes.content}
                onChange={(val) => setAttributes({ content: val })}
                placeholder={__('Collapse content...', 'ert-content-tools')}
            />
        </div>
    );
}
