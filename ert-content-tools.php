<?php
/**
 * Plugin Name: ERT Content Tools
 * Description: A modular plugin that adds blocks such as content index, card, alert, badge, list group, etc.
 * Version: 1.0.0
 * Requires at least: 6.3
 * Requires PHP: 7.4
 * License:           GPL v2 or later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Author: Baris ERTUGRUL
 * Author URI: https://www.barisertugrul.com
 * Plugin URI: https://www.ertyazilim.com
 * Text Domain: ert-content-tools
 * Domain Path: /languages
 */

if ( ! defined( 'ABSPATH' ) ) exit;

require_once plugin_dir_path(__FILE__) . 'includes/style-helper.php';

require_once plugin_dir_path(__FILE__) . 'includes/class-plugin-loader.php';

/**
 * Localization
 */
function ert_content_tools_load_textdomain() {
    load_plugin_textdomain(
        'ert-content-tools',
        false,
        dirname(plugin_basename(__FILE__)) . '/languages'
    );
}
add_action('plugins_loaded', 'ert_content_tools_load_textdomain');

function ert_content_tools_activate() {
    if (false === get_option('ert_content_tools_enabled_blocks', false)) {
        add_option('ert_content_tools_enabled_blocks', [
            'toc', 'card', 'alert', 'badge', 'listgroup',
            'modal', 'tooltip', 'accordion', 'collapse',
            'popover', 'progress', 'linkbutton', 'spinner', 'note'
        ]);
    }

    if (false === get_option('ert_content_tools_defaults', false)) {
        add_option('ert_content_tools_defaults', [
            'alert_type' => 'info',
            'spinner_type' => 'border',
            'spinner_color' => 'primary',
            'spinner_size' => 'md'
        ]);
    }

    if (false === get_option('ert_content_tools_global_class', false)) {
        add_option('ert_content_tools_global_class', '');
    }
}

register_activation_hook(__FILE__, 'ert_content_tools_activate');

/**
 * Initialize Loader
 */
function ert_content_tools_init() {
    $loader = new ERT_Content_Tools_Loader();
    $loader->init();
}
add_action('init', 'ert_content_tools_init');

/**
 * ==============================
 * Settings Page
 * ==============================
 */

// Add settings page to admin menu
add_action('admin_menu', function() {
    add_options_page(
        __('ERT Content Tools Settings', 'ert-content-tools'),
        __('ERT Content Tools Settings', 'ert-content-tools'),
        'manage_options',
        'ert-content-tools-settings',
        'ert_content_tools_settings_page'
    );

    add_submenu_page(
        'options-general.php',
        __('ERT Smoke Test Checklist', 'ert-content-tools'),
        __('ERT Smoke Test Checklist', 'ert-content-tools'),
        'manage_options',
        'ert-content-tools-smoke-test',
        'ert_content_tools_smoke_test_page'
    );
});

// Register settings
add_action('admin_init', function() {
    register_setting('ert_content_tools_settings_group', 'ert_content_tools_enabled_blocks', [
        'type' => 'array',
        'sanitize_callback' => 'ert_content_tools_sanitize_enabled_blocks',
        'default' => [],
    ]);

    register_setting('ert_content_tools_settings_group', 'ert_content_tools_defaults', [
        'type' => 'array',
        'sanitize_callback' => 'ert_content_tools_sanitize_defaults',
        'default' => [],
    ]);

    register_setting('ert_content_tools_settings_group', 'ert_content_tools_global_class', [
        'type' => 'string',
        'sanitize_callback' => 'ert_content_tools_sanitize_global_class',
        'default' => '',
    ]);

    ert_content_tools_migrate_legacy_options();
});

function ert_content_tools_allowed_blocks() {
    return [
        'toc', 'card', 'alert', 'badge', 'listgroup',
        'modal', 'tooltip', 'accordion', 'collapse',
        'popover', 'progress', 'linkbutton', 'spinner', 'note',
    ];
}

function ert_content_tools_sanitize_enabled_blocks($value) {
    $value = is_array($value) ? $value : [];
    $allowed = ert_content_tools_allowed_blocks();
    $sanitized = array_values(array_intersect(array_map('sanitize_key', $value), $allowed));
    return !empty($sanitized) ? $sanitized : $allowed;
}

function ert_content_tools_sanitize_defaults($value) {
    $value = is_array($value) ? $value : [];

    $alert_types = ['info', 'success', 'warning', 'danger'];
    $spinner_types = ['border', 'grow'];
    $spinner_colors = ['primary', 'secondary', 'success', 'danger', 'warning'];
    $spinner_sizes = ['sm', 'md', 'lg'];
    $progress_variants = ['primary', 'secondary', 'success', 'danger', 'warning', 'info', 'dark', 'light'];

    $alert_type = isset($value['alert_type']) ? sanitize_key($value['alert_type']) : 'info';
    $spinner_type = isset($value['spinner_type']) ? sanitize_key($value['spinner_type']) : 'border';
    $spinner_color = isset($value['spinner_color']) ? sanitize_key($value['spinner_color']) : 'primary';
    $spinner_size = isset($value['spinner_size']) ? sanitize_key($value['spinner_size']) : 'md';
    $progress_variant = isset($value['progress_variant']) ? sanitize_key($value['progress_variant']) : 'primary';
    $progress_track_color = isset($value['progress_track_color']) ? sanitize_hex_color($value['progress_track_color']) : '#e9ecef';
    $progress_bar_color = isset($value['progress_bar_color']) ? sanitize_hex_color($value['progress_bar_color']) : '';
    $progress_text_color = isset($value['progress_text_color']) ? sanitize_hex_color($value['progress_text_color']) : '';

    return [
        'alert_type' => in_array($alert_type, $alert_types, true) ? $alert_type : 'info',
        'spinner_type' => in_array($spinner_type, $spinner_types, true) ? $spinner_type : 'border',
        'spinner_color' => in_array($spinner_color, $spinner_colors, true) ? $spinner_color : 'primary',
        'spinner_size' => in_array($spinner_size, $spinner_sizes, true) ? $spinner_size : 'md',
        'progress_variant' => in_array($progress_variant, $progress_variants, true) ? $progress_variant : 'primary',
        'progress_track_color' => $progress_track_color ?: '#e9ecef',
        'progress_bar_color' => $progress_bar_color ?: '',
        'progress_text_color' => $progress_text_color ?: '',
    ];
}

function ert_content_tools_sanitize_global_class($value) {
    $value = is_string($value) ? trim($value) : '';
    return sanitize_html_class($value);
}

function ert_content_tools_migrate_legacy_options() {
    if (get_option('ert_content_tools_options_migrated', false)) {
        return;
    }

    $legacy_map = [
        'ert_content_tools_enabled_blocks' => 'ert_content_tools_enabled_blocks',
        'ert_content_tools_defaults' => 'ert_content_tools_defaults',
        'ert_content_tools_global_class' => 'ert_content_tools_global_class',
    ];

    foreach ($legacy_map as $legacy_key => $new_key) {
        $legacy_value = get_option($legacy_key, null);
        $new_value = get_option($new_key, null);

        if (null !== $legacy_value && null === $new_value) {
            update_option($new_key, $legacy_value);
        }
    }

    update_option('ert_content_tools_options_migrated', 1, false);
}

function ert_content_tools_admin_styles($hook) {
    if (!in_array($hook, ['settings_page_ert-content-tools-settings', 'settings_page_ert-content-tools-smoke-test'], true)) {
        return;
    }

    wp_enqueue_style(
        'ert-content-tools-admin',
        plugins_url('assets/css/admin-settings.css', __FILE__),
        [],
        '1.0.0'
    );
}
add_action('admin_enqueue_scripts', 'ert_content_tools_admin_styles');

// Settings page content
function ert_content_tools_settings_page() {
    $smoke_test_url = admin_url('options-general.php?page=ert-content-tools-smoke-test');
    ?>
    <div class="wrap ert-settings-page">
        <h1><?php _e('ERT Content Tools Settings', 'ert-content-tools'); ?></h1>
        <p>
            <a class="button button-secondary" href="<?php echo esc_url($smoke_test_url); ?>">
                <?php _e('Open Smoke Test Checklist', 'ert-content-tools'); ?>
            </a>
        </p>


        <form method="post" action="options.php">
            <?php settings_fields('ert_content_tools_settings_group'); ?>
            <?php do_settings_sections('ert_content_tools_settings_group'); ?>

            <h2><?php _e('Block Visibility', 'ert-content-tools'); ?></h2>
            <p><?php _e('Select which blocks should be available in block editor.', 'ert-content-tools'); ?></p>
            <?php
            $blocks = [
                'toc' => 'ERT Table of Contents',
                'card' => 'ERT Card',
                'alert' => 'ERT Alert',
                'badge' => 'ERT Badge',
                'listgroup' => 'ERT List Group',
                'modal' => 'ERT Modal',
                'tooltip' => 'ERT Tooltip',
                'accordion' => 'ERT Accordion',
                'collapse' => 'ERT Collapse',
                'popover' => 'ERT Popover',
                'progress' => 'ERT Progress',
                'linkbutton' => 'ERT Link Button',
                'spinner' => 'ERT Spinner',
                'note' => 'ERT Note'
            ];
            $enabled_blocks = get_option('ert_content_tools_enabled_blocks', array_keys($blocks));
            ?>
            <div class="settings-blocks">
                <?php foreach ($blocks as $key => $label): ?>
                    <div class="settings-block">
                        <label>
                            <input type="checkbox" name="ert_content_tools_enabled_blocks[]" value="<?php echo esc_attr($key); ?>" <?php checked(in_array($key, $enabled_blocks)); ?>>
                            <?php echo esc_html($label); ?>
                        </label>
                    </div>
                <?php endforeach; ?>
            </div>

            <h2><?php _e('Default Settings', 'ert-content-tools'); ?></h2>
            <?php
            $defaults = get_option('ert_content_tools_defaults', [
                'alert_type' => 'info',
                'spinner_type' => 'border',
                'spinner_color' => 'primary',
                'spinner_size' => 'md',
                'progress_variant' => 'primary',
                'progress_track_color' => '#e9ecef',
                'progress_bar_color' => '',
                'progress_text_color' => ''
            ]);
            ?>
            <div class="settings-defaults">
                <label for="alert_type"><?php _e('Default Alert Type', 'ert-content-tools'); ?></label>
                <select name="ert_content_tools_defaults[alert_type]" id="alert_type">
                    <?php foreach (['info','success','warning','danger'] as $opt): ?>
                        <option value="<?php echo $opt; ?>" <?php selected($defaults['alert_type'], $opt); ?>><?php echo ucfirst($opt); ?></option>
                    <?php endforeach; ?>
                </select>

                <label for="spinner_type"><?php _e('Default Spinner Type', 'ert-content-tools'); ?></label>
                <select name="ert_content_tools_defaults[spinner_type]" id="spinner_type">
                    <?php foreach (['border','grow'] as $opt): ?>
                        <option value="<?php echo $opt; ?>" <?php selected($defaults['spinner_type'], $opt); ?>><?php echo ucfirst($opt); ?></option>
                    <?php endforeach; ?>
                </select>

                <label for="spinner_color"><?php _e('Default Spinner Color', 'ert-content-tools'); ?></label>
                <select name="ert_content_tools_defaults[spinner_color]" id="spinner_color">
                    <?php foreach (['primary','secondary','success','danger','warning'] as $opt): ?>
                        <option value="<?php echo $opt; ?>" <?php selected($defaults['spinner_color'], $opt); ?>><?php echo ucfirst($opt); ?></option>
                    <?php endforeach; ?>
                </select>

                <label for="spinner_size"><?php _e('Default Spinner Size', 'ert-content-tools'); ?></label>
                <select name="ert_content_tools_defaults[spinner_size]" id="spinner_size">
                    <?php foreach (['sm','md','lg'] as $opt): ?>
                        <option value="<?php echo $opt; ?>" <?php selected($defaults['spinner_size'], $opt); ?>><?php echo strtoupper($opt); ?></option>
                    <?php endforeach; ?>
                </select>

                <label for="progress_variant"><?php _e('Default Progress Preset', 'ert-content-tools'); ?></label>
                <select name="ert_content_tools_defaults[progress_variant]" id="progress_variant">
                    <?php foreach (['primary','secondary','success','danger','warning','info','dark','light'] as $opt): ?>
                        <option value="<?php echo $opt; ?>" <?php selected($defaults['progress_variant'], $opt); ?>><?php echo ucfirst($opt); ?></option>
                    <?php endforeach; ?>
                </select>

                <label for="progress_track_color"><?php _e('Default Progress Track Color', 'ert-content-tools'); ?></label>
                <input type="color" id="progress_track_color" name="ert_content_tools_defaults[progress_track_color]" value="<?php echo esc_attr($defaults['progress_track_color']); ?>">

                <label for="progress_bar_color"><?php _e('Default Progress Bar Color (optional override)', 'ert-content-tools'); ?></label>
                <input type="color" id="progress_bar_color" name="ert_content_tools_defaults[progress_bar_color]" value="<?php echo esc_attr(!empty($defaults['progress_bar_color']) ? $defaults['progress_bar_color'] : '#0d6efd'); ?>">

                <label for="progress_text_color"><?php _e('Default Progress Text Color (optional override)', 'ert-content-tools'); ?></label>
                <input type="color" id="progress_text_color" name="ert_content_tools_defaults[progress_text_color]" value="<?php echo esc_attr(!empty($defaults['progress_text_color']) ? $defaults['progress_text_color'] : '#ffffff'); ?>">
            </div>

            <h2><?php _e('Global Settings', 'ert-content-tools'); ?></h2>
            <?php $global_class = get_option('ert_content_tools_global_class', ''); ?>
            <div class="settings-defaults">
                <label for="global_class"><?php _e('Global CSS Class Prefix', 'ert-content-tools'); ?></label>
                <input type="text" id="global_class" name="ert_content_tools_global_class" value="<?php echo esc_attr($global_class); ?>">
            </div>

            <?php submit_button(); ?>
        </form>
    </div>
    <?php
}

function ert_content_tools_smoke_test_page() {
    $checklist_path = plugin_dir_path(__FILE__) . 'SMOKE_TEST_CHECKLIST.md';
    $checklist_content = '';

    if (file_exists($checklist_path) && is_readable($checklist_path)) {
        $checklist_content = file_get_contents($checklist_path);
    }

    $rendered_html = '';
    if (!empty($checklist_content)) {
        $rendered_html = ert_content_tools_render_markdown($checklist_content);
    }

    ?>
    <div class="wrap ert-settings-page">
        <h1><?php _e('ERT Smoke Test Checklist', 'ert-content-tools'); ?></h1>
        <?php if (!empty($rendered_html)) : ?>
            <div style="line-height: 1.6; background: #fff; border: 1px solid #dcdcde; padding: 16px;">
                <?php echo wp_kses_post($rendered_html); ?>
            </div>
        <?php else : ?>
            <div class="notice notice-warning"><p><?php _e('SMOKE_TEST_CHECKLIST.md file could not be read.', 'ert-content-tools'); ?></p></div>
        <?php endif; ?>
    </div>
    <?php
}

function ert_content_tools_render_markdown($markdown) {
    $lines = preg_split('/\r\n|\r|\n/', (string) $markdown);
    $html = '';
    $in_list = false;

    foreach ($lines as $line) {
        $trimmed = trim($line);

        if ($trimmed === '') {
            if ($in_list) {
                $html .= '</ul>';
                $in_list = false;
            }
            continue;
        }

        if (preg_match('/^###\s+(.+)$/', $trimmed, $m)) {
            if ($in_list) {
                $html .= '</ul>';
                $in_list = false;
            }
            $html .= '<h3>' . esc_html($m[1]) . '</h3>';
            continue;
        }

        if (preg_match('/^##\s+(.+)$/', $trimmed, $m)) {
            if ($in_list) {
                $html .= '</ul>';
                $in_list = false;
            }
            $html .= '<h2>' . esc_html($m[1]) . '</h2>';
            continue;
        }

        if (preg_match('/^#\s+(.+)$/', $trimmed, $m)) {
            if ($in_list) {
                $html .= '</ul>';
                $in_list = false;
            }
            $html .= '<h1>' . esc_html($m[1]) . '</h1>';
            continue;
        }

        if (preg_match('/^[-*]\s+(.+)$/', $trimmed, $m)) {
            if (!$in_list) {
                $html .= '<ul>';
                $in_list = true;
            }
            $html .= '<li>' . esc_html($m[1]) . '</li>';
            continue;
        }

        if ($in_list) {
            $html .= '</ul>';
            $in_list = false;
        }

        $html .= '<p>' . esc_html($trimmed) . '</p>';
    }

    if ($in_list) {
        $html .= '</ul>';
    }

    $html = preg_replace('/`([^`]+)`/', '<code>$1</code>', $html);

    return $html;
}
