<?php
class ERT_Content_Tools_Badge_Block {
    use ERT_Style_Helper;

    public function render( $attributes, $content = '' ) {

        $inline = $this->build_inline_style( $attributes );

        $type = $attributes['type'] ?? 'primary';
        $text = $attributes['text'] ?? '';

        // Use standard block wrapper classes
        $classes = 'ct-badge badge badge-' . esc_attr($type);

        return '<span class="' . $classes . '" style="' . esc_attr($inline) . '">' .
                    esc_html($text) .
               '</span>';
    }
}
