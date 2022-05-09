import { Form, Formik } from "formik";
import CustomDefaultTabHeading from "../headings/CustomDefaultTabHeading";
import * as Yup from "yup";
import "./MakePayment.css";
import { CustomTextInput } from "../forms/custom/CustomInputs";
import { Button } from "semantic-ui-react";
import { observer } from "mobx-react-lite";
import { useStore } from "../../api/main/appStore";
import { frontendUrl } from "../../urls";
import { useSearchParams } from "react-router-dom";
import { useEffect } from "react";

export default observer(function MakePayment() {
  const { userAccountStore, paymentStore } = useStore();

  const [searchParam] = useSearchParams();

  useEffect(() => {
    const txnref = searchParam.get("txnref");
    (async function verify() {
      if (txnref) {
        await paymentStore.verifyPayment(txnref);
      }
    })();
  }, [searchParam, paymentStore]);

  if (userAccountStore.user === null) return <></>;

  return (
    <>
      <CustomDefaultTabHeading content="Add Funds" />
      <div className="shadow-card make-payment-container">
        <Formik
          initialValues={{
            email: userAccountStore.user.email,
            amount: 0,
            callbackUrl: `${frontendUrl}/payments`,
          }}
          onSubmit={(values, { resetForm }) =>
            paymentStore.initializePayment(values)
          }
          validationSchema={Yup.object({
            email: Yup.string().email().required(),
            amount: Yup.number().min(500, "Mininum deposit is ₦500"),
          })}
        >
          {({ isSubmitting }) => (
            <Form>
              <CustomTextInput
                name="amount"
                type="number"
                placeholder="Enter deposit amount"
                label="Deposit Amount(₦)"
              />

              <Button
                loading={isSubmitting}
                content="Continue"
                className="official-form-btn"
                color="vk"
                type="submit"
              />
            </Form>
          )}
        </Formik>
      </div>
    </>
  );
});
