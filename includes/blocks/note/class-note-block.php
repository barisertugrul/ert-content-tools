<?php
class ERT_Content_Tools_Note_Block {
    use ERT_Style_Helper;

    public function render($attributes, $content = '') {
        $inline = $this->build_inline_style($attributes);
        $corner = $attributes['corner'] ?? 'top-right';
        $paperColor = $attributes['paperColor'] ?? '#fff8b0';
        $foldColor = $attributes['foldColor'] ?? '#e0d080';
        $pinColor = $attributes['pinColor'] ?? '#ff0000';
        $text = $attributes['text'] ?? '';

        return '<div class="ct-note note-' . esc_attr($corner) . '" style="background-color:' . esc_attr($paperColor) . ';' . $inline . '">
                    <div class="note-pin" style="background-color:' . esc_attr($pinColor) . '"></div>
                    <div class="note-fold" style="background-color:' . esc_attr($foldColor) . '"></div>
                    <div class="note-text">' . wp_kses_post($text) . '</div>
                </div>';
    }
}
