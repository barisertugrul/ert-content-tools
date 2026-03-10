<?php
class ERT_Content_Tools_Tooltip_Block {
    use ERT_Style_Helper;

    public function render($attributes) {
        $inline = $this->build_inline_style($attributes);
        return '<span class="ct-tooltip" data-tooltip="' . esc_attr($attributes['tooltip']) . '" style="' . $inline . '">' . esc_html($attributes['text']) . '</span>';
    }
}
