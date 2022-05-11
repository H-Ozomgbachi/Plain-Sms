import { observer } from "mobx-react-lite";
import { Icon } from "semantic-ui-react";
import { useStore } from "../../api/main/appStore";
import { refineOtpsForDownload } from "../../helper-functions/reportsFunctions";
import { DateOnlyFormat } from "../../helper-functions/sharedFunctions";
import MyPagination from "../pagination/MyPagination";
import SimpleTable from "../table/SimpleTable";
import "./FilterMessagesContent.css";
import PageSizeAndExport from "./PageSizeAndExport";

export default observer(function FilterOtpsContent() {
  const { reportsStore, userAccountStore } = useStore();

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

  const handlePageSizeChange = (size: number) => {
    if (
      reportsStore.otpsReport.length !== 0 &&
      reportsStore.currentQueryParams &&
      userAccountStore.user
    ) {
      reportsStore.setOtpPageSize(size);
      const query = {
        ...reportsStore.currentQueryParams,
        pageSize: +size,
        pageNumber: 1,
      };
      reportsStore.getOtpMessages(userAccountStore.user.id, query);
    }
  };

  if (reportsStore.otpsReport.length === 0) return <></>;

  return (
    <div className="shadow-card p-3 mt-4">
      <PageSizeAndExport
        fileName={`otps-${Date.now()}`}
        data={refineOtpsForDownload(reportsStore.otpsReport)}
        handlePageSizeChange={handlePageSizeChange}
      />
      <SimpleTable
        titles={[
          "Recipient",
          "Created",
          "times sent",
          "Expires",
          "Verified Status",
        ]}
        data={reportsStore.otpsReport}
        tableBodyBuilder={(el) => (
          <tr key={el.id}>
            <td>{el.recipient}</td>
            <td>{DateOnlyFormat(el.createdOnUtc)}</td>
            <td>{el.sent}</td>
            <td>{DateOnlyFormat(el.expiresOnUtc)}</td>
            <td>
              {el.isVerified ? (
                <Icon name="checkmark box" className="text-success" />
              ) : (
                <Icon name="times circle" className="text-secondary" />
              )}
            </td>
          </tr>
        )}
      />

      <MyPagination
        handlePageChange={(index) => handlePageChange(index)}
        totalPages={reportsStore.totalOtpPages}
      />
    </div>
  );
});
