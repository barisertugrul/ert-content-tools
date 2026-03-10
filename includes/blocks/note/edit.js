import { __ } from '@wordpress/i18n';
import { useBlockProps, InspectorControls, RichText } from '@wordpress/block-editor';
import { PanelBody, SelectControl, ColorPalette } from '@wordpress/components';

export default function Edit({ attributes, setAttributes }) {
    const blockProps = useBlockProps({
        className: `ct-note note-${attributes.corner}`
    });

    return (
        <>
            <InspectorControls>
                <PanelBody title={__('Note Settings', 'ert-content-tools')}>
                    <SelectControl
                        label={__('Fold Corner', 'ert-content-tools')}
                        value={attributes.corner}
                        options={[
                            { label: 'Top Right', value: 'top-right' },
                            { label: 'Top Left', value: 'top-left' },
                            { label: 'Bottom Right', value: 'bottom-right' },
                            { label: 'Bottom Left', value: 'bottom-left' },
                        ]}
                        onChange={(val) => setAttributes({ corner: val })}
                    />
                    <ColorPalette
                        label={__('Paper Color', 'ert-content-tools')}
                        value={attributes.paperColor}
                        onChange={(val) => setAttributes({ paperColor: val })}
                    />
                    <ColorPalette
                        label={__('Fold Color', 'ert-content-tools')}
                        value={attributes.foldColor}
                        onChange={(val) => setAttributes({ foldColor: val })}
                    />
                    <ColorPalette
                        label={__('Pin Color', 'ert-content-tools')}
                        value={attributes.pinColor}
                        onChange={(val) => setAttributes({ pinColor: val })}
                    />
                </PanelBody>
            </InspectorControls>
            <div {...blockProps}>
                <div className="note-pin" style={{ backgroundColor: attributes.pinColor }}></div>
                <div className="note-fold" style={{ backgroundColor: attributes.foldColor }}></div>
                <RichText
                    tagName="div"
                    className="note-text"
                    value={attributes.text}
                    onChange={(val) => setAttributes({ text: val })}
                    placeholder={__('Write your note...', 'ert-content-tools')}
                />
            </div>
        </>
    );
}
