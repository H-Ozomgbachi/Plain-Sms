import CustomDefaultTabHeading from "../headings/CustomDefaultTabHeading";
import "./MakePayment.css";
import { observer } from "mobx-react-lite";
import { useStore } from "../../api/main/appStore";
import FilterTransactionForm from "../reports/FilterTransactionForm";
import FilterPaymentHistoryContent from "./FilterPaymentHistoryContent";

export default observer(function PaymentHistory() {
  const { userAccountStore, paymentStore } = useStore();

  if (userAccountStore.user === null) return <></>;

  return (
    <>
      <CustomDefaultTabHeading content="Funding Records" />
      <FilterTransactionForm
        isOnlyDeposit={true}
        handleSubmit={paymentStore.getPaymentHistory}
      />
      <FilterPaymentHistoryContent />
    </>
  );
});
