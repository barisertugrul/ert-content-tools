<?php
class ERT_Content_Tools_Note_Block {
    use ERT_Style_Helper;

    private function get_note_font_family($font_key) {
        $map = [
            'hand-1' => '"Segoe Print", "Bradley Hand", "Comic Sans MS", cursive',
            'hand-2' => '"Segoe Script", "Lucida Handwriting", cursive',
            'hand-3' => '"Chalkboard SE", "Marker Felt", "Comic Sans MS", cursive',
            'marker' => '"Trebuchet MS", "Arial", sans-serif',
        ];

        return $map[$font_key] ?? '';
    }

    public function render($attributes, $content = '') {
        $styleAttributes = $attributes;
        unset($styleAttributes['shadow']);
        if (!empty($styleAttributes['style']) && is_array($styleAttributes['style'])) {
            unset($styleAttributes['style']['shadow']);
        }
        $inline = $this->build_inline_style($styleAttributes);
        $corner = $attributes['corner'] ?? 'top-right';
        $paperColor = $attributes['paperColor'] ?? '#fff8b0';
        $noteWidthMode = $attributes['noteWidthMode'] ?? 'fixed';
        $noteWidthUnit = $attributes['noteWidthUnit'] ?? 'px';
        $noteWidth = isset($attributes['noteWidth']) ? intval($attributes['noteWidth']) : 320;
        $noteAlign = $attributes['noteAlign'] ?? 'left';
        $noteTextAlign = $attributes['noteTextAlign'] ?? 'left';
        $outerShadow = $attributes['outerShadow'] ?? 'soft';
        $foldShadow = $attributes['foldShadow'] ?? 'soft';
        if ('%' === $noteWidthUnit) {
            $noteWidth = max(20, min(100, $noteWidth));
        } else {
            $noteWidth = max(220, min(1200, $noteWidth));
            $noteWidthUnit = 'px';
        }
        $noteFont = $attributes['noteFont'] ?? 'default';
        $pinColor = $attributes['pinColor'] ?? '#ff0000';
        $text = $attributes['text'] ?? '';
        $fontFamily = $this->get_note_font_family($noteFont);
        $noteTextStyle = '';

        $widthInline = ('full' === $noteWidthMode)
            ? 'width:100%;min-width:0;'
            : ('%' === $noteWidthUnit
                ? 'width:' . esc_attr($noteWidth) . '%;min-width:0;'
                : 'width:' . esc_attr($noteWidth) . 'px;min-width:' . esc_attr($noteWidth) . 'px;');

        if (!empty($fontFamily)) {
            $noteTextStyle = ' style="font-family:' . esc_attr($fontFamily) . ';text-align:' . esc_attr($noteTextAlign) . ';"';
        } else {
            $noteTextStyle = ' style="text-align:' . esc_attr($noteTextAlign) . ';"';
        }

        // Fold shadow box-shadow hesaplama
        $foldBoxShadow = '';
        if ($foldShadow === 'soft') {
            if ($corner === 'top-right') $foldBoxShadow = 'box-shadow:-4px 4px 7px 0px rgba(0,0,0,0.18);';
            if ($corner === 'top-left') $foldBoxShadow = 'box-shadow:4px 4px 7px 0px rgba(0,0,0,0.18);';
            if ($corner === 'bottom-right') $foldBoxShadow = 'box-shadow:-4px -4px 7px 0px rgba(0,0,0,0.18);';
            if ($corner === 'bottom-left') $foldBoxShadow = 'box-shadow:4px -4px 7px 0px rgba(0,0,0,0.18);';
        } elseif ($foldShadow === 'medium') {
            if ($corner === 'top-right') $foldBoxShadow = 'box-shadow:-4px 4px 9px 0px rgba(0,0,0,0.22);';
            if ($corner === 'top-left') $foldBoxShadow = 'box-shadow:4px 4px 9px 0px rgba(0,0,0,0.22);';
            if ($corner === 'bottom-right') $foldBoxShadow = 'box-shadow:-4px -4px 9px 0px rgba(0,0,0,0.22);';
            if ($corner === 'bottom-left') $foldBoxShadow = 'box-shadow:4px -4px 9px 0px rgba(0,0,0,0.22);';
        } elseif ($foldShadow === 'strong') {
            if ($corner === 'top-right') $foldBoxShadow = 'box-shadow:-4px 4px 12px 0px rgba(0,0,0,0.30);';
            if ($corner === 'top-left') $foldBoxShadow = 'box-shadow:4px 4px 12px 0px rgba(0,0,0,0.30);';
            if ($corner === 'bottom-right') $foldBoxShadow = 'box-shadow:-4px -4px 12px 0px rgba(0,0,0,0.30);';
            if ($corner === 'bottom-left') $foldBoxShadow = 'box-shadow:4px -4px 12px 0px rgba(0,0,0,0.30);';
        } elseif ($foldShadow === 'none') {
            $foldBoxShadow = 'box-shadow:none;';
        }

        return '<div class="ct-note note-' . esc_attr($corner) . ' note-width-' . esc_attr($noteWidthMode) . ' note-align-' . esc_attr($noteAlign) . ' note-outer-shadow-' . esc_attr($outerShadow) . ' note-fold-shadow-' . esc_attr($foldShadow) . '" style="--ct-note-paper:' . esc_attr($paperColor) . ';' . $widthInline . $inline . '">
                    <div class="note-pin" style="background-color:' . esc_attr($pinColor) . '"></div>
                    <div class="note-shadow-wrap">
                        <div class="note-surface">
                            <div class="note-fold" style="' . $foldBoxShadow . '"></div>
                            <div class="note-text"' . $noteTextStyle . '>' . wp_kses_post($text) . '</div>
                        </div>
                    </div>
                </div>';
    }
}
