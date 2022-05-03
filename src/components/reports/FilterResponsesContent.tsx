import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { useStore } from "../../api/main/appStore";
import { DateOnlyFormat } from "../../function-library/helper-functions/sharedHelperMethods";
import MyPagination from "../pagination/MyPagination";
import SimpleTable from "../table/SimpleTable";
import "./FilterMessagesContent.css";

export default observer(function FilterResponsesContent() {
  const { reportsStore, campaignStore } = useStore();

  useEffect(() => {}, [reportsStore.responsesReport, reportsStore]);

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

  if (reportsStore.responsesReport.length === 0) return <></>;

  const campaignName = campaignStore.campaigns.find(
    (c) => c.uniqueId === reportsStore.responsesReport[0].campaignId
  )?.name;

  return (
    <div className="shadow-card p-3 mt-4">
      <div className={`filtered-msg-container`}>
        <h4 className="filtered-campaign-name">{campaignName}</h4>

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
