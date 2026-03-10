<?php
class ERT_Content_Tools_Collapse_Block {
    use ERT_Style_Helper;

    public function render($attributes) {
        $id = uniqid('collapse_');
        $inline = $this->build_inline_style($attributes);
        return '<div class="ct-collapse" style="' . $inline . '">
            <div class="ct-collapse header" data-toggle="collapse" data-target="#' . esc_attr($id) . '" role="button" tabindex="0" aria-controls="' . esc_attr($id) . '" aria-expanded="false">' . wp_kses_post($attributes['title']) . '</div>
            <div id="' . esc_attr($id) . '" class="ct-collapse body collapse" aria-hidden="true">' . wp_kses_post($attributes['content']) . '</div>
        </div>';
    }
}
