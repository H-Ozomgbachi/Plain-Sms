import { observer } from "mobx-react-lite";
import { useStore } from "../../api/main/appStore";
import { refineResponseForDownload } from "../../helper-functions/reportsFunctions";
import { DateOnlyFormat } from "../../helper-functions/sharedFunctions";
import MyPagination from "../pagination/MyPagination";
import SimpleTable from "../table/SimpleTable";
import "./FilterMessagesContent.css";
import PageSizeAndExport from "./PageSizeAndExport";

export default observer(function FilterResponsesContent() {
  const { reportsStore, campaignStore } = useStore();

  const handlePageChange = (index: number) => {
    if (
      reportsStore.responsesReport.length !== 0 &&
      reportsStore.currentQueryParams
    ) {
      const id = reportsStore.responsesReport[0].campaignId;
      const query = {
        ...reportsStore.currentQueryParams,
        pageNumber: index,
      };
      reportsStore.getSmsMessageResponses(id, query);
    }
  };

  const handlePageSizeChange = (size: number) => {
    if (
      reportsStore.responsesReport.length !== 0 &&
      reportsStore.currentQueryParams
    ) {
      reportsStore.setResponsePageSize(size);
      const id = reportsStore.responsesReport[0].campaignId;
      const query = {
        ...reportsStore.currentQueryParams,
        pageSize: size,
        pageNumber: 1,
      };
      reportsStore.getSmsMessageResponses(id, query);
    }
  };

  if (reportsStore.responsesReport.length === 0) return <></>;

  const campaignName = campaignStore.campaigns.find(
    (c) => c.uniqueId === reportsStore.responsesReport[0].campaignId
  )?.name;

  return (
    <div className="shadow-card p-3 mt-4">
      <div className={`filtered-msg-container`}>
        <h4 className="filtered-campaign-name">{campaignName}</h4>

        <PageSizeAndExport
          fileName={`messages-response-${Date.now()}`}
          data={refineResponseForDownload(reportsStore.responsesReport)}
          handlePageSizeChange={handlePageSizeChange}
        />

        <SimpleTable
          titles={["Sender", "date", "response", "code", "recipient"]}
          data={reportsStore.responsesReport}
          tableBodyBuilder={(el) => (
            <tr key={el.id}>
              <td>{el.sender}</td>
              <td>{DateOnlyFormat(el.createdOnUtc)}</td>
              <td>{el.text}</td>
              <td>{el.responseCode}</td>
              <td>{el.recipient}</td>
            </tr>
          )}
        />
      </div>

      <MyPagination
        handlePageChange={(index) => handlePageChange(index)}
        totalPages={reportsStore.totalResponsePages}
      />
    </div>
  );
});
