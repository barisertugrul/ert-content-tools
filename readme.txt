=== ERT Content Tools ===
Contributors: ertyazilim
Donate link: https://www.ertyazilim.com
Tags: blocks, editor, content, bootstrap, table of contents
Requires at least: 6.3
Tested up to: 6.9
Requires PHP: 7.4
Stable tag: 1.0.0
License: GPLv2 or later
License URI: https://www.gnu.org/licenses/gpl-2.0.html

A modular block collection for the WordPress block editor, including table of contents, card, alert, badge, list group, modal, tooltip, and more.

== Description ==

ERT Content Tools adds a curated set of practical content blocks for the WordPress block editor.

Included blocks:

* Table of Contents
* Card
* Alert
* Badge
* List Group
* Modal
* Tooltip
* Accordion
* Collapse
* Popover
* Progress
* Link Button
* Spinner
* Note

Features:

* Block visibility controls (enable/disable per block)
* Global default settings for alert and spinner blocks
* Global CSS class prefix setting
* Frontend and editor styles/scripts loaded only when needed

== Installation ==

1. Upload the plugin folder to the `/wp-content/plugins/` directory.
2. Activate the plugin through the `Plugins` screen in WordPress.
3. Go to `Settings > ERT Content Tools Settings`.
4. Choose enabled blocks and default settings.

== Frequently Asked Questions ==

= Does this plugin work with the block editor only? =

Yes. This plugin is designed for the WordPress block editor.

= Can I disable blocks I do not need? =

Yes. Use the settings page to enable only the blocks you want.

== Screenshots ==

1. Plugin settings page
2. Example block usage in editor

== Changelog ==

= 1.0.0 =
* Initial public release.
* Added 14 modular blocks.
* Added settings page for block visibility and defaults.

== Upgrade Notice ==

= 1.0.0 =
Initial stable release.

== Development ==

Use these commands in the plugin root:

1. Copy `.env.example` to `.env`.
2. Set `LOCAL_WP_PLUGIN_DIR` in `.env` to your local WordPress plugin path.

* `npm run build` → Compiles changed JavaScript block files, creates a release ZIP, and updates local test plugin directory.
* `npm run clean:build` → Cleans all `includes/blocks/*/build` folders before a fresh build.
* `npm run build:fast` → Skips compile step, creates a release ZIP, and updates local test plugin directory.
* `npm run start` → Starts watch mode for development builds.
