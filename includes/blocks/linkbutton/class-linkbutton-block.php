<?php
class ERT_Content_Tools_LinkButton_Block {
    use ERT_Style_Helper;

    public function render($attributes) {
        $inline = $this->build_inline_style($attributes);
        $class = trim("ct-linkbutton btn btn-{$attributes['type']} " . ($attributes['className'] ?? ''));
        $icon = !empty($attributes['icon']) ? '<i class="fa ' . esc_attr($attributes['icon']) . '"></i> ' : '';
        return '<a href="' . esc_url($attributes['url']) . '" class="' . $class . '" style="' . $inline . '">' . $icon . esc_html($attributes['text']) . '</a>';
    }
}
