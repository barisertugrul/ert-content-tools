import { __ } from "@wordpress/i18n";
import { useBlockProps } from "@wordpress/block-editor";
import { TextControl, Button, SelectControl } from "@wordpress/components";

// WordPress Dashicons tam listesi (kısa, en popülerler ve eklenebilir)
const dashicons = [
  "dashicons-menu", "dashicons-admin-site", "dashicons-dashboard", "dashicons-admin-post", "dashicons-admin-media", "dashicons-admin-links", "dashicons-admin-page", "dashicons-admin-comments", "dashicons-admin-appearance", "dashicons-admin-plugins", "dashicons-admin-users", "dashicons-admin-tools", "dashicons-admin-settings", "dashicons-admin-network", "dashicons-admin-generic", "dashicons-admin-home", "dashicons-admin-collapse", "dashicons-filter", "dashicons-archive", "dashicons-tag", "dashicons-upload", "dashicons-edit", "dashicons-trash", "dashicons-external", "dashicons-update", "dashicons-save", "dashicons-share", "dashicons-search", "dashicons-visibility", "dashicons-star", "dashicons-heart", "dashicons-flag", "dashicons-smiley", "dashicons-yes", "dashicons-no", "dashicons-warning", "dashicons-info", "dashicons-plus", "dashicons-minus", "dashicons-arrow-right", "dashicons-arrow-left", "dashicons-arrow-up", "dashicons-arrow-down", "dashicons-calendar", "dashicons-calendar-alt", "dashicons-clock", "dashicons-location", "dashicons-image", "dashicons-images-alt", "dashicons-images-alt2", "dashicons-video-alt", "dashicons-video-alt2", "dashicons-video-alt3", "dashicons-category", "dashicons-admin-customizer", "dashicons-admin-multisite", "dashicons-admin-plugins", "dashicons-admin-users", "dashicons-admin-tools", "dashicons-admin-settings", "dashicons-admin-network", "dashicons-admin-generic", "dashicons-admin-home", "dashicons-admin-collapse"
];

export default function Edit({ attributes, setAttributes }) {
  const blockProps = useBlockProps({
    className: "ct-listgroup list-group",
  });

  const updateItem = (index, field, value) => {
    const newItems = [...attributes.items];
    if (typeof newItems[index] === "string") {
      newItems[index] = {
        text: newItems[index],
        icon: "",
        badge: "",
        badgeColor: "primary",
      };
    }
    newItems[index][field] = value;
    setAttributes({ items: newItems });
  };

  const removeItem = (index) => {
    const newItems = [...attributes.items];
    newItems.splice(index, 1);
    setAttributes({ items: newItems });
  };

  const addItem = () => {
    const uniqueId = "listitem_" + Math.random().toString(36).substr(2, 9);
    const newItems = [
      ...attributes.items,
      { id: uniqueId, text: "", icon: "", badge: "", badgeColor: "primary" },
    ];
    setAttributes({ items: newItems });
  };

  return (
    <div {...blockProps}>
      {attributes.items.map((itemObj, index) => {
        let iconElem = null;
        if (itemObj.icon && itemObj.icon.startsWith("dashicons-")) {
          iconElem = (
            <span className={`dashicons dashicons-before ${itemObj.icon}`} style={{ marginRight: "0.5rem", fontSize: "1.2em", verticalAlign: "middle", display: "inline-flex", alignItems: "center", height: "1.5em" }}></span>
          );
        } else if (itemObj.icon) {
          iconElem = (
            <i className={itemObj.icon} style={{ marginRight: "0.5rem", fontSize: "1.2em", verticalAlign: "middle", display: "inline-flex", alignItems: "center", height: "1.5em" }}></i>
          );
        }
        return (
          <div key={index} className="list-group-item" style={{ display: "flex", alignItems: "center", flexWrap: "wrap", gap: "0.5rem" }}>
            {iconElem}
            <div style={{ marginRight: "0.5rem", minWidth: "120px", flex: "1 1 120px" }}>
              <TextControl
                label={__("Item Text", "ert-content-tools")}
                value={itemObj.text || ""}
                onChange={(val) => updateItem(index, "text", val)}
                placeholder={__("List item text", "ert-content-tools")}
              />
            </div>
            <div style={{ marginRight: "0.5rem", minWidth: "120px", flex: "1 1 120px" }}>
              <SelectControl
                label={__("Icon", "ert-content-tools")}
                value={itemObj.icon && itemObj.icon.startsWith("dashicons-") ? itemObj.icon : ""}
                options={[
                  { label: __("No icon", "ert-content-tools"), value: "" },
                  ...dashicons.map((icon) => ({ label: icon.replace("dashicons-", ""), value: icon }))
                ]}
                onChange={(val) => updateItem(index, "icon", val)}
              />
            </div>
            <div style={{ marginRight: "0.5rem", minWidth: "120px", flex: "1 1 120px" }}>
              <TextControl
                label={__("Custom Icon Class", "ert-content-tools")}
                value={itemObj.icon && !itemObj.icon.startsWith("dashicons-") ? itemObj.icon : ""}
                onChange={(val) => updateItem(index, "icon", val)}
                placeholder={__("fa fa-star veya custom class", "ert-content-tools")}
              />
            </div>
            <div style={{ marginRight: "0.5rem", minWidth: "80px", flex: "1 1 80px" }}>
              <TextControl
                label={__("Badge Value", "ert-content-tools")}
                value={itemObj.badge || ""}
                onChange={(val) => updateItem(index, "badge", val)}
                placeholder={__("Badge text", "ert-content-tools")}
              />
            </div>
            <div style={{ marginRight: "0.5rem", minWidth: "80px", flex: "1 1 80px" }}>
              <SelectControl
                label={__("Badge Color", "ert-content-tools")}
                value={itemObj.badgeColor}
                options={[
                  { label: "Primary", value: "primary" },
                  { label: "Secondary", value: "secondary" },
                  { label: "Success", value: "success" },
                  { label: "Danger", value: "danger" },
                ]}
                onChange={(val) => updateItem(index, "badgeColor", val)}
              />
            </div>
            <Button
              isDestructive
              onClick={() => removeItem(index)}
              style={{ marginLeft: "1rem" }}
            >
              {__("Remove", "ert-content-tools")}
            </Button>
          </div>
        );
      })}
      <Button onClick={addItem} isPrimary style={{ marginTop: "1rem" }}>
        {__("Add Item", "ert-content-tools")}
      </Button>
    </div>
  );
}
