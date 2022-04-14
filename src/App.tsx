import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { useStore } from "./api/main/appStore";
import "./App.css";
import ErrorDisplay from "./components/error-display/ErrorDisplay";
import LoadingComponent from "./components/loading-spinner/LoadingComponent";
import CampaignById from "./pages/campaigns/CampaignById";
import Campaigns from "./pages/campaigns/Campaigns";
import Login from "./pages/account/Login";
import Register from "./pages/account/Register";
import ForgotPassword from "./pages/account/ForgotPassword";
import ResetPassword from "./pages/account/ResetPassword";
import SuccessDisplay from "./components/success-display/SuccessDisplay";
import MyAccount from "./pages/account/MyAccount";
import HamburgerMenu from "./components/hamburger-menu/HamburgerMenu";
import Reports from "./pages/reports/Reports";
import Sms from "./pages/sms/Sms";
import { RedirectTo } from "./api/models/shared";
import Payment from "./pages/payments/Payment";

export default observer(function App() {
  const { commonStore, userAccountStore } = useStore();

  useEffect(() => {
    if (commonStore.token && commonStore.id) {
      userAccountStore.myAccount(commonStore.id);
    }

    window.addEventListener("beforeunload", () =>
      commonStore.setOnreloadPath(window.location.pathname)
    );
  }, [commonStore.id, commonStore.token, userAccountStore, commonStore]);

  function Redirect({ to }: RedirectTo) {
    let navigate = useNavigate();
    useEffect(() => {
      navigate(to);
    });
    return null;
  }

  return (
    <>
      <LoadingComponent active={commonStore.loading} />
      <HamburgerMenu visible={commonStore.drawerVisible} />

      <div className="page-container">
        <ErrorDisplay visible={commonStore.isThereError} />
        <SuccessDisplay visible={commonStore.isThereSuccess} />

        <main className="content-wrap min-vh-100">
          <Routes>
            <Route index element={<Redirect to="/campaigns" />} />

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

            <Route path="reports">
              <Route index element={<Reports />} />
            </Route>

            <Route path="sms">
              <Route index element={<Sms />} />
            </Route>

            <Route path="payments">
              <Route index element={<Payment />} />
            </Route>

            <Route path="server-error" />
            <Route path="*" element={<h1>Not Found Page</h1>} />
          </Routes>
        </main>
      </div>
    </>
  );
});
