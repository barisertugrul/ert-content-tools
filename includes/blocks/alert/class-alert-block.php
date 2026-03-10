<?php
class ERT_Content_Tools_Alert_Block {
    use ERT_Style_Helper;

    public function render($attributes, $content = '') {
        $type = $attributes['type'] ?? 'info';
        $message = $attributes['message'] ?? '';
        $inline = $this->build_inline_style($attributes);
        return '<div class="ct-alert alert alert-' . esc_attr($type) . '" style="' . $inline . '">' . wp_kses_post($message) . '</div>';
    }
}

