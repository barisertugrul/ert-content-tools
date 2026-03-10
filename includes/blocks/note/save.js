import { useBlockProps, RichText } from '@wordpress/block-editor';

const FONT_FAMILY_MAP = {
    default: '',
    'hand-1': '"Segoe Print", "Bradley Hand", "Comic Sans MS", cursive',
    'hand-2': '"Segoe Script", "Lucida Handwriting", cursive',
    'hand-3': '"Chalkboard SE", "Marker Felt", "Comic Sans MS", cursive',
    marker: '"Trebuchet MS", "Arial", sans-serif',
};

export default function save({ attributes }) {
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

    const blockProps = useBlockProps.save({
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
        <div {...blockProps}>
            <div className="note-pin" style={{ backgroundColor: attributes.pinColor }}></div>
            <div className="note-shadow-wrap">
                <div className="note-surface">
                    <div className="note-fold" style={foldStyle}></div>
                    <RichText.Content tagName="div" className="note-text" style={noteTextStyle} value={attributes.text} />
                </div>
            </div>
        </div>
    );
}