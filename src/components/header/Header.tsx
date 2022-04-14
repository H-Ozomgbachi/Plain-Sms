import { observer } from "mobx-react-lite";
import { Link, NavLink } from "react-router-dom";
import { Icon } from "semantic-ui-react";
import { useStore } from "../../api/main/appStore";
import "./Header.css";

const data = [
  {
    to: "/campaigns",
    text: "Campaigns",
  },

  {
    to: "/payments",
    text: "Payments",
  },
  {
    to: "/sms",
    text: "Sms",
  },
  {
    to: "/reports",
    text: "Reports",
  },
  {
    to: "/account",
    text: "Account",
  },
];

export default observer(function Header() {
  const { commonStore } = useStore();
  return (
    <div className="header-container ">
      <Link to={"/"} className="logo-container">
        <img alt="Log" src="/sms-logo.jpg" className="logo-img" />{" "}
        <span className="logo-text">Plain Sms</span>
      </Link>
      <div className="header-links-box">
        {data.map((el, index) => (
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
