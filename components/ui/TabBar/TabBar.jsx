import React from "react";

const TabBar = ({ data = [], selectedKey = "", onClick, className }) => {
  const _handleSelectedClick = (e) => {
    const _key = e.target.dataset.key;
    onClick(_key);
  };

  return (
    <ul className={`tab_bar_container ${className}`}>
      {data.map((item, index, arr) => {
        const classNameSelected = selectedKey === item.key ? "selected" : "";
        const indexSelected = arr.findIndex((i) => i.key === selectedKey);
        const noLineIndex = indexSelected === 0 ? 0 : indexSelected - 1;
        return (
          <li key={item.key} className={`tab_bar_item ${classNameSelected}`}>
            <button
              className="tab_bar_item_button"
              onClick={_handleSelectedClick}
              data-key={item.key}
            >
              {item.name.toUpperCase()}
            </button>
            {index !== arr?.length - 1 &&
              index !== noLineIndex &&
              index !== indexSelected && (
                <span className="vertical_line"></span>
              )}
          </li>
        );
      })}
    </ul>
  );
};

export default TabBar;
