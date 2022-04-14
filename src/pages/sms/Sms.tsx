import { observer } from "mobx-react-lite";
import { Icon } from "semantic-ui-react";
import CustomVerticalTab from "../../components/custom-vertical-tab/CustomVerticalTab";
import Header from "../../components/header/Header";
import FileTemplate from "../../components/sms/FileTemplate";
import SendSms from "../../components/sms/SendSms";

export default observer(function Sms() {
  return (
    <>
      <Header />
      <CustomVerticalTab
        tabs={[
          { icon: <Icon name="send" />, text: "Send sms" },
          { icon: <Icon name="file alternate" />, text: "File templates" },
        ]}
        panels={[<SendSms />, <FileTemplate />]}
      />
    </>
  );
});
