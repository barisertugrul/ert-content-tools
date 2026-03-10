import { __ } from '@wordpress/i18n';
import { useBlockProps, InspectorControls, RichText } from '@wordpress/block-editor';
import { PanelBody, SelectControl, ColorPalette, BaseControl, RangeControl } from '@wordpress/components';
import { useEffect } from '@wordpress/element';

const FONT_OPTIONS = [
    { label: __('Default', 'ert-content-tools'), value: 'default' },
    { label: __('Handwriting 1', 'ert-content-tools'), value: 'hand-1' },
    { label: __('Handwriting 2', 'ert-content-tools'), value: 'hand-2' },
    { label: __('Handwriting 3', 'ert-content-tools'), value: 'hand-3' },
    { label: __('Marker', 'ert-content-tools'), value: 'marker' },
];

const FONT_FAMILY_MAP = {
    default: '',
    'hand-1': '"Segoe Print", "Bradley Hand", "Comic Sans MS", cursive',
    'hand-2': '"Segoe Script", "Lucida Handwriting", cursive',
    'hand-3': '"Chalkboard SE", "Marker Felt", "Comic Sans MS", cursive',
    marker: '"Trebuchet MS", "Arial", sans-serif',
};

export default function Edit({ attributes, setAttributes }) {
    useEffect(() => {
        let hasChanges = false;
        let nextStyle = attributes.style;

        if (attributes.style?.color) {
            const nextColor = { ...attributes.style.color };
            delete nextColor.background;
            delete nextColor.gradient;

            nextStyle = { ...attributes.style };
            if (Object.keys(nextColor).length > 0) {
                nextStyle.color = nextColor;
            } else {
                delete nextStyle.color;
            }
            hasChanges = true;
        }

        if (nextStyle?.shadow) {
            nextStyle = { ...nextStyle };
            delete nextStyle.shadow;
            hasChanges = true;
        }

        if (attributes.shadow) {
            hasChanges = true;
        }

        let nextClassName = attributes.className;
        if (typeof attributes.className === 'string' && attributes.className.length > 0) {
            const cleaned = attributes.className
                .replace(/(^|\s)has-[^\s]+-background-color/g, ' ')
                .replace(/(^|\s)has-background/g, ' ')
                .replace(/\s+/g, ' ')
                .trim();

            if (cleaned !== attributes.className) {
                nextClassName = cleaned;
                hasChanges = true;
            }
        }

        if (hasChanges) {
            setAttributes({
                ...(nextStyle ? { style: nextStyle } : {}),
                ...(typeof nextClassName === 'string' ? { className: nextClassName } : {}),
                shadow: undefined,
            });
        }
    }, [attributes.style, attributes.className, setAttributes]);

    const noteFont = attributes.noteFont || 'default';
    const noteWidthMode = attributes.noteWidthMode || 'fixed';
    const noteWidth = Number.isFinite(attributes.noteWidth) ? attributes.noteWidth : 320;
    const noteWidthUnit = attributes.noteWidthUnit || 'px';
    const noteAlign = attributes.noteAlign || 'left';
    const noteTextAlign = attributes.noteTextAlign || 'left';
    const outerShadow = attributes.outerShadow || 'soft';
    const foldShadow = attributes.foldShadow || 'soft';
    const noteTextStyle = {
        ...(FONT_FAMILY_MAP[noteFont] ? { fontFamily: FONT_FAMILY_MAP[noteFont] } : {}),
        textAlign: noteTextAlign,
    };

    const widthStyles = noteWidthMode === 'full'
        ? { width: '100%', minWidth: '0' }
        : noteWidthUnit === '%'
            ? { width: `${noteWidth}%`, minWidth: '0' }
            : { width: `${noteWidth}px`, minWidth: `${noteWidth}px` };

    const blockProps = useBlockProps({
        className: `ct-note note-${attributes.corner} note-width-${noteWidthMode} note-align-${noteAlign} note-outer-shadow-${outerShadow} note-fold-shadow-${foldShadow}`,
        style: {
            '--ct-note-paper': attributes.paperColor,
            ...widthStyles,
        }
    });

    // Fold shadow inline style
    function getFoldBoxShadow(foldShadow, corner) {
        if (foldShadow === 'none') return { boxShadow: 'none' };
        // Soft
        if (foldShadow === 'soft') {
            if (corner === 'top-right') return { boxShadow: '-4px 4px 7px 0px rgba(0,0,0,0.18)' };
            if (corner === 'top-left') return { boxShadow: '4px 4px 7px 0px rgba(0,0,0,0.18)' };
            if (corner === 'bottom-right') return { boxShadow: '-4px -4px 7px 0px rgba(0,0,0,0.18)' };
            if (corner === 'bottom-left') return { boxShadow: '4px -4px 7px 0px rgba(0,0,0,0.18)' };
        }
        // Medium
        if (foldShadow === 'medium') {
            if (corner === 'top-right') return { boxShadow: '-4px 4px 9px 0px rgba(0,0,0,0.22)' };
            if (corner === 'top-left') return { boxShadow: '4px 4px 9px 0px rgba(0,0,0,0.22)' };
            if (corner === 'bottom-right') return { boxShadow: '-4px -4px 9px 0px rgba(0,0,0,0.22)' };
            if (corner === 'bottom-left') return { boxShadow: '4px -4px 9px 0px rgba(0,0,0,0.22)' };
        }
        // Strong
        if (foldShadow === 'strong') {
            if (corner === 'top-right') return { boxShadow: '-4px 4px 12px 0px rgba(0,0,0,0.30)' };
            if (corner === 'top-left') return { boxShadow: '4px 4px 12px 0px rgba(0,0,0,0.30)' };
            if (corner === 'bottom-right') return { boxShadow: '-4px -4px 12px 0px rgba(0,0,0,0.30)' };
            if (corner === 'bottom-left') return { boxShadow: '4px -4px 12px 0px rgba(0,0,0,0.30)' };
        }
        return {};
    }
    const foldStyle = getFoldBoxShadow(foldShadow, attributes.corner);

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
                    <SelectControl
                        label={__('Note Width', 'ert-content-tools')}
                        value={noteWidthMode}
                        options={[
                            { label: __('Custom (px)', 'ert-content-tools'), value: 'fixed' },
                            { label: __('Full Width', 'ert-content-tools'), value: 'full' },
                        ]}
                        onChange={(val) => setAttributes({ noteWidthMode: val })}
                    />
                    <SelectControl
                        label={__('Note Position', 'ert-content-tools')}
                        value={noteAlign}
                        options={[
                            { label: __('Left', 'ert-content-tools'), value: 'left' },
                            { label: __('Center', 'ert-content-tools'), value: 'center' },
                            { label: __('Right', 'ert-content-tools'), value: 'right' },
                        ]}
                        onChange={(val) => setAttributes({ noteAlign: val })}
                    />
                    <SelectControl
                        label={__('Text Align', 'ert-content-tools')}
                        value={noteTextAlign}
                        options={[
                            { label: __('Left', 'ert-content-tools'), value: 'left' },
                            { label: __('Center', 'ert-content-tools'), value: 'center' },
                            { label: __('Right', 'ert-content-tools'), value: 'right' },
                            { label: __('Justify', 'ert-content-tools'), value: 'justify' },
                        ]}
                        onChange={(val) => setAttributes({ noteTextAlign: val })}
                    />
                    <SelectControl
                        label={__('Outer Shadow', 'ert-content-tools')}
                        value={outerShadow}
                        options={[
                            { label: __('None', 'ert-content-tools'), value: 'none' },
                            { label: __('Soft', 'ert-content-tools'), value: 'soft' },
                            { label: __('Medium', 'ert-content-tools'), value: 'medium' },
                            { label: __('Strong', 'ert-content-tools'), value: 'strong' },
                        ]}
                        onChange={(val) => setAttributes({ outerShadow: val })}
                    />
                    <SelectControl
                        label={__('Fold Shadow', 'ert-content-tools')}
                        value={foldShadow}
                        options={[
                            { label: __('None', 'ert-content-tools'), value: 'none' },
                            { label: __('Soft', 'ert-content-tools'), value: 'soft' },
                            { label: __('Medium', 'ert-content-tools'), value: 'medium' },
                            { label: __('Strong', 'ert-content-tools'), value: 'strong' },
                        ]}
                        onChange={(val) => setAttributes({ foldShadow: val })}
                    />
                    {noteWidthMode === 'fixed' && (
                        <>
                            <SelectControl
                                label={__('Width Unit', 'ert-content-tools')}
                                value={noteWidthUnit}
                                options={[
                                    { label: __('Pixels (px)', 'ert-content-tools'), value: 'px' },
                                    { label: __('Percent (%)', 'ert-content-tools'), value: '%' },
                                ]}
                                onChange={(val) => setAttributes({
                                    noteWidthUnit: val,
                                    noteWidth: val === '%' ? Math.min(100, Math.max(20, noteWidth)) : Math.min(1200, Math.max(220, noteWidth)),
                                })}
                            />
                            <RangeControl
                                label={noteWidthUnit === '%' ? __('Width (%)', 'ert-content-tools') : __('Width (px)', 'ert-content-tools')}
                                value={noteWidth}
                                onChange={(val) => setAttributes({ noteWidth: val })}
                                min={noteWidthUnit === '%' ? 20 : 220}
                                max={noteWidthUnit === '%' ? 100 : 1200}
                                step={noteWidthUnit === '%' ? 1 : 10}
                            />
                        </>
                    )}
                    <SelectControl
                        label={__('Note Font', 'ert-content-tools')}
                        value={noteFont}
                        options={FONT_OPTIONS}
                        onChange={(val) => setAttributes({ noteFont: val })}
                    />
                    <BaseControl label={__('Paper Color', 'ert-content-tools')}>
                        <ColorPalette
                            value={attributes.paperColor}
                            onChange={(val) => setAttributes({ paperColor: val })}
                        />
                    </BaseControl>
                    <BaseControl label={__('Pin Color', 'ert-content-tools')}>
                        <ColorPalette
                            value={attributes.pinColor}
                            onChange={(val) => setAttributes({ pinColor: val })}
                        />
                    </BaseControl>
                </PanelBody>
            </InspectorControls>
            <div {...blockProps}>
                <div className="note-pin" style={{ backgroundColor: attributes.pinColor }}></div>
                <div className="note-shadow-wrap">
                    <div className="note-surface">
                        <div className="note-fold" style={foldStyle}></div>
                        <RichText
                            tagName="div"
                            className="note-text"
                            style={noteTextStyle}
                            value={attributes.text}
                            onChange={(val) => setAttributes({ text: val })}
                            placeholder={__('Write your note...', 'ert-content-tools')}
                        />
                    </div>
                </div>
            </div>
        </>
    );
}
