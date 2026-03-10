import { useBlockProps } from '@wordpress/block-editor';

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

export default function save({ attributes }) {
    const value = Number.isFinite(attributes.value) ? attributes.value : 50;
    const showLabel = attributes.showLabel !== false;
    const variant = attributes.variant || 'primary';
    const preset = PRESET_COLORS[variant] || PRESET_COLORS.primary;
    const effectiveTrack = attributes.trackColor || '#e9ecef';
    const effectiveBar = attributes.barColor || preset.bar;
    const effectiveText = attributes.textColor || preset.text;
    const barTextColor = effectiveText || getContrastColor(effectiveBar, '#212529', '#ffffff');
    const trackTextColor = getContrastColor(effectiveTrack, '#212529', '#ffffff');
    const styleVars = {
        '--ct-progress-track': effectiveTrack,
        '--ct-progress-bar': effectiveBar,
        '--ct-progress-text': effectiveText,
        '--ct-progress-text-on-bar': barTextColor,
        '--ct-progress-text-on-track': trackTextColor,
    };

    const blockProps = useBlockProps.save({
        className: `ct-progress progress ct-progress-${variant}`,
        style: styleVars,
    });

    return (
        <div {...blockProps} style={{ ...styleVars, backgroundColor: effectiveTrack }}>
            <div className="progress-bar" style={{ width: value + '%', backgroundColor: effectiveBar, color: barTextColor }}></div>
            {showLabel && (
                <div className="ct-progress-label" aria-hidden="true">
                    <span className="ct-progress-label-track">{value}%</span>
                </div>
            )}
        </div>
    );
}