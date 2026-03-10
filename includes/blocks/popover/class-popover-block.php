<?php
class ERT_Content_Tools_Popover_Block {
    use ERT_Style_Helper;

    public function render($attributes) {
        $inline = $this->build_inline_style($attributes);
        return '<button class="ct-popover btn btn-secondary" data-popover="' . esc_attr($attributes['popover']) . '" style="' . $inline . '">' . esc_html($attributes['text']) . '</button>';
    }
}
