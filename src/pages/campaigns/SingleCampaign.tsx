import { observer } from "mobx-react-lite";
import CampaignById from "../../components/campaigns/CampaignById";
import Header from "../../components/header/Header";

export default observer(function SingleCampaign() {
  return (
    <div className="default-page-bg">
      <Header />
      <CampaignById />
    </div>
  );
});
