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
    </div>
  );
}
