import { Form, Formik } from "formik";
import CustomDefaultTabHeading from "../headings/CustomDefaultTabHeading";
import * as Yup from "yup";
import "./MakePayment.css";
import { CustomTextInput } from "../forms/custom/CustomInputs";
import { Button } from "semantic-ui-react";
import { observer } from "mobx-react-lite";
import { useStore } from "../../api/main/appStore";
import { frontendUrl } from "../../urls";

export default observer(function MakePayment() {
  const { userAccountStore, paymentStore } = useStore();

  if (userAccountStore.user === null) return <></>;

  return (
    <>
      <CustomDefaultTabHeading content="Initialize Deposit" />
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
                className="w-100 mt-3"
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
