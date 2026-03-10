<?php
class ERT_Content_Tools_LinkButton_Block {
    use ERT_Style_Helper;

    public function render($attributes) {
        $inline = $this->build_inline_style($attributes);
        $class = trim("ct-linkbutton btn btn-{$attributes['type']} " . ($attributes['className'] ?? ''));
        $icon_html = '';
        if (!empty($attributes['icon']) && strpos($attributes['icon'], 'dashicons-') === 0) {
            $icon_html = '<span class="dashicons dashicons-before ' . esc_attr($attributes['icon']) . '" style="margin-right:0.5rem;font-size:1.2em;vertical-align:middle;display:inline-flex;align-items:center;height:1.5em;"></span> ';
        } elseif (!empty($attributes['icon'])) {
            $icon_html = '<i class="' . esc_attr($attributes['icon']) . '" style="margin-right:0.5rem;font-size:1.2em;vertical-align:middle;display:inline-flex;align-items:center;height:1.5em;"></i> ';
        }
        return '<a href="' . esc_url($attributes['url']) . '" class="' . $class . '" style="' . $inline . ';display:inline-flex;align-items:center;">' . $icon_html . esc_html($attributes['text']) . '</a>';
    }
}
