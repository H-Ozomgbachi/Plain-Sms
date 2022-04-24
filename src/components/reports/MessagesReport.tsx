import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { useStore } from "../../api/main/appStore";
import CustomDefaultTabHeading from "../headings/CustomDefaultTabHeading";
import FilterMessagesContent from "./FilterMessagesContent";
import FilterMessagesForm from "./FilterMessagesForm";

export default observer(function MessagesReport() {
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
      <CustomDefaultTabHeading content="Messages" />

      <FilterMessagesForm campaigns={campaignStore.campaigns} />

      <FilterMessagesContent />
    </div>
  );
});
