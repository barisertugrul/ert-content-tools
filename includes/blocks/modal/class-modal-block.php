<?php
class ERT_Content_Tools_Modal_Block {
    use ERT_Style_Helper;

    public function render($attributes) {
        $inline = $this->build_inline_style($attributes);
        return '<button class="btn btn-primary" data-toggle="modal" data-target="#' . esc_attr($attributes['id']) . '">' . esc_html($attributes['buttonText']) . '</button>
                <div id="' . esc_attr($attributes['id']) . '" class="ct-modal modal" style="' . $inline . '">
                    <div class="modal-content">
                        <div class="modal-header"><h5>' . wp_kses_post($attributes['title']) . '</h5></div>
                        <div class="modal-body">' . wp_kses_post($attributes['content']) . '</div>
                        <div class="modal-footer"><button class="btn btn-secondary" data-dismiss="modal">' . esc_html__('Close', 'ert-content-tools') . '</button></div>
                    </div>
                </div>';
    }
}
