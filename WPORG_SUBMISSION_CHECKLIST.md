# WP.org Submission Checklist (ERT Content Tools)

## 1) Branding & Naming
- [x] Plugin public name uses `ERT Content Tools`.
- [x] `gutenberg` removed from plugin slug, text domain, handles, and block namespace.
- [x] Main plugin file aligned to slug: `ert-content-tools.php`.

## 2) Required Metadata
- [x] Main plugin header includes `Plugin Name`, `Description`, `Version`, `Author`, `License`, `Text Domain`.
- [x] Added `Requires at least` and `Requires PHP`.
- [x] Added `readme.txt` in WordPress.org format.

## 3) Security & Data Handling
- [x] Settings now registered with sanitize callbacks.
- [x] Option values are constrained to allowlists.
- [x] Output escapes are present (`esc_html`, `esc_attr`, `wp_kses_post`, etc.).
- [x] Added `uninstall.php` to clean plugin options on uninstall.

## 4) Internationalization (i18n)
- [x] Unified text domain: `ert-content-tools`.
- [x] `load_plugin_textdomain()` uses plugin `languages` directory.
- [ ] Regenerate POT/PO/MO files before submission (recommended final step).

## 5) Build & Packaging
- [ ] Run `npm install` (if needed) and `npm run build`.
- [ ] Verify all block build files are generated from updated source.
- [ ] Ensure package excludes dev artifacts if creating custom zip.

## 6) Manual Pre-Submission QA
- [ ] Activate plugin on clean WordPress install.
- [ ] Add each block and save/update a post.
- [ ] Verify frontend rendering and editor behavior.
- [ ] Confirm settings page saves defaults and enabled blocks.
- [ ] Confirm uninstall removes plugin options.

## Notes
- If this is the first public release, namespace changes in block names are safe.
- If you already had production users with old block names, add a migration plan for legacy block namespace compatibility.
