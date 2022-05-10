import { observer } from "mobx-react-lite";
import { useStore } from "../../api/main/appStore";
import { CampaignData } from "../../api/models/campaign";
import CustomDefaultTabHeading from "../headings/CustomDefaultTabHeading";
import FilterMessagesContent from "./FilterMessagesContent";
import FilterReportForm from "./FilterReportForm";

interface Props {
  campaigns: CampaignData[];
}

export default observer(function MessagesReport({ campaigns }: Props) {
  const { reportsStore } = useStore();

  return (
    <div>
      <CustomDefaultTabHeading content="Messages" />

      <FilterReportForm
        campaigns={campaigns}
        handleSubmit={reportsStore.getSmsMessages}
        pageSize={reportsStore.msgPageSize}
      />

      <FilterMessagesContent />
    </div>
  );
});
