import { Form, Formik } from "formik";
import { observer } from "mobx-react-lite";
import { Button } from "semantic-ui-react";
import * as Yup from "yup";
import { useStore } from "../../api/main/appStore";
import {
  addMonths,
  toUTCConverter,
} from "../../helper-functions/sharedFunctions";
import {
  CustomDatePicker,
  CustomTextInput,
} from "../forms/custom/CustomInputs";
import "./FilterReportForm.css";

export default observer(function FilterOtpForm() {
  const { reportsStore, userAccountStore } = useStore();

  if (userAccountStore.user === null) return <></>;

  return (
    <div className="filter">
      <Formik
        initialValues={{
          id: userAccountStore.user.id,
          pageNumber: 1,
          code: "",
          recipientNumber: "",
          startDate: addMonths(-1),
          endDate: addMonths(0),
          pageSize: reportsStore.otpPageSize,
        }}
        onSubmit={(values, { resetForm }) =>
          reportsStore.getOtpMessages(values.id, {
            ...values,
            startDate: toUTCConverter(values.startDate),
            endDate: toUTCConverter(values.endDate),
          })
        }
        validationSchema={Yup.object({
          startDate: Yup.string().required("This field is required"),
          endDate: Yup.string().required("This field is required"),
        })}
      >
        {({ isSubmitting }) => (
          <Form>
            <div className="row">
              <div className="col-md-4">
                <CustomDatePicker
                  name="startDate"
                  label="Start Date"
                  placeholder="End start date"
                  required
                />
              </div>
              <div className="col-md-4">
                <CustomDatePicker
                  name="endDate"
                  label="End Date"
                  placeholder="Enter end date"
                  required
                />
              </div>
              <div className="col-md-4">
                <CustomTextInput
                  name="recipientNumber"
                  label="Recipient no."
                  type="text"
                  placeholder="Enter recipient number"
                />
              </div>
            </div>

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
  );
});
