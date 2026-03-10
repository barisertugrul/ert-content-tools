import { __ } from '@wordpress/i18n';
import { useBlockProps, InspectorControls } from '@wordpress/block-editor';
import { PanelBody, RangeControl, SelectControl, BaseControl, ToggleControl, Button } from '@wordpress/components';
import { useEffect } from '@wordpress/element';

const VARIANT_OPTIONS = [
    { label: __('Primary', 'ert-content-tools'), value: 'primary' },
    { label: __('Secondary', 'ert-content-tools'), value: 'secondary' },
    { label: __('Success', 'ert-content-tools'), value: 'success' },
    { label: __('Danger', 'ert-content-tools'), value: 'danger' },
    { label: __('Warning', 'ert-content-tools'), value: 'warning' },
    { label: __('Info', 'ert-content-tools'), value: 'info' },
    { label: __('Dark', 'ert-content-tools'), value: 'dark' },
    { label: __('Light', 'ert-content-tools'), value: 'light' },
];

const PRESET_COLORS = {
    primary: { bar: '#0d6efd', text: '#ffffff' },
    secondary: { bar: '#6c757d', text: '#ffffff' },
    success: { bar: '#198754', text: '#ffffff' },
    danger: { bar: '#dc3545', text: '#ffffff' },
    warning: { bar: '#ffc107', text: '#212529' },
    info: { bar: '#0dcaf0', text: '#212529' },
    dark: { bar: '#212529', text: '#ffffff' },
    light: { bar: '#f8f9fa', text: '#212529' },
};

function getContrastColor(hex, dark = '#212529', light = '#ffffff') {
    if (!hex || typeof hex !== 'string') {
        return dark;
    }

    const normalized = hex.replace('#', '');
    if (![3, 6].includes(normalized.length)) {
        return dark;
    }

    const fullHex = normalized.length === 3
        ? normalized.split('').map(ch => ch + ch).join('')
        : normalized;

    const r = parseInt(fullHex.slice(0, 2), 16);
    const g = parseInt(fullHex.slice(2, 4), 16);
    const b = parseInt(fullHex.slice(4, 6), 16);

    if ([r, g, b].some(Number.isNaN)) {
        return dark;
    }

    const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
    return luminance > 0.6 ? dark : light;
}

export default function Edit({ attributes, setAttributes }) {
    const value = Number.isFinite(attributes.value) ? attributes.value : 50;
    const showLabel = attributes.showLabel !== false;
    const variant = attributes.variant || window.ERT_BLOCK_DEFAULTS?.progress_variant || 'primary';
    const preset = PRESET_COLORS[variant] || PRESET_COLORS.primary;
    const trackColor = attributes.trackColor || window.ERT_BLOCK_DEFAULTS?.progress_track_color || '#e9ecef';
    const barColor = attributes.barColor || window.ERT_BLOCK_DEFAULTS?.progress_bar_color || preset.bar;
    const textColor = attributes.textColor || window.ERT_BLOCK_DEFAULTS?.progress_text_color || preset.text;

    useEffect(() => {
        const next = {};

        if (!attributes.variant && window.ERT_BLOCK_DEFAULTS?.progress_variant) {
            next.variant = window.ERT_BLOCK_DEFAULTS.progress_variant;
        }

        if (!attributes.trackColor && window.ERT_BLOCK_DEFAULTS?.progress_track_color) {
            next.trackColor = window.ERT_BLOCK_DEFAULTS.progress_track_color;
        }

        if (!attributes.barColor && window.ERT_BLOCK_DEFAULTS?.progress_bar_color) {
            next.barColor = window.ERT_BLOCK_DEFAULTS.progress_bar_color;
        }

        if (!attributes.textColor && window.ERT_BLOCK_DEFAULTS?.progress_text_color) {
            next.textColor = window.ERT_BLOCK_DEFAULTS.progress_text_color;
        }

        if (Object.keys(next).length > 0) {
            setAttributes(next);
        }
    }, []);

    const barTextColor = textColor || getContrastColor(barColor || preset.bar, '#212529', '#ffffff');
    const trackTextColor = getContrastColor(trackColor || '#e9ecef', '#212529', '#ffffff');

    const styleVars = {
        '--ct-progress-track': trackColor,
        '--ct-progress-bar': barColor,
        '--ct-progress-text': textColor,
        '--ct-progress-text-on-bar': barTextColor,
        '--ct-progress-text-on-track': trackTextColor,
    };

    const blockProps = useBlockProps({
        className: `ct-progress progress ct-progress-${variant}`,
        style: styleVars,
    });

    return (
        <>
            <InspectorControls>
                <PanelBody title={__('Progress Settings', 'ert-content-tools')}>
                    <RangeControl
                        label={__('Value', 'ert-content-tools')}
                        value={value}
                        onChange={(val) => setAttributes({ value: val })}
                        min={0}
                        max={100}
                    />
                    <ToggleControl
                        label={__('Show Percentage Text', 'ert-content-tools')}
                        checked={showLabel}
                        onChange={(val) => setAttributes({ showLabel: val })}
                    />
                    <SelectControl
                        label={__('Preset Color', 'ert-content-tools')}
                        value={variant}
                        options={VARIANT_OPTIONS}
                        onChange={(val) => setAttributes({ variant: val, barColor: '', textColor: '' })}
                    />
                    <BaseControl label={__('Track Color (optional override)', 'ert-content-tools')}>
                        <input
                            type="color"
                            value={trackColor}
                            onChange={(e) => setAttributes({ trackColor: e.target.value })}
                        />
                    </BaseControl>
                    <BaseControl label={__('Bar Color (optional override)', 'ert-content-tools')}>
                        <input
                            type="color"
                            value={barColor}
                            onChange={(e) => setAttributes({ barColor: e.target.value })}
                        />
                    </BaseControl>
                    <BaseControl label={__('Text Color (optional override)', 'ert-content-tools')}>
                        <input
                            type="color"
                            value={textColor}
                            onChange={(e) => setAttributes({ textColor: e.target.value })}
                        />
                    </BaseControl>
                    <Button
                        variant="secondary"
                        onClick={() => setAttributes({
                            trackColor: '',
                            barColor: '',
                            textColor: '',
                        })}
                    >
                        {__('Reset Color Overrides', 'ert-content-tools')}
                    </Button>
                </PanelBody>
            </InspectorControls>
            <div {...blockProps} style={{ ...styleVars, backgroundColor: trackColor }}>
                <div className="progress-bar" style={{ width: `${value}%`, backgroundColor: barColor, color: barTextColor }}></div>
                {showLabel && (
                    <div className="ct-progress-label" aria-hidden="true">
                        <span className="ct-progress-label-track">{value}%</span>
                    </div>
                )}
            </div>
        </>
    );
}
