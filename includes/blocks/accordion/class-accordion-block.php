<?php
class ERT_Content_Tools_Accordion_Block {
    use ERT_Style_Helper;

    public function render($attributes, $content = '') {
        $inline = $this->build_inline_style($attributes);
        $accordion_uid = uniqid('acc_');
        $output = '<div class="ct-accordion accordion" style="' . $inline . '">';
        foreach ($attributes['items'] as $index => $item) {
            $id = $accordion_uid . '_' . $index;
            $output .= '<div class="accordion-item">
                            <div class="ct-accordion accordion-header" data-toggle="collapse" data-target="#' . esc_attr($id) . '" role="button" tabindex="0" aria-controls="' . esc_attr($id) . '" aria-expanded="false">' . wp_kses_post($item['title']) . '</div>
                            <div id="' . esc_attr($id) . '" class="ct-accordion accordion-body collapse" aria-hidden="true">' . wp_kses_post($item['content']) . '</div>
                        </div>';
        }
        $output .= '</div>';
        return $output;
    }
}
