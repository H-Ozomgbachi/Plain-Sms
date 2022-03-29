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
import Login from "./pages/Login";
import Register from "./pages/Register";

export default observer(function App() {
  const { commonStore, userAccountStore } = useStore();

  useEffect(() => {
    if (commonStore.token && commonStore.id) {
      userAccountStore.myAccount(commonStore.id);
    }
  }, [commonStore.id, commonStore.token, userAccountStore]);

  return (
    <>
      <LoadingComponent active={commonStore.loading} />

      <div className="page-container">
        <ErrorDisplay visible={commonStore.isThereError} />

        <main className="content-wrap min-vh-100">
          <Routes>
            <Route index element={<Home />} />

            <Route path="account">
              <Route index element={<></>} />
              <Route path="register" element={<Register />} />
              <Route path="login" element={<Login />} />
              <Route path="verify-email" element={<></>} />
              <Route path="forgot-password" element={<></>} />
              <Route path="reset-password" element={<></>} />
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
