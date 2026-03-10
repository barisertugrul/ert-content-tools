import { __ } from '@wordpress/i18n';
import { useBlockProps, InspectorControls, RichText } from '@wordpress/block-editor';
import { PanelBody, TextControl } from '@wordpress/components';

export default function Edit({ attributes, setAttributes }) {
    const blockProps = useBlockProps({
        className: 'ct-tooltip'
    });

    return (
        <>
            <InspectorControls>
                <PanelBody title={__('Tooltip Settings', 'ert-content-tools')}>
                    <TextControl
                        label={__('Tooltip Text', 'ert-content-tools')}
                        value={attributes.tooltip}
                        onChange={(val) => setAttributes({ tooltip: val })}
                    />
                </PanelBody>
            </InspectorControls>
            <span {...blockProps} data-tooltip={attributes.tooltip}>
                <RichText
                    tagName="span"
                    value={attributes.text}
                    onChange={(val) => setAttributes({ text: val })}
                    placeholder={__('Tooltip trigger text...', 'ert-content-tools')}
                />
            </span>
        </>
    );
}
