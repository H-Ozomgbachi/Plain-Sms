import "bootstrap/dist/css/bootstrap.min.css";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { unstable_HistoryRouter as BrowserRouter } from "react-router-dom";
import "./index.css";

import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { store, StoreContext } from "./api/main/appStore";

export const customHistory = createBrowserHistory();

ReactDOM.render(
  <StoreContext.Provider value={store}>
    <BrowserRouter history={customHistory}>
      <App />
    </BrowserRouter>
  </StoreContext.Provider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
