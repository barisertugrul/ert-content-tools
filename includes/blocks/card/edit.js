import { __ } from '@wordpress/i18n';
import { useBlockProps, RichText } from '@wordpress/block-editor';

export default function Edit({ attributes, setAttributes }) {
    const blockProps = useBlockProps({
        className: 'ct-card card'
    });

    return (
        <div {...blockProps}>
            <RichText
                tagName="div"
                className="ct-card card-header"
                value={attributes.title}
                onChange={(val) => setAttributes({ title: val })}
                placeholder={__('Title...', 'ert-content-tools')}
            />
            <RichText
                tagName="div"
                className="ct-card card-body"
                value={attributes.content}
                onChange={(val) => setAttributes({ content: val })}
                placeholder={__('Content...', 'ert-content-tools')}
            />
        </div>
    );
}
