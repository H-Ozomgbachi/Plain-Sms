import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { Icon } from "semantic-ui-react";
import { customHistory } from "../..";
import { useStore } from "../../api/main/appStore";
import { PrimaryHeading } from "../headings/Headings";
import SimpleTable from "../table/SimpleTable";

export default observer(function AllCampaigns() {
  const { campaignStore } = useStore();

  useEffect(() => {
    (async function getCampaigns() {
      await campaignStore.getAllCampaigns();
    })();
  }, [campaignStore.campaigns, campaignStore]);

  return (
    <div className="shadow-card p-3">
      <PrimaryHeading content="My Campaigns" />

      <SimpleTable
        titles={["Name", "Url", ""]}
        data={campaignStore.campaigns}
        tableBodyBuilder={(el) => (
          <tr key={el.id} className="pointer-cursor">
            <td>
              <span
                onClick={() => customHistory.push(`/campaigns/${el.uniqueId}`)}
                className="d-block"
              >
                {el.name}
              </span>
              <span className="under-data">{el.uniqueId}</span>
            </td>
            <td>{el.callbackUrl}</td>
            <td onClick={() => customHistory.push(`/campaigns/${el.uniqueId}`)}>
              <Icon name="edit" />
            </td>
          </tr>
        )}
      />
    </div>
  );
});
