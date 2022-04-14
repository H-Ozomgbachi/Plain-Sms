import { observer } from "mobx-react-lite";
import { Icon } from "semantic-ui-react";
import CustomVerticalTab from "../../components/custom-vertical-tab/CustomVerticalTab";
import Header from "../../components/header/Header";
import MessagesReport from "../../components/reports/MessagesReport";

export default observer(function Reports() {
  return (
    <>
      <Header />
      <CustomVerticalTab
        tabs={[
          { icon: <Icon name="mail" />, text: "Messages" },
          { icon: <Icon name="reply" />, text: "Responses" },
          { icon: <Icon name="lock" />, text: "Otps" },
        ]}
        panels={[<MessagesReport />, <></>]}
      />
    </>
  );
});
