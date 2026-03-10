<?php
class ERT_Content_Tools_TOC_Block {
    use ERT_Style_Helper;

    public function render($attributes) {
        global $post;
        $content = $post->post_content;
        $inline = $this->build_inline_style($attributes);

        preg_match_all('/<h([2-4])[^>]*>(.*?)<\/h\1>/', $content, $matches);

        $output = '<div class="ct-toc card" style="' . $inline . '">';
        $output .= '<div class="card-header">' . esc_html($attributes['title']) . '</div>';
        $output .= '<ul class="list-group list-group-flush">';

        foreach ($matches[2] as $heading) {
            $slug = sanitize_title($heading);
            $output .= '<li class="list-group-item"><a href="#' . esc_attr($slug) . '">' . esc_html($heading) . '</a></li>';
        }

        $output .= '</ul></div>';
        return $output;
    }
}
