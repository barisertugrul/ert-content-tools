<?php
class ERT_Content_Tools_Spinner_Block {
    use ERT_Style_Helper;

    public function render($attributes, $content = '') {
        $inline = $this->build_inline_style($attributes);
        $classes = 'ct-spinner spinner-' . esc_attr($attributes['type']) .
                   ' spinner-' . esc_attr($attributes['color']) .
                   ' spinner-' . esc_attr($attributes['size']);
        return '<div class="' . $classes . '" style="' . $inline . '"></div>';
    }
}

