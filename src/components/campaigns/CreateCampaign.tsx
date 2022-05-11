import { observer } from "mobx-react-lite";
import "./CreateCampaign.css";
import CreateCampaignForm from "../forms/campaign-form/CreateCampaignForm";
import CustomDefaultTabHeading from "../headings/CustomDefaultTabHeading";

export default observer(function CreateCampaign() {
  return (
    <div>
      <CustomDefaultTabHeading content="New SMS Campaign" />

      <div className="create-campaign-box">
        <CreateCampaignForm />
      </div>
    </div>
  );
});
