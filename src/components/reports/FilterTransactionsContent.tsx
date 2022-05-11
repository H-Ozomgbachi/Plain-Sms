import { observer } from "mobx-react-lite";
import { useStore } from "../../api/main/appStore";
import {
  refineTransactionsForDownload,
  transactionTypeName,
} from "../../helper-functions/reportsFunctions";
import {
  DateOnlyFormat,
  NairaFormatter,
} from "../../helper-functions/sharedFunctions";
import MyPagination from "../pagination/MyPagination";
import SimpleTable from "../table/SimpleTable";
import "./FilterMessagesContent.css";
import PageSizeAndExport from "./PageSizeAndExport";

export default observer(function FilterTransactionsContent() {
  const { reportsStore, userAccountStore } = useStore();

  const handlePageChange = (index: number) => {
    if (
      reportsStore.transactionsReport.length !== 0 &&
      reportsStore.currentQueryParams &&
      userAccountStore.user
    ) {
      const query = {
        ...reportsStore.currentQueryParams,
        pageNumber: index,
      };
      reportsStore.getTransactions(userAccountStore.user.id, query);
    }
  };

  const handlePageSizeChange = (size: number) => {
    if (
      reportsStore.transactionsReport.length !== 0 &&
      reportsStore.currentQueryParams &&
      userAccountStore.user
    ) {
      reportsStore.setTransactionPageSize(size);
      const query = {
        ...reportsStore.currentQueryParams,
        pageSize: +size,
        pageNumber: 1,
      };
      reportsStore.getTransactions(userAccountStore.user.id, query);
    }
  };

  if (reportsStore.transactionsReport.length === 0) return <></>;

  return (
    <div className="shadow-card p-3 mt-4">
      <PageSizeAndExport
        fileName={`transaction-${Date.now()}`}
        data={refineTransactionsForDownload(reportsStore.transactionsReport)}
        handlePageSizeChange={handlePageSizeChange}
      />

      <SimpleTable
        titles={["Date", "transaction type", "Units", "Unit Price", "Amount"]}
        data={reportsStore.transactionsReport}
        tableBodyBuilder={(el) => (
          <tr key={el.id}>
            <td>{DateOnlyFormat(el.createdUTC)}</td>
            <td>{transactionTypeName(el.transactionType)}</td>
            <td>{el.units}</td>
            <td>{NairaFormatter(el.unitPrice)}</td>
            <td>{NairaFormatter(el.amount)}</td>
          </tr>
        )}
      />

      <MyPagination
        handlePageChange={(index) => handlePageChange(index)}
        totalPages={reportsStore.totalTransactionsPages}
      />
    </div>
  );
});
