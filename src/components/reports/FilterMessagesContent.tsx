import { observer } from "mobx-react-lite";
import { useStore } from "../../api/main/appStore";
import { refineMessagesForDownload } from "../../helper-functions/reportsFunctions";
import { DateOnlyFormat } from "../../helper-functions/sharedFunctions";
import MyPagination from "../pagination/MyPagination";
import "./FilterMessagesContent.css";
import PageSizeAndExport from "./PageSizeAndExport";

export default observer(function FilterMessagesContent() {
  const { reportsStore, campaignStore } = useStore();

  const handlePageChange = (index: number) => {
    if (
      reportsStore.messagesReport.length !== 0 &&
      reportsStore.currentQueryParams
    ) {
      const id = reportsStore.messagesReport[0].campaignId;
      const query = {
        ...reportsStore.currentQueryParams,
        pageNumber: index,
      };
      reportsStore.getSmsMessages(id, query);
    }
  };

  const handlePageSizeChange = (size: number) => {
    if (
      reportsStore.messagesReport.length !== 0 &&
      reportsStore.currentQueryParams
    ) {
      reportsStore.setMsgPageSize(size);
      const id = reportsStore.messagesReport[0].campaignId;
      const query = {
        ...reportsStore.currentQueryParams,
        pageSize: size,
        pageNumber: 1,
      };
      reportsStore.getSmsMessages(id, query);
    }
  };

  if (reportsStore.messagesReport.length === 0) return <></>;

  const campaignName = campaignStore.campaigns.find(
    (c) => c.uniqueId === reportsStore.messagesReport[0].campaignId
  )?.name;

  return (
    <>
      <div className={`filtered-msg-container`}>
        <h4 className="filtered-campaign-name">{campaignName}</h4>
        <PageSizeAndExport
          fileName={`messages-${Date.now()}`}
          data={refineMessagesForDownload(reportsStore.messagesReport)}
          handlePageSizeChange={handlePageSizeChange}
        />

        {reportsStore.messagesReport.map((el) => (
          <div key={el.id} className="shadow-card p-3 my-2">
            <div className="row pb-2">
              <div className="col-4 filtered-msg-key">Sender :</div>
              <div className="col-8 filtered-msg-value">{el.sender}</div>
            </div>
            <div className="row pb-2">
              <div className="col-4 filtered-msg-key">Message</div>
              <div className="col-8 filtered-msg-value">{el.text}</div>
            </div>
            <div className="row pb-2">
              <div className="col-4 filtered-msg-key">Recipient</div>
              <div className="col-8 filtered-msg-value">{el.recipient}</div>
            </div>
            <div className="row pb-2">
              <div className="col-4 filtered-msg-key">Type</div>
              <div className="col-8 filtered-msg-value">{el.messageType}</div>
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
        totalPages={reportsStore.totalMsgPages}
      />
    </>
  );
});
