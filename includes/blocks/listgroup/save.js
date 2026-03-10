import { useBlockProps } from "@wordpress/block-editor";

export default function save({ attributes }) {
  const blockProps = useBlockProps.save({
    className: "ct-listgroup list-group",
  });

  return (
    <ul {...blockProps}>
      {attributes.items &&
        attributes.items.map((item, index) => (
          <li
            key={item.id}
            className="list-group-item d-flex justify-content-between align-items-center"
          >
            <div className="d-flex align-items-center">
              <i className={`fa ${item.icon || ""}`}></i>
              <span className="listgroup-item-text">{item.text}</span>
              <span
                className={`badge bg-${
                  item.badgeColor || "primary"
                } rounded-pill`}
              >
                {item.badge || index + 1}
              </span>
            </div>
          </li>
        ))}
    </ul>
  );
}
