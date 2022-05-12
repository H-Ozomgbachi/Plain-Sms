import { observer } from "mobx-react-lite";
import { Link } from "react-router-dom";
import { Icon } from "semantic-ui-react";
import { useStore } from "../../api/main/appStore";
import { hamburgerMenuData } from "../../local-data/hamburgerMenuData";
import "./HamburgerMenu.css";

interface Props {
  visible: boolean;
}

export default observer(function HamburgerMenu({ visible }: Props) {
  const { commonStore } = useStore();

  const handleClick = () => {
    commonStore.setDrawerVisible(false);
  };

  return (
    <div
      className={`hamburger-menu-container ${
        visible ? "slide-menu-in" : "slide-menu-out"
      }`}
    >
      <div
        className="hamburger-menu-close"
        onClick={() => commonStore.setDrawerVisible(false)}
      >
        <Icon name="times" />
      </div>
      <div className="hamburger-menu-links">
        {hamburgerMenuData.map((el) => (
          <Link to={el.to} key={el.text} onClick={handleClick}>
            {" "}
            {el.text}
          </Link>
        ))}
      </div>
    </div>
  );
});
