import { ReactJSXElement } from "@emotion/react/types/jsx-namespace";
import { useState } from "react";
import "./CustomVerticalTab.css";

interface Tab {
  icon: ReactJSXElement;
  text: string;
  callbackFn?: () => void;
  isDropdown?: boolean;
}

interface Props {
  tabs: Tab[];
  panels: ReactJSXElement[];
}

export default function CustomVerticalTab({ tabs, panels }: Props) {
  const [bodyIndex, setBodyIndex] = useState(0);

  return (
    <div className="vertical-tab-container">
      <div className="vertical-tab-left">
        {tabs.map((el, index) => {
          return !el.isDropdown ? (
            <span
              className={`vertical-tab-left_item ${
                index === bodyIndex ? "vertical-tab-left_item-active" : ""
              }`}
              key={index}
              onClick={
                el.callbackFn ? el.callbackFn : () => setBodyIndex(index)
              }
            >
              <span className="vertical-tab-left_item-icon">{el.icon}</span>
              <span className="vertical-tab-left_item-text">{el.text}</span>
            </span>
          ) : null;
        })}
      </div>

      <div className="vertical-tab-right">
        <div className="vertical-tab-right_item">{panels[bodyIndex]}</div>
      </div>
    </div>
  );
}
