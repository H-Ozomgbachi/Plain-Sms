import { observer } from "mobx-react-lite";
import { Link } from "react-router-dom";
import { useStore } from "../../api/main/appStore";
import "./HamburgerMenu.css";

interface Props {
  visible: boolean;
}

const data = [
  { to: "/", text: "Home" },
  { to: "/campaigns", text: "Campaign" },
  { to: "/sms", text: "Sms" },
  { to: "/report", text: "Report" },
  { to: "/account", text: "Account" },
];

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
        X
      </div>
      <div className="hamburger-menu-links">
        {data.map((el) => (
          <Link to={el.to} key={el.text} onClick={handleClick}>
            {" "}
            {el.text}
          </Link>
        ))}
      </div>
    </div>
  );
});
