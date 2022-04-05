import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { useStore } from "./api/main/appStore";
import "./App.css";
import ErrorDisplay from "./components/error-display/ErrorDisplay";
// import Footer from "./components/footer/Footer";
import LoadingComponent from "./components/loading-spinner/LoadingComponent";
import CampaignById from "./pages/campaigns/CampaignById";
import Campaigns from "./pages/campaigns/Campaigns";
import Home from "./pages/Home";
import Login from "./pages/account/Login";
import Register from "./pages/account/Register";
import ForgotPassword from "./pages/account/ForgotPassword";
import ResetPassword from "./pages/account/ResetPassword";
import SuccessDisplay from "./components/success-display/SuccessDisplay";
import MyAccount from "./pages/account/MyAccount";
import { customHistory } from ".";
import HamburgerMenu from "./components/hamburger-menu/HamburgerMenu";

export default observer(function App() {
  const { commonStore, userAccountStore } = useStore();

  useEffect(() => {
    if (commonStore.token && commonStore.id) {
      userAccountStore.myAccount(commonStore.id);
    } else {
      commonStore.setLastVisitedPathname(window.location.pathname);
      customHistory.push("/account/login");
    }
  }, [commonStore.id, commonStore.token, userAccountStore, commonStore]);

  return (
    <>
      <LoadingComponent active={commonStore.loading} />
      <HamburgerMenu visible={commonStore.drawerVisible} />

      <div className="page-container">
        <ErrorDisplay visible={commonStore.isThereError} />
        <SuccessDisplay visible={commonStore.isThereSuccess} />

        <main className="content-wrap min-vh-100">
          <Routes>
            <Route index element={<Home />} />

            <Route path="account">
              <Route index element={<MyAccount />} />
              <Route path="register" element={<Register />} />
              <Route path="login" element={<Login />} />
              <Route path="verify-email" element={<></>} />
              <Route path="forgot-password" element={<ForgotPassword />} />
              <Route path="reset-password" element={<ResetPassword />} />
            </Route>

            <Route path="campaigns">
              <Route index element={<Campaigns />} />
              <Route path=":id" element={<CampaignById />} />
            </Route>

            <Route path="server-error" />
            <Route path="*" element={<h1>Not Found</h1>} />
          </Routes>
        </main>
        {/* <Footer /> */}
      </div>
    </>
  );
});
