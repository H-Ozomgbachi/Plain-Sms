import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { useStore } from "../../api/main/appStore";
import {
  DateOnlyFormat,
  NairaFormatter,
} from "../../function-library/helper-functions/sharedHelperMethods";
import MyPagination from "../pagination/MyPagination";
import SimpleTable from "../table/SimpleTable";

export default observer(function FilterPaymentHistoryContent() {
  const { reportsStore, userAccountStore, paymentStore } = useStore();

  useEffect(() => {}, [paymentStore.paymentHistory, paymentStore]);

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

  if (paymentStore.paymentHistory.length === 0) return <></>;

  return (
    <div className="shadow-card p-3 mt-4">
      <SimpleTable
        titles={["Date", "Amount", "transaction id"]}
        data={paymentStore.paymentHistory}
        tableBodyBuilder={(el) => (
          <tr key={el.id}>
            <td>{DateOnlyFormat(el.createdUTC)}</td>
            <td>{NairaFormatter(el.amount)}</td>
            <td>{el.id}</td>
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
