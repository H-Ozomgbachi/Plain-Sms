import { Form, Formik } from "formik";
import { observer } from "mobx-react-lite";
import { Button } from "semantic-ui-react";
import * as Yup from "yup";
import { useStore } from "../../api/main/appStore";
import { QueryParam } from "../../api/models/shared";
import {
  addMonths,
  toUTCConverter,
} from "../../helper-functions/sharedFunctions";
import {
  CustomDatePicker,
  CustomSelect,
  CustomTextInput,
} from "../forms/custom/CustomInputs";
import "./FilterReportForm.css";

interface Props {
  isOnlyDeposit: boolean;
  handleSubmit: (id: string, query: QueryParam) => void;
}

export default observer(function FilterTransactionForm({
  isOnlyDeposit,
  handleSubmit,
}: Props) {
  const { userAccountStore, reportsStore } = useStore();

  if (userAccountStore.user === null) return <></>;

  return (
    <div className="filter">
      <Formik
        initialValues={{
          id: userAccountStore.user.id,
          pageNumber: 1,
          transactionId: "",
          type: isOnlyDeposit ? "3" : "",
          startDate: addMonths(-1),
          endDate: addMonths(0),
          pageSize: reportsStore.transactionPageSize,
        }}
        onSubmit={(values, { resetForm }) =>
          handleSubmit(values.id, {
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
              {!isOnlyDeposit && (
                <div className="col-md-3">
                  <CustomSelect
                    name="type"
                    label="Enter transaction type"
                    type="text"
                    children={
                      <>
                        <option value="">All transactions</option>
                        <option value="3">Deposits</option>
                        <option value="2">OTP</option>
                        <option value="1">SMS</option>
                      </>
                    }
                  />
                </div>
              )}
              <div className="col-md-3">
                <CustomDatePicker
                  name="startDate"
                  label="Start Date"
                  placeholder="Enter start date"
                  required
                />
              </div>
              <div className="col-md-3">
                <CustomDatePicker
                  name="endDate"
                  label="End Date"
                  placeholder="Enter end date"
                  required
                />
              </div>
              <div className="col-md-3">
                <CustomTextInput
                  name="transactionId"
                  label="Transaction Id"
                  type="text"
                  placeholder="Enter transaction id"
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
