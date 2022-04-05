import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { useStore } from "../../api/main/appStore";
import { TertiaryHeading } from "../headings/Headings";
import SimpleTable from "../table/SimpleTable";

export default observer(function AllCampaigns() {
  const { campaignStore } = useStore();

  useEffect(() => {
    if (campaignStore.campaigns.length === 0) {
      (async function getCampaigns() {
        await campaignStore.getAllCampaigns();
      })();
    }
  }, [campaignStore]);

  return (
    <div>
      <TertiaryHeading content="Campaigns List" />

      <SimpleTable titles={["Name", "Url"]} data={campaignStore.campaigns} />
    </div>
  );
});
