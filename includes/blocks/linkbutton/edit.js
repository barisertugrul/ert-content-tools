import { __ } from "@wordpress/i18n";
import { useBlockProps, InspectorControls, RichText } from "@wordpress/block-editor";
import { PanelBody, TextControl, SelectControl } from "@wordpress/components";

const dashicons = [
    "dashicons-star", "dashicons-heart", "dashicons-flag", "dashicons-smiley", "dashicons-visibility", "dashicons-yes", "dashicons-no", "dashicons-warning", "dashicons-info", "dashicons-edit", "dashicons-plus", "dashicons-minus", "dashicons-arrow-right", "dashicons-arrow-left"
];

export default function Edit({ attributes, setAttributes }) {
    const blockProps = useBlockProps({
        className: `ct-linkbutton btn btn-${attributes.type}`
    });

    return (
        <>
            <InspectorControls>
                <PanelBody title={__("Link Button Settings", "ert-content-tools")}>
                    <TextControl
                        label={__("URL", "ert-content-tools")}
                        value={attributes.url}
                        onChange={(val) => setAttributes({ url: val })}
                    />
                    <SelectControl
                        label={__("Icon (Dashicons)", "ert-content-tools")}
                        value={attributes.icon && attributes.icon.startsWith("dashicons-") ? attributes.icon : ""}
                        options={[
                          { label: __("No icon", "ert-content-tools"), value: "" },
                          ...dashicons.map((icon) => ({ label: icon.replace("dashicons-", ""), value: icon }))
                        ]}
                        onChange={(val) => setAttributes({ icon: val })}
                    />
                    <TextControl
                        label={__("Custom Icon Class", "ert-content-tools")}
                        value={attributes.icon && !attributes.icon.startsWith("dashicons-") ? attributes.icon : ""}
                        onChange={(val) => setAttributes({ icon: val })}
                        placeholder={__("fa fa-star veya custom class", "ert-content-tools")}
                    />

                    <SelectControl
                        label={__("Type", 'ert-content-tools')}
                        value={attributes.type}
                        options={[
                            { label: __("Primary", 'ert-content-tools'), value: "primary" },
                            { label: __("Secondary", 'ert-content-tools'), value: "secondary" },
                            { label: __("Success", 'ert-content-tools'), value: "success" },
                            { label: __("Danger", 'ert-content-tools'), value: "danger" },
                            { label: __("Warning", 'ert-content-tools'), value: "warning" },
                            { label: __("Info", 'ert-content-tools'), value: "info" },
                            { label: __("Light", 'ert-content-tools'), value: "light" },
                            { label: __("Dark", 'ert-content-tools'), value: "dark" },
                        ]}
                        onChange={(val) => setAttributes({ type: val })}
                    />
                    <SelectControl
                        label={__("Border Radius", 'ert-content-tools')}
                        value={attributes.borderRadius}
                        options={[
                            { label: "Square", value: "0" },
                            { label: "Rounded", value: "8px" },
                            { label: "Pill", value: "999px" },
                        ]}
                        onChange={(val) => setAttributes({ borderRadius: val })}
                    />
                </PanelBody>
            </InspectorControls>
                        <a {...blockProps} href={attributes.url} style={{ display: "inline-flex", alignItems: "center" }}>
                                {attributes.icon && attributes.icon.startsWith("dashicons-") ? (
                                    <span className={`dashicons dashicons-before ${attributes.icon}`} style={{ marginRight: "0.5rem", fontSize: "1.2em", verticalAlign: "middle", display: "inline-flex", alignItems: "center", height: "1.5em" }}></span>
                                ) : attributes.icon ? (
                                    <i className={attributes.icon} style={{ marginRight: "0.5rem", fontSize: "1.2em", verticalAlign: "middle", display: "inline-flex", alignItems: "center", height: "1.5em" }}></i>
                                ) : null}
                                <RichText
                                        tagName="span"
                                        value={attributes.text}
                                        onChange={(val) => setAttributes({ text: val })}
                                        placeholder={__("Button text...", "ert-content-tools")}
                                />
                        </a>
        </>
    );
}
