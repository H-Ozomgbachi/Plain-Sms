import { ReactJSXElement } from "@emotion/react/types/jsx-namespace";
import { useState } from "react";
import "./BasicHorizontalTab.css";

interface Props {
  tabs: string[];
  panels: ReactJSXElement[];
}

export default function BasicHorizontalTab({ tabs, panels }: Props) {
  const [bodyIndex, setBodyIndex] = useState(0);

  return (
    <div>
      <div className="tab-key">
        {tabs.map((el, index) => {
          return (
            <span
              className={`tab-key_item ${
                index === bodyIndex ? "tab-key_item-active" : ""
              }`}
              key={index}
              onClick={() => setBodyIndex(index)}
            >
              {el}
            </span>
          );
        })}
      </div>
      <div className="tab-content">
        <div className="tab-content_item">{panels[bodyIndex]}</div>
      </div>
    </div>
  );
}
