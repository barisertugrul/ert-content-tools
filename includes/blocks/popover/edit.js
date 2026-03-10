import { __ } from '@wordpress/i18n';
import { useBlockProps, InspectorControls, RichText } from '@wordpress/block-editor';
import { PanelBody, TextControl } from '@wordpress/components';

export default function Edit({ attributes, setAttributes }) {
    const blockProps = useBlockProps({
        className: 'ct-popover'
    });

    return (
        <>
            <InspectorControls>
                <PanelBody title={__('Popover Settings', 'ert-content-tools')}>
                    <TextControl
                        label={__('Popover Content', 'ert-content-tools')}
                        value={attributes.popover}
                        onChange={(val) => setAttributes({ popover: val })}
                    />
                </PanelBody>
            </InspectorControls>
            <span {...blockProps} data-popover={attributes.popover}>
                <RichText
                    tagName="span"
                    value={attributes.text}
                    onChange={(val) => setAttributes({ text: val })}
                    placeholder={__('Popover trigger text...', 'ert-content-tools')}
                />
            </span>
        </>
    );
}
