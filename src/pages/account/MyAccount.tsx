import { observer } from "mobx-react-lite";
import { Icon } from "semantic-ui-react";
import UserCredentials from "../../components/user-credentials/UserCredentials";
import CustomVerticalTab from "../../components/custom-vertical-tab/CustomVerticalTab";
import UserProfile from "../../components/user-profile/UserProfile";
import UserConfiguration from "../../components/user-configuration/UserConfiguration";
import { useStore } from "../../api/main/appStore";
import Header from "../../components/header/Header";
import { useEffect } from "react";
import { customHistory } from "../..";
import ModalDecisionContent from "../../components/modal/ModalDecisionContent";

export default observer(function MyAccount() {
  const { userAccountStore, commonStore } = useStore();

  useEffect(() => {
    if (userAccountStore.user === null) {
      customHistory.push("/account/login");
    }
  }, [userAccountStore.user, userAccountStore]);

  return (
    <>
      <Header />
      <CustomVerticalTab
        tabs={[
          { icon: <Icon name="user" />, text: "Profile" },
          { icon: <Icon name="certificate" />, text: "API Credentials" },
          { icon: <Icon name="configure" />, text: "Configuration" },
          {
            icon: <Icon name="sign-out" />,
            text: "Log out",
            callbackFn: () =>
              commonStore.setModalContent(
                <ModalDecisionContent
                  actionName="logout of this application"
                  actionCallback={userAccountStore.logout}
                />
              ),
          },
        ]}
        panels={[
          <UserProfile user={userAccountStore.user} />,
          <UserCredentials creds={userAccountStore.credentials} />,
          <UserConfiguration config={userAccountStore.configuration} />,
        ]}
      />
    </>
  );
});
