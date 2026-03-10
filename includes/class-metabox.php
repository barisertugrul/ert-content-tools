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
        echo '<label>' . esc_html(__('Title HTML Tags', 'ert-content-tools')) . '</label>';
        echo '<textarea name="content_tools_tags">' . esc_textarea($value) . '</textarea>';
        wp_nonce_field('ert_content_tools_metabox_nonce', 'ert_content_tools_metabox_nonce');
    }

    public function save($post_id) {
        if (
            !isset($_POST['ert_content_tools_metabox_nonce']) ||
            !wp_verify_nonce($_POST['ert_content_tools_metabox_nonce'], 'ert_content_tools_metabox_nonce')
        ) {
            return;
        }
        if (isset($_POST['content_tools_tags'])) {
            $raw = wp_unslash($_POST['content_tools_tags']);
            update_post_meta($post_id, '_content_tools_tags', sanitize_text_field($raw));
        }
    }
}
