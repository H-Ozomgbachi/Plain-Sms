import { observer } from "mobx-react-lite";
import { useStore } from "../../api/main/appStore";
import CustomDefaultTabHeading from "../headings/CustomDefaultTabHeading";
import FilterTransactionForm from "./FilterTransactionForm";
import FilterTransactionsContent from "./FilterTransactionsContent";

export default observer(function TransactionsReport() {
  const { reportsStore } = useStore();
  return (
    <div>
      <CustomDefaultTabHeading content="Transactions" />

      <FilterTransactionForm
        isOnlyDeposit={false}
        handleSubmit={reportsStore.getTransactions}
      />

      <FilterTransactionsContent />
    </div>
  );
});
