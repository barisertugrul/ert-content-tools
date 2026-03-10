<?php
if ( ! defined( 'ABSPATH' ) ) exit;
class ERT_Content_Tools_Blocks {

    /**
     * Global defaults JS'e aktarÄ±lÄ±r (editÃ¶r iÃ§in)
     */
    public function enqueue_defaults() {
        add_action('enqueue_block_editor_assets', function() {
            $defaults = get_option('ert_content_tools_defaults', [
                'alert_type'   => 'info',
                'spinner_type' => 'border',
                'spinner_color'=> 'primary',
                'spinner_size' => 'md',
                'progress_variant' => 'primary',
                'progress_track_color' => '#e9ecef',
                'progress_bar_color' => '',
                'progress_text_color' => '',
            ]);

            if (!is_array($defaults)) {
                $defaults = [];
            }

            $defaults = wp_parse_args($defaults, [
                'alert_type'   => 'info',
                'spinner_type' => 'border',
                'spinner_color'=> 'primary',
                'spinner_size' => 'md',
                'progress_variant' => 'primary',
                'progress_track_color' => '#e9ecef',
                'progress_bar_color' => '',
                'progress_text_color' => '',
            ]);

            wp_add_inline_script(
                'wp-blocks',
                'window.ERT_BLOCK_DEFAULTS = ' . wp_json_encode($defaults) . ';',
                'before'
            );
        });
    }

    /**
     * FRONTEND iÃ§in style.css dosyalarÄ±nÄ± yÃ¼kler
     * (Dinamik bloklarda WP otomatik yÃ¼klemez!)
     */
    public function enqueue_block_styles() {
        $blocks = glob(plugin_dir_path(__FILE__) . 'blocks/*/style.css');

        foreach ($blocks as $style_file) {
            $block_dir  = dirname($style_file);
            $block_name = basename($block_dir);

            wp_enqueue_style(
                "ert-block-$block_name",
                plugins_url("blocks/$block_name/style.css", __FILE__),
                [],
                filemtime($style_file)
            );
        }
    }

    /**
     * BloklarÄ± register eder (dinamik render + defaults + global class)
     */
    public function register($enabled_blocks, $defaults, $global_class) {

        foreach ($enabled_blocks as $block) {

            $dir = plugin_dir_path(__FILE__) . 'blocks/' . $block . '/';

            if (!file_exists($dir . 'block.json')) {
                error_log("Block JSON not found: " . $block);
                continue;
            }

            $render_callback = function($attributes, $content) use ($block, $defaults, $global_class, $dir) {

                // VarsayÄ±lanlarÄ± uygula
                if ($block === 'alert' && empty($attributes['type'])) {
                    $attributes['type'] = $defaults['alert_type'];
                }

                if ($block === 'spinner') {
                    if (empty($attributes['type']))  $attributes['type']  = $defaults['spinner_type'];
                    if (empty($attributes['color'])) $attributes['color'] = $defaults['spinner_color'];
                    if (empty($attributes['size']))  $attributes['size']  = $defaults['spinner_size'];
                }

                if (!empty($global_class) && empty($attributes['className'])) {
                    $attributes['className'] = $global_class;
                }

                // render.php varsa onu kullan
                $render_file = $dir . 'render.php';
                if (file_exists($render_file)) {
                    ob_start();
                    include $render_file;
                    return ob_get_clean();
                }

                // class-{block}-block.php varsa onu kullan
                $class_file = $dir . 'class-' . $block . '-block.php';
                if (file_exists($class_file)) {
                    include_once $class_file;
                    $class_name = 'ERT_Content_Tools_' . ucfirst($block) . '_Block';

                    if (class_exists($class_name)) {
                        $instance = new $class_name();
                        if (method_exists($instance, 'render')) {
                            return $instance->render($attributes, $content);
                        }
                    }
                }

                // HiÃ§biri yoksa fallback
                return $content;
            };

            register_block_type($dir, [
                'render_callback' => $render_callback,
            ]);
        }
    }

    public function force_enable_style_engine() {
    add_filter( 'wp_theme_json_data_theme', function( $theme_json ) {

        $data = $theme_json->get_data();

        // Spacing
        $data['settings']['spacing'] = [
            'padding' => true,
            'margin'  => true,
            'units'   => [ 'px', 'em', 'rem', '%' ],
        ];

        // Border
        $data['settings']['border'] = [
            'color'  => true,
            'style'  => true,
            'width'  => true,
            'radius' => true,
        ];

        // Typography
        $data['settings']['typography'] = [
            'fontSize'   => true,
            'lineHeight' => true,
            'fontFamily' => true,
        ];

        // Colors
        $data['settings']['color'] = [
            'background' => true,
            'text'       => true,
            'link'       => true,
        ];

        $theme_json->update_with( $data );
        return $theme_json;
    });
}


}
