import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { useStore } from "../../api/main/appStore";
import { DateOnlyFormat } from "../../function-library/helper-functions/sharedHelperMethods";
import MyPagination from "../pagination/MyPagination";
import "./FilterMessagesContent.css";

export default observer(function FilterOtpsContent() {
  const { reportsStore, userAccountStore } = useStore();

  useEffect(() => {}, [reportsStore.otpsReport, reportsStore]);

  const handlePageChange = (index: number) => {
    if (
      reportsStore.otpsReport.length !== 0 &&
      reportsStore.currentQueryParams &&
      userAccountStore.user
    ) {
      const query = {
        ...reportsStore.currentQueryParams,
        pageNumber: index,
      };
      reportsStore.getOtpMessages(userAccountStore.user.id, query);
    }
  };

  if (reportsStore.otpsReport.length === 0) return <></>;

  return (
    <>
      <div className={`filtered-msg-container`}>
        {reportsStore.otpsReport.map((el) => (
          <div key={el.id} className="shadow-card p-3 my-2">
            <div className="row pb-2">
              <div className="col-4 filtered-msg-key">Recipient</div>
              <div className="col-8 filtered-msg-value">{el.recipient}</div>
            </div>
            <div className="row pb-2">
              <div className="col-4 filtered-msg-key">Code</div>
              <div className="col-8 filtered-msg-value">{el.code}</div>
            </div>
            <div className="row">
              <div className="col-4 filtered-msg-key">Created</div>
              <div className="col-8 filtered-msg-value">
                {DateOnlyFormat(el.createdOnUtc)}
              </div>
            </div>
            <div className="row">
              <div className="col-4 filtered-msg-key">Expires</div>
              <div className="col-8 filtered-msg-value">
                {DateOnlyFormat(el.expiresOnUtc)}
              </div>
            </div>
          </div>
        ))}
      </div>

      <br />
      <MyPagination
        handlePageChange={(index) => handlePageChange(index)}
        totalPages={reportsStore.totalOtpPages}
      />
    </>
  );
});
