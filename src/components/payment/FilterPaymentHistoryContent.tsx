import { observer } from "mobx-react-lite";
import { useStore } from "../../api/main/appStore";
import {
  paymentStatus,
  paymentStatusClass,
  refinePaymentHistoryForDownload,
} from "../../helper-functions/reportsFunctions";
import {
  DateOnlyFormat,
  NairaFormatter,
} from "../../helper-functions/sharedFunctions";
import MyPagination from "../pagination/MyPagination";
import PageSizeAndExport from "../reports/PageSizeAndExport";
import SimpleTable from "../table/SimpleTable";

export default observer(function FilterPaymentHistoryContent() {
  const { userAccountStore, paymentStore } = useStore();

  const handlePageChange = (index: number) => {
    if (
      paymentStore.paymentHistory.length !== 0 &&
      paymentStore.currentQueryParams &&
      userAccountStore.user
    ) {
      const query = {
        ...paymentStore.currentQueryParams,
        pageNumber: index,
      };
      paymentStore.getPaymentHistory(userAccountStore.user.id, query);
    }
  };

  const handlePageSizeChange = (size: number) => {
    if (
      paymentStore.paymentHistory.length !== 0 &&
      paymentStore.currentQueryParams &&
      userAccountStore.user
    ) {
      paymentStore.setPaymentPageSize(size);
      const query = {
        ...paymentStore.currentQueryParams,
        pageSize: +size,
        pageNumber: 1,
      };
      paymentStore.getPaymentHistory(userAccountStore.user.id, query);
    }
  };

  if (paymentStore.paymentHistory.length === 0) return <></>;

  return (
    <div className="shadow-card p-3 mt-4">
      <PageSizeAndExport
        fileName={`payment-history-${Date.now()}`}
        data={refinePaymentHistoryForDownload(paymentStore.paymentHistory)}
        handlePageSizeChange={handlePageSizeChange}
      />
      <SimpleTable
        titles={["Date", "Amount", "transaction id", "Status"]}
        data={paymentStore.paymentHistory}
        tableBodyBuilder={(el) => (
          <tr key={el.id}>
            <td>{DateOnlyFormat(el.createdUTC)}</td>
            <td>{NairaFormatter(el.amount)}</td>
            <td>{el.id}</td>
            <td className={paymentStatusClass(el.status)}>
              {paymentStatus(el.status)}
            </td>
          </tr>
        )}
      />
      <MyPagination
        handlePageChange={(index) => handlePageChange(index)}
        totalPages={paymentStore.totalPaymentPages}
      />
    </div>
  );
});
