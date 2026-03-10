<?php
class ERT_Content_Tools_ListGroup_Block {
    use ERT_Style_Helper;

    public function render($attributes) {
        $items = is_array($attributes['items']) ? $attributes['items'] : [];
        $inline = $this->build_inline_style($attributes);

        $output = '<div class="ct-listgroup" style="' . esc_attr($inline) . '">';
        $output .= '<ul class="list-group">';

        foreach ($items as $index => $item) {
            if (!is_array($item)) {
                continue;
            }

            $icon_html = '';
            if (!empty($item['icon']) && strpos($item['icon'], 'dashicons-') === 0) {
                $icon_html = '<span class="dashicons dashicons-before ' . esc_attr($item['icon']) . '" style="margin-right:0.5rem;font-size:1.2em;"></span>';
            } elseif (!empty($item['icon'])) {
                $icon_html = '<i class="' . esc_attr($item['icon']) . '" style="margin-right:0.5rem;font-size:1.2em;"></i>';
            }
            $text = !empty($item['text']) ? esc_html($item['text']) : '';
            $badge_text = !empty($item['badge']) ? esc_html($item['badge']) : ($index + 1);
            $badge_color = !empty($item['badgeColor']) ? esc_attr($item['badgeColor']) : 'primary';

            $output .= '<li id="' . esc_attr($item['id']) . '" class="list-group-item d-flex justify-content-between align-items-center">';
            $output .= '<div class="d-flex align-items-center">';
            $output .= $icon_html;
            $output .= '<span class="listgroup-item-text">' . $text . '</span>';
            $output .= '<span class="badge bg-' . $badge_color . ' rounded-pill">' . $badge_text . '</span>';
            $output .= '</div>';
            $output .= '</li>';
        }

        $output .= '</ul>';
        $output .= '</div>';

        return $output;
    }
}
