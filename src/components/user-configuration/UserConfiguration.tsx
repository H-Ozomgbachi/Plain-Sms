import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { useStore } from "../../api/main/appStore";
import "./UserConfiguration.css";

export default observer(function UserConfiguration() {
  const { userAccountStore } = useStore();

  useEffect(() => {
    if (!userAccountStore.configuration && userAccountStore.isLoggedIn) {
      (async function getConfig() {
        await userAccountStore.getConfiguration(userAccountStore.user?.id!);
      })();
    }
  }, [userAccountStore]);

  return (
    <div>
      <div className="user-profile-header">
        <h2 className="user-profile-header-title">Configuration</h2>
      </div>
    </div>
  );
});
