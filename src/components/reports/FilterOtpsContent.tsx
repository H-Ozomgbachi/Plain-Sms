import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { Icon } from "semantic-ui-react";
import { useStore } from "../../api/main/appStore";
import { DateOnlyFormat } from "../../function-library/helper-functions/sharedHelperMethods";
import MyPagination from "../pagination/MyPagination";
import SimpleTable from "../table/SimpleTable";
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
    <div className="shadow-card p-3 mt-4">
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
