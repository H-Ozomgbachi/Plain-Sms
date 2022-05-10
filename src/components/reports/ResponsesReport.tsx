import { observer } from "mobx-react-lite";
import { useStore } from "../../api/main/appStore";
import { CampaignData } from "../../api/models/campaign";
import CustomDefaultTabHeading from "../headings/CustomDefaultTabHeading";
import FilterReportForm from "./FilterReportForm";
import FilterResponsesContent from "./FilterResponsesContent";

interface Props {
  campaigns: CampaignData[];
}

export default observer(function ResponsesReport({ campaigns }: Props) {
  const { reportsStore } = useStore();

  return (
    <div>
      <CustomDefaultTabHeading content="Responses" />

      <FilterReportForm
        campaigns={campaigns}
        handleSubmit={reportsStore.getSmsMessageResponses}
        pageSize={reportsStore.responsePageSize}
      />

      <FilterResponsesContent />
    </div>
  );
});
