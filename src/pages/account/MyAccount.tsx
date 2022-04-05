import { observer } from "mobx-react-lite";
import { Icon } from "semantic-ui-react";
import UserCredentials from "../../components/user-credentials/UserCredentials";
import CustomVerticalTab from "../../components/custom-vertical-tab/CustomVerticalTab";
import UserProfile from "../../components/user-profile/UserProfile";
import "../page-specific-styles/MyAccount.css";
import UserConfiguration from "../../components/user-configuration/UserConfiguration";
import { useStore } from "../../api/main/appStore";
import Header from "../../components/header/Header";

export default observer(function MyAccount() {
  const { userAccountStore } = useStore();

  return (
    <>
      <Header />
      <CustomVerticalTab
        tabs={[
          { icon: <Icon name="user" />, text: "Profile" },
          { icon: <Icon name="certificate" />, text: "Credentials" },
          { icon: <Icon name="configure" />, text: "Configuration" },
        ]}
        panels={[
          <UserProfile user={userAccountStore.user} />,
          <UserCredentials creds={userAccountStore.credentials} />,
          <UserConfiguration />,
        ]}
      />
    </>
  );
});
