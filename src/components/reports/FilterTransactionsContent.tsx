import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { useStore } from "../../api/main/appStore";
import { transactionTypeName } from "../../function-library/helper-functions/reportsHelperMethods";
import {
  DateOnlyFormat,
  NairaFormatter,
} from "../../function-library/helper-functions/sharedHelperMethods";
import MyPagination from "../pagination/MyPagination";
import SimpleTable from "../table/SimpleTable";
import "./FilterMessagesContent.css";

export default observer(function FilterTransactionsContent() {
  const { reportsStore, userAccountStore } = useStore();

  useEffect(() => {}, [reportsStore.transactionsReport, reportsStore]);

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

  if (reportsStore.transactionsReport.length === 0) return <></>;

  return (
    <div className="shadow-card p-3 mt-4">
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
