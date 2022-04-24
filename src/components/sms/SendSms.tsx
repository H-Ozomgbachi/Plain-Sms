import "./SendSms.css";
import BasicHorizontalTab from "../basic-horizontal-tab/BasicHorizontalTab";
import CustomDefaultTabHeading from "../headings/CustomDefaultTabHeading";
import CreateSmsOne from "./CreateSmsOne";
import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { useStore } from "../../api/main/appStore";

export default observer(function SendSms() {
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
    <div>
      <CustomDefaultTabHeading content="Send New Sms" />
      <BasicHorizontalTab
        tabs={[
          "One message to many recipients",
          "Many messages to many recipients",
        ]}
        panels={[<CreateSmsOne campaigns={campaignStore.campaigns} />, <></>]}
      />
    </div>
  );
});
