import { __ } from '@wordpress/i18n';
import { useBlockProps, InspectorControls, RichText } from '@wordpress/block-editor';
import { PanelBody, SelectControl } from '@wordpress/components';

export default function Edit({ attributes, setAttributes }) {
    const blockProps = useBlockProps({
        className: `ct-badge badge badge-${attributes.type}`
    });

    return (
        <>
            <InspectorControls>
                <PanelBody title={__('Badge Settings', 'ert-content-tools')}>
                    <SelectControl
                        label={__('Type', 'ert-content-tools')}
                        value={attributes.type}
                        options={[
                            { label: __('Primary', 'ert-content-tools'), value: 'primary' },
                            { label: __('Secondary', 'ert-content-tools'), value: 'secondary' },
                            { label: __('Success', 'ert-content-tools'), value: 'success' },
                            { label: __('Danger', 'ert-content-tools'), value: 'danger' },
                            { label: __('Warning', 'ert-content-tools'), value: 'warning' },
                            { label: __('Info', 'ert-content-tools'), value: 'info' },
                            { label: __('Light', 'ert-content-tools'), value: 'light' },
                            { label: __('Dark', 'ert-content-tools'), value: 'dark' },
                        ]}
                        onChange={(val) => setAttributes({ type: val })}
                    />
                </PanelBody>
            </InspectorControls>
            <span {...blockProps}>
                <RichText
                    tagName="span"
                    value={attributes.text}
                    onChange={(val) => setAttributes({ text: val })}
                    placeholder={__('Badge text...', 'ert-content-tools')}
                />
            </span>
        </>
    );
}
