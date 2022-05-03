import { Icon } from "semantic-ui-react";
import CustomVerticalTab from "../../components/custom-vertical-tab/CustomVerticalTab";
import Header from "../../components/header/Header";
import MakePayment from "../../components/payment/MakePayment";
import PaymentHistory from "../../components/payment/PaymentHistory";

export default function Payment() {
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
}
