import { observer } from "mobx-react-lite";
import { Icon } from "semantic-ui-react";
import AllCampaigns from "../../components/campaigns/AllCampaigns";
import CreateCampaign from "../../components/campaigns/CreateCampaign";
import CustomVerticalTab from "../../components/custom-vertical-tab/CustomVerticalTab";
import Header from "../../components/header/Header";

export default observer(function Campaigns() {
  return (
    <>
      <Header />
      <CustomVerticalTab
        tabs={[
          { icon: <Icon name="list" />, text: "My campaigns" },
          { icon: <Icon name="pencil" />, text: "New campaign" },
        ]}
        panels={[<AllCampaigns />, <CreateCampaign />]}
      />
    </>
  );
});
