import { __ } from '@wordpress/i18n';
import { useBlockProps, InspectorControls, RichText } from '@wordpress/block-editor';
import { PanelBody, SelectControl } from '@wordpress/components';
import { useEffect } from '@wordpress/element';

export default function Edit({ attributes, setAttributes }) {
    useEffect(() => {
        if (!attributes.type && window.ERT_BLOCK_DEFAULTS?.alert_type) {
            setAttributes({ type: window.ERT_BLOCK_DEFAULTS.alert_type });
        }
    }, []);

    const blockProps = useBlockProps({
        className: `ct-alert alert alert-${attributes.type}`,
    });

    return (
        <>
            <InspectorControls>
                <PanelBody title={__('Alert Settings', 'ert-content-tools')}>
                    <SelectControl
                        label={__('Type', 'ert-content-tools')}
                        value={attributes.type}
                        options={[
                            { label: __('Info', 'ert-content-tools'), value: 'info' },
                            { label: __('Success', 'ert-content-tools'), value: 'success' },
                            { label: __('Warning', 'ert-content-tools'), value: 'warning' },
                            { label: __('Danger', 'ert-content-tools'), value: 'danger' },
                            { label: __('Light', 'ert-content-tools'), value: 'light' },
                            { label: __('Dark', 'ert-content-tools'), value: 'dark' },
                        ]}
                        onChange={(val) => setAttributes({ type: val })}
                    />
                </PanelBody>
            </InspectorControls>
            <div {...blockProps}>
                <RichText
                    tagName="div"
                    value={attributes.message}
                    onChange={(val) => setAttributes({ message: val })}
                    placeholder={__('Alert message...', 'ert-content-tools')}
                />
            </div>
        </>
    );
}
