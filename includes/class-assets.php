<?php
if ( ! defined( 'ABSPATH' ) ) exit;
class ERT_Content_Tools_Assets
{
    public function register()
    {
        add_action('enqueue_block_editor_assets', [$this, 'editor_assets']);
        add_action('wp_enqueue_scripts', [$this, 'frontend_assets']);
        add_action('enqueue_block_assets', [$this, 'ert_enqueue_fontawesome']);
    }

    function ert_enqueue_fontawesome()
    {
        wp_enqueue_style(
            'fontawesome',
            'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css',
            array(),
            '6.5.1'
        );
    }

    /**
     * CSS/JS for block editor
     */
    public function editor_assets()
    {
        // Shared assets
        wp_enqueue_style(
            'ert-content-tools-editor',
            plugins_url('../assets/css/ert-content-tools.css', __FILE__),
            [],
            '1.0.0'
        );
        wp_enqueue_script(
            'ert-content-tools-editor',
            plugins_url('../assets/js/ert-content-tools.js', __FILE__),
            ['wp-blocks', 'wp-element', 'wp-editor'],
            '1.0.0',
            true
        );

        // Block-specific CSS is loaded from block.json metadata.
    }

    /**
     * CSS/JS for frontend
     */
    public function frontend_assets()
    {
        // Shared assets
        wp_enqueue_style(
            'ert-content-tools-frontend',
            plugins_url('../assets/css/ert-content-tools.css', __FILE__),
            [],
            '1.0.0'
        );
        wp_enqueue_script(
            'ert-content-tools-frontend',
            plugins_url('../assets/js/ert-content-tools.js', __FILE__),
            ['jquery'],
            '1.0.0',
            true
        );

        // Selected block assets
        $enabled_blocks = get_option('ert_content_tools_enabled_blocks', $this->get_all_blocks());
        $frontend_interactive_scripts = ['accordion', 'collapse', 'modal', 'popover', 'tooltip'];
        foreach ($enabled_blocks as $block) {
            $block_dir = plugin_dir_path(__FILE__) . 'blocks/' . $block . '/';

            // JS
            if (in_array($block, $frontend_interactive_scripts, true) && file_exists($block_dir . 'script.js')) {
                wp_enqueue_script(
                    'ert-block-' . $block . '-frontend',
                    plugins_url('blocks/' . $block . '/script.js', __FILE__),
                    ['jquery'],
                    '1.0.0',
                    true
                );
            }
        }
    }

    /**
     * List of all blocks
     */
    private function get_all_blocks()
    {
        return [
            'toc', 'card', 'alert', 'badge', 'listgroup',
            'modal', 'tooltip', 'accordion', 'collapse',
            'popover', 'progress', 'linkbutton', 'spinner', 'note'
        ];
    }
}
