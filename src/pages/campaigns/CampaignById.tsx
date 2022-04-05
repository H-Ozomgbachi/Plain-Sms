import { observer } from "mobx-react-lite";
import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Button } from "semantic-ui-react";
import { customHistory } from "../..";
import { useStore } from "../../api/main/appStore";
import CreateCampaignForm from "../../components/forms/campaign-form/CreateCampaignForm";
import Header from "../../components/header/Header";
import "../page-specific-styles/CampaignById.css";

export default observer(function CampaignById() {
  let params = useParams();
  const [isEditing, setIsEditing] = useState(false);
  const { campaignStore } = useStore();

  useEffect(() => {
    if (!params.id) {
      customHistory.push("/campaigns");
      return;
    }
    (async function getCampaign() {
      await campaignStore.getOneCampaign(params.id!);
    })();
  }, [campaignStore, params.id]);

  if (!campaignStore.currentCampaign) return <></>;

  return (
    <div className="default-page-bg">
      <Header />
      <div className="campaign-container shadow-sm">
        {isEditing ? (
          <CreateCampaignForm
            closeEdit={() => setIsEditing(false)}
            currentData={campaignStore.currentCampaign}
          />
        ) : (
          <div>
            <h4 className="text-secondary">Campaign detail</h4>

            <div className="campaign-detail-item row">
              <div className="campaign-detail-key col-3">Name </div>
              <div className="campaign-detail-value col-9">
                {campaignStore.currentCampaign?.name}
              </div>
            </div>
            <div className="campaign-detail-item row">
              <div className="campaign-detail-key col-3">Url </div>
              <div className="campaign-detail-value col-9">
                {campaignStore.currentCampaign?.callbackUrl}
              </div>
            </div>

            <Button
              content="Edit Campaign"
              primary
              onClick={() => setIsEditing(true)}
            />
          </div>
        )}
      </div>
    </div>
  );
});
