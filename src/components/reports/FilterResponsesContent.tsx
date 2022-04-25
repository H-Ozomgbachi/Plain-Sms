import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { useStore } from "../../api/main/appStore";
import { DateOnlyFormat } from "../../function-library/helper-functions/sharedHelperMethods";
import MyPagination from "../pagination/MyPagination";
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
    <>
      <div className={`filtered-msg-container`}>
        <h4 className="filtered-campaign-name">{campaignName}</h4>

        {reportsStore.responsesReport.map((el) => (
          <div key={el.id} className="shadow-card p-3 my-2">
            <div className="row pb-2">
              <div className="col-4 filtered-msg-key">Recipient</div>
              <div className="col-8 filtered-msg-value">{el.recipient}</div>
            </div>
            <div className="row pb-2">
              <div className="col-4 filtered-msg-key">Response</div>
              <div className="col-8 filtered-msg-value">{el.response}</div>
            </div>
            <div className="row">
              <div className="col-4 filtered-msg-key">Date</div>
              <div className="col-8 filtered-msg-value">
                {DateOnlyFormat(el.createdOnUtc)}
              </div>
            </div>
          </div>
        ))}
      </div>

      <br />
      <MyPagination
        handlePageChange={(index) => handlePageChange(index)}
        totalPages={reportsStore.totalResponsePages}
      />
    </>
  );
});
