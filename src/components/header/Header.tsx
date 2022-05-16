import { observer } from "mobx-react-lite";
import { Link, NavLink } from "react-router-dom";
import { Icon } from "semantic-ui-react";
import { useStore } from "../../api/main/appStore";
import { headerLinksData } from "../../local-data/headerLinksData";
import "./Header.css";

export default observer(function Header() {
  const { commonStore } = useStore();
  return (
    <div className="header-container ">
      <Link to={"/"} className="logo-container">
        <img alt="Log" src="/sms-logo.jpg" className="logo-img" />{" "}
        <span className="logo-text">Plain Sms</span>
      </Link>
      <div className="header-links-box">
        {headerLinksData.map((el, index) => (
          <NavLink
            key={index}
            to={el.to}
            className={`header-link ${
              window.location.pathname === el.to ? "header-link-active" : ""
            }`}
          >
            {el.text}
          </NavLink>
        ))}
      </div>
      <div
        className="drawer-nav-bar pointer-cursor"
        onClick={() => commonStore.setDrawerVisible(true)}
      >
        <Icon name="bars" />
      </div>
    </div>
  );
});
