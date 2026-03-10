import { __ } from '@wordpress/i18n';
import { useBlockProps, InspectorControls, RichText } from '@wordpress/block-editor';
import { PanelBody, TextControl } from '@wordpress/components';

export default function Edit({ attributes, setAttributes }) {
    const blockProps = useBlockProps({
        className: 'ct-modal-block'
    });

    return (
        <>
            <InspectorControls>
                <PanelBody title={__('Modal Settings', 'ert-content-tools')}>
                    <TextControl
                        label={__('Modal ID', 'ert-content-tools')}
                        value={attributes.id}
                        onChange={(val) => setAttributes({ id: val })}
                    />
                    <TextControl
                        label={__('Button Text', 'ert-content-tools')}
                        value={attributes.buttonText}
                        onChange={(val) => setAttributes({ buttonText: val })}
                    />
                </PanelBody>
            </InspectorControls>
            <div {...blockProps}>
                <button className="btn btn-primary">{attributes.buttonText}</button>
                <div className="ct-modal-preview">
                    <RichText
                        tagName="div"
                        className="modal-header"
                        value={attributes.title}
                        onChange={(val) => setAttributes({ title: val })}
                        placeholder={__('Modal title...', 'ert-content-tools')}
                    />
                    <RichText
                        tagName="div"
                        className="modal-body"
                        value={attributes.content}
                        onChange={(val) => setAttributes({ content: val })}
                        placeholder={__('Modal content...', 'ert-content-tools')}
                    />
                </div>
            </div>
        </>
    );
}
