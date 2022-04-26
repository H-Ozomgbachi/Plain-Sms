import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { Icon } from "semantic-ui-react";
import { useStore } from "../../api/main/appStore";
import CustomVerticalTab from "../../components/custom-vertical-tab/CustomVerticalTab";
import Header from "../../components/header/Header";
import MessagesReport from "../../components/reports/MessagesReport";
import OtpsReport from "../../components/reports/OtpsReport";
import ResponsesReport from "../../components/reports/ResponsesReport";

export default observer(function Reports() {
  const { campaignStore, commonStore } = useStore();

  useEffect(() => {
    if (!campaignStore.campaigns.length) {
      (async function getCampaigns() {
        commonStore.setLoading(true);
        await campaignStore.getAllCampaigns();
      })().finally(() => commonStore.setLoading(false));
    }
  }, [campaignStore, commonStore]);

  return (
    <>
      <Header />
      <CustomVerticalTab
        tabs={[
          { icon: <Icon name="mail" />, text: "Messages" },
          { icon: <Icon name="reply" />, text: "Responses" },
          { icon: <Icon name="lock" />, text: "Otps" },
        ]}
        panels={[
          <MessagesReport campaigns={campaignStore.campaigns} />,
          <ResponsesReport campaigns={campaignStore.campaigns} />,
          <OtpsReport />,
        ]}
      />
    </>
  );
});
