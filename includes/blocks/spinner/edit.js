import { __ } from '@wordpress/i18n';
import { useBlockProps, InspectorControls } from '@wordpress/block-editor';
import { PanelBody, SelectControl } from '@wordpress/components';
import { useEffect } from '@wordpress/element';

export default function Edit({ attributes, setAttributes }) {
    const type = attributes.type || window.ERT_BLOCK_DEFAULTS?.spinner_type || 'border';
    const color = attributes.color || window.ERT_BLOCK_DEFAULTS?.spinner_color || 'primary';
    const size = attributes.size || window.ERT_BLOCK_DEFAULTS?.spinner_size || 'md';

    useEffect(() => {
        const next = {};

        if (!attributes.type) {
            next.type = type;
        }

        if (!attributes.color) {
            next.color = color;
        }

        if (!attributes.size) {
            next.size = size;
        }

        if (Object.keys(next).length > 0) {
            setAttributes(next);
        }
    }, []);

    const blockProps = useBlockProps({
        className: `ct-spinner spinner-${type} spinner-${color} spinner-${size}`
    });

    return (
        <>
            <InspectorControls>
                <PanelBody title={__('Spinner Settings', 'ert-content-tools')}>
                    <SelectControl
                        label={__('Type', 'ert-content-tools')}
                        value={type}
                        options={[
                            { label: __('Border', 'ert-content-tools'), value: 'border' },
                            { label: __('Grow', 'ert-content-tools'), value: 'grow' }
                        ]}
                        onChange={(val) => setAttributes({ type: val })}
                    />
                    <SelectControl
                        label={__('Color', 'ert-content-tools')}
                        value={color}
                        options={[
                            { label: __('Primary', 'ert-content-tools'), value: 'primary' },
                            { label: __('Success', 'ert-content-tools'), value: 'success' },
                            { label: __('Danger', 'ert-content-tools'), value: 'danger' },
                            { label: __('Warning', 'ert-content-tools'), value: 'warning' }
                        ]}
                        onChange={(val) => setAttributes({ color: val })}
                    />
                    <SelectControl
                        label={__('Size', 'ert-content-tools')}
                        value={size}
                        options={[
                            { label: __('Small', 'ert-content-tools'), value: 'sm' },
                            { label: __('Medium', 'ert-content-tools'), value: 'md' },
                            { label: __('Large', 'ert-content-tools'), value: 'lg' }
                        ]}
                        onChange={(val) => setAttributes({ size: val })}
                    />
                </PanelBody>
            </InspectorControls>
            <div {...blockProps}></div>
        </>
    );
}
