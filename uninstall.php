<?php
if ( ! defined( 'WP_UNINSTALL_PLUGIN' ) ) {
    exit;
}

$option_keys = [
    'ert_content_tools_enabled_blocks',
    'ert_content_tools_defaults',
    'ert_content_tools_global_class',
    'ert_content_tools_options_migrated',
    'ert_content_tools_enabled_blocks',
    'ert_content_tools_defaults',
    'ert_content_tools_global_class',
];

foreach ( $option_keys as $option_key ) {
    delete_option( $option_key );
}
