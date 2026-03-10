<?php
class ERT_Content_Tools_Progress_Block {
    use ERT_Style_Helper;

    public function render($attributes, $content = '') {
        $inline = $this->build_inline_style($attributes);
        $value = intval($attributes['value'] ?? 50);
        $value = max(0, min(100, $value));
        $show_label = !isset($attributes['showLabel']) || $attributes['showLabel'] !== false;
        $allowed_variants = [ 'primary', 'secondary', 'success', 'danger', 'warning', 'info', 'dark', 'light' ];
        $variant = sanitize_key($attributes['variant'] ?? 'primary');
        if (!in_array($variant, $allowed_variants, true)) {
            $variant = 'primary';
        }

        $classes = 'ct-progress progress ct-progress-' . esc_attr($variant);

        $output  = '<div class="' . $classes . '" style="' . esc_attr($inline) . '">';
        $output .= '<div class="progress-bar" style="width:' . esc_attr($value) . '%;"></div>';

        if ($show_label) {
            $output .= '<div class="ct-progress-label" aria-hidden="true">';
            $output .= '<span class="ct-progress-label-track">' . esc_html($value) . '%</span>';
            $output .= '</div>';
        }

        $output .= '</div>';

        return $output;
    }
}
