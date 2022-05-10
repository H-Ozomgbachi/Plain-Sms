import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Icon } from "semantic-ui-react";
import { useStore } from "../../api/main/appStore";
import CustomVerticalTab from "../../components/custom-vertical-tab/CustomVerticalTab";
import Header from "../../components/header/Header";
import MakePayment from "../../components/payment/MakePayment";
import PaymentHistory from "../../components/payment/PaymentHistory";

export default observer(function Payment() {
  const { paymentStore } = useStore();
  const [searchParam] = useSearchParams();

  useEffect(() => {
    const txnref = searchParam.get("txnref");
    (async function verify() {
      if (txnref) {
        await paymentStore.verifyPayment(txnref);
      }
    })();
  }, [searchParam, paymentStore]);

  return (
    <>
      <Header />
      <CustomVerticalTab
        tabs={[
          { icon: <Icon name="payment" />, text: "Make payment" },
          { icon: <Icon name="history" />, text: "Payment history" },
        ]}
        panels={[<MakePayment />, <PaymentHistory />]}
      />
    </>
  );
});
