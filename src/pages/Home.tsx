import { Link } from "react-router-dom";
import { customHistory } from "..";

export default function Home() {
  return (
    <div className="container">
      <button
        className="btn btn-primary mt-3"
        onClick={() => customHistory.push("/account/login")}
      >
        Login Page
      </button>

      <Link to={`/account/reset-password`}>Reset</Link>
      <br />
      <Link to={`/account`}>Profile</Link>
    </div>
  );
}
