import { useBlockProps } from "@wordpress/block-editor";

export default function save({ attributes }) {
  const blockProps = useBlockProps.save({
    className: "ct-listgroup list-group",
  });

  return (
    <ul {...blockProps}>
      {attributes.items &&
        attributes.items.map((item, index) => {
          let iconElem = null;
          if (item.icon && item.icon.startsWith("dashicons-")) {
            iconElem = (
              <span className={`dashicons dashicons-before ${item.icon}`} style={{ marginRight: "0.5rem", fontSize: "1.2em" }}></span>
            );
          } else if (item.icon) {
            iconElem = (
              <i className={item.icon} style={{ marginRight: "0.5rem", fontSize: "1.2em" }}></i>
            );
          }
          return (
            <li
              key={item.id}
              className="list-group-item d-flex justify-content-between align-items-center"
            >
              <div className="d-flex align-items-center">
                {iconElem}
                <span className="listgroup-item-text">{item.text}</span>
                <span
                  className={`badge bg-${item.badgeColor || "primary"} rounded-pill`}
                >
                  {item.badge || index + 1}
                </span>
              </div>
            </li>
          );
        })}
    </ul>
  );
}
