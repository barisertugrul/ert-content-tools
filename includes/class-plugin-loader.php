<?php
class ERT_Content_Tools_Loader {
    public function init() {
        // Style Helper - Load first so all blocks can use it
        require_once plugin_dir_path(__FILE__) . 'style-helper.php';

        // Assets
        require_once plugin_dir_path(__FILE__) . 'class-assets.php';
        $assets = new ERT_Content_Tools_Assets();
        $assets->register();

        // Meta Box
        require_once plugin_dir_path(__FILE__) . 'class-metabox.php';
        $metabox = new ERT_Content_Tools_Metabox();
        $metabox->register();

        // Blocks
        require_once plugin_dir_path(__FILE__) . 'class-blocks.php';
        $blocks = new ERT_Content_Tools_Blocks();
        $blocks->enqueue_defaults();
        $blocks->force_enable_style_engine();
        $blocks->register( $this->get_enabled_blocks(), $this->get_defaults(), $this->get_global_class() );
    }

    /**
     * Get enabled blocks from settings
     */
    private function get_enabled_blocks() {
        $all_blocks = [
            'toc', 'card', 'alert', 'badge', 'listgroup',
            'modal', 'tooltip', 'accordion', 'collapse',
            'popover', 'progress', 'linkbutton', 'spinner', 'note'
        ];
        $enabled = get_option('ert_content_tools_enabled_blocks', $all_blocks);
        return is_array($enabled) ? $enabled : $all_blocks;
    }

    /**
     * Get default settings
     */
    private function get_defaults() {
        $defaults = [
            'alert_type' => 'info',
            'spinner_type' => 'border',
            'spinner_color' => 'primary',
            'spinner_size' => 'md'
        ];

        $saved = get_option('ert_content_tools_defaults', []);
        if (!is_array($saved)) {
            return $defaults;
        }

        return wp_parse_args($saved, $defaults);
    }

    /**
     * Get global CSS class prefix
     */
    private function get_global_class() {
        return get_option('ert_content_tools_global_class', '');
    }
}
