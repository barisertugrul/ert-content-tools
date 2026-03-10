import { __ } from '@wordpress/i18n';
import { useBlockProps, RichText } from '@wordpress/block-editor';

export default function Edit({ attributes, setAttributes }) {
    const blockProps = useBlockProps({
        className: 'ct-toc card'
    });

    return (
        <div {...blockProps}>
            <RichText
                tagName="div"
                className="card-header"
                value={attributes.title}
                onChange={(val) => setAttributes({ title: val })}
                placeholder={__('Heading...', 'ert-content-tools')}
            />
            <div className="card-body">
                {__('Headings will be listed automatically', 'ert-content-tools')}
            </div>
        </div>
    );
}
