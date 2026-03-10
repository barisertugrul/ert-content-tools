import { __ } from "@wordpress/i18n";
import { useBlockProps } from "@wordpress/block-editor";
import { TextControl, Button, SelectControl } from "@wordpress/components";

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

  const addItem = () => {
    const uniqueId = "listitem_" + Math.random().toString(36).substr(2, 9);
    const newItems = [
      ...attributes.items,
      { id: uniqueId, text: "", icon: "", badge: "", badgeColor: "primary" },
    ];
    setAttributes({ items: newItems });
  };

  const removeItem = (index) => {
    const newItems = attributes.items.filter((_, i) => i !== index);
    setAttributes({ items: newItems });
  };

  return (
    <div {...blockProps}>
      <div className="list-group" style={{ marginBottom: "15px" }}>
        {attributes.items.map((item, index) => {
          const itemObj =
            typeof item === "string"
              ? { text: item, icon: "", badge: "", badgeColor: "primary" }
              : item;

          return (
            <div key={index} className="list-group-item">
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <div style={{ display: "flex", alignItems: "center" }}>
                  {itemObj.icon && (
                    <i
                      className={`fa ${itemObj.icon}`}
                      style={{ marginRight: "0.5rem" }}
                    ></i>
                  )}
                  <span>
                    {__("Item", "ert-content-tools")} {index + 1}
                  </span>
                </div>
                <Button onClick={() => removeItem(index)} isDestructive isSmall>
                  {__("Remove", "ert-content-tools")}
                </Button>
              </div>

              <TextControl
                label={__("Text", "ert-content-tools")}
                value={itemObj.text || ""}
                onChange={(val) => updateItem(index, "text", val)}
              />
              <div
                style={{
                  display: "flex",
                  gap: "10px",
                  alignItems: "flex-start",
                }}
              >
                <div style={{ width: "120px" }}>
                  <TextControl
                    label={__("Badge", "ert-content-tools")}
                    value={itemObj.badge || (index + 1).toString()}
                    onChange={(val) => updateItem(index, "badge", val)}
                  />
                </div>
                <div style={{ width: "120px" }}>
                  <SelectControl
                    label={__("Badge Color", "ert-content-tools")}
                    value={itemObj.badgeColor || "primary"}
                    onChange={(val) => updateItem(index, "badgeColor", val)}
                    options={[
                      { label: "Primary", value: "primary" },
                      { label: "Secondary", value: "secondary" },
                      { label: "Success", value: "success" },
                      { label: "Danger", value: "danger" },
                      { label: "Warning", value: "warning" },
                      { label: "Info", value: "info" },
                      { label: "Light", value: "light" },
                      { label: "Dark", value: "dark" },
                    ]}
                  />
                </div>
                <div style={{ width: "200px" }}>
                  <TextControl
                    label={__(
                      "Icon (FontAwesome class)",
                      "ert-content-tools",
                    )}
                    value={itemObj.icon || ""}
                    placeholder="e.g. fa-solid, fa-star, fa-lg"
                    onChange={(val) => updateItem(index, "icon", val)}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <Button onClick={addItem} isPrimary>
        {__("Add Item", "ert-content-tools")}
      </Button>
    </div>
  );
}

