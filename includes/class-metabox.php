<?php
if ( ! defined( 'ABSPATH' ) ) exit;
class ERT_Content_Tools_Metabox {
    public function register() {
        add_action('add_meta_boxes', [$this, 'add']);
        add_action('save_post', [$this, 'save']);
    }

    public function add() {
        add_meta_box(
            'content_tools_tags',
            __('Title HTML Tags', 'ert-content-tools'),
            [$this, 'render'],
            'post',
            'side'
        );
    }

    public function render($post) {
        $value = get_post_meta($post->ID, '_content_tools_tags', true);
        echo '<label>' . __('Title HTML Tags', 'ert-content-tools') . '</label>';
        echo '<textarea name="content_tools_tags">' . esc_textarea($value) . '</textarea>';
    }

    public function save($post_id) {
        if (isset($_POST['content_tools_tags'])) {
            update_post_meta($post_id, '_content_tools_tags', sanitize_text_field($_POST['content_tools_tags']));
        }
    }
}
