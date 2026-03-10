<?php
class ERT_Content_Tools_Card_Block {
    use ERT_Style_Helper;

    public function render($attributes) {
        $inline = $this->build_inline_style($attributes);
        $output = '<div class="ct-card card" style="' . $inline . '">';

        if (!empty($attributes['title'])) {
            $output .= '<div class="ct-card card-header">' . wp_kses_post($attributes['title']) . '</div>';
        }

        $output .= '<div class="ct-card card-body">' . wp_kses_post($attributes['content']) . '</div>';

        if (!empty($attributes['footer'])) {
            $output .= '<div class="ct-card card-footer">' . wp_kses_post($attributes['footer']) . '</div>';
        }

        $output .= '</div>';
        return $output;
    }
}
