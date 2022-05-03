import { Form, Formik } from "formik";
import { observer } from "mobx-react-lite";
import * as Yup from "yup";
import { Button } from "semantic-ui-react";
import CustomDefaultTabHeading from "../headings/CustomDefaultTabHeading";
import "./UserConfiguration.css";
import MyTextInput from "../inputs/MyTextInput";
import { ConfigurationData } from "../../api/models/userAccount";
import { useStore } from "../../api/main/appStore";

interface Props {
  config: ConfigurationData | null;
}

export default observer(function UserConfiguration({ config }: Props) {
  const { userAccountStore } = useStore();

  if (config === null) return <></>;
  return (
    <div>
      <CustomDefaultTabHeading content="Configuration" />

      <div className="p-3 shadow-card">
        <Formik
          initialValues={{
            countryCode: config?.countryCode,
            smsUnitPrice: config?.smsUnitPrice,
            smsIntlUnitPrice: config?.smsIntlUnitPrice,
            whatsappUnitPrice: config?.whatsappUnitPrice,
            otpUnitPrice: config?.otpUnitPrice,
            otpIntlUnitPrice: config?.otpIntlUnitPrice,
            otpLength: config?.otpLength,
            otpIsAlphaNumeric: config.otpIsAlphaNumeric,
            otpMessageTemplate: config?.otpMessageTemplate,
            userId: config?.userId,
            error: null,
          }}
          onSubmit={async (values, { setErrors }) =>
            userAccountStore.editConfiguration(values)
          }
          validationSchema={Yup.object({
            otpLength: Yup.string().required("This field is required"),
            otpIsAlphaNumeric: Yup.boolean().required("This field is required"),
            otpMessageTemplate: Yup.string().required("This field is required"),
          })}
        >
          {({ handleSubmit, isSubmitting, isValid, dirty, values }) => (
            <Form className="ui form">
              <MyTextInput
                name="countryCode"
                placeholder="Enter Country Code"
                label="Country Code :"
                disabled
              />
              <MyTextInput
                name="smsUnitPrice"
                placeholder="Enter SMS Unit Price :"
                label="Unit Price (₦)"
                disabled
              />

              <MyTextInput
                name="smsIntlUnitPrice"
                placeholder="Enter Intl. Unit Price"
                label="International Unit Price (₦)"
                disabled
              />
              <MyTextInput
                name="whatsappUnitPrice"
                placeholder="Enter WhatsApp Unit Price"
                label="WhatsApp Unit Price [COMING SOON]"
                disabled
              />
              <MyTextInput
                name="otpUnitPrice"
                placeholder="Enter OTP Unit Price"
                label="OTP Unit Price (₦)"
                disabled
              />
              <MyTextInput
                name="otpIntlUnitPrice"
                placeholder="Enter OTP Intl. Unit Price"
                label="OTP International Unit Price (₦)"
                disabled
              />
              <MyTextInput
                name="otpLength"
                placeholder="Enter OTP Length"
                label="OTP Length :"
                type="number"
              />
              <MyTextInput
                name="otpIsAlphaNumeric"
                type="checkbox"
                label="Alphanumeric OTP"
                checked={values.otpIsAlphaNumeric}
              />
              <MyTextInput
                name="otpMessageTemplate"
                placeholder="Enter OTP Message Template"
                label="OTP Message Template :"
              />

              <Button
                loading={isSubmitting}
                content="Edit Configuration"
                type="submit"
                color="vk"
                icon="edit"
                className="official-form-btn"
              />
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
});
