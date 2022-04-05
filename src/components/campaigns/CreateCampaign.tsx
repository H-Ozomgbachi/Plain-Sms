import { observer } from "mobx-react-lite";
import "./CreateCampaign.css";
import CreateCampaignForm from "../forms/campaign-form/CreateCampaignForm";

export default observer(function CreateCampaign() {
  return (
    <div>
      <div className="user-profile-header">
        <h2 className="user-profile-header-title"> New SMS Campaign</h2>
      </div>

      <div className="user-profile-data">
        <CreateCampaignForm />
      </div>
    </div>
  );
});
