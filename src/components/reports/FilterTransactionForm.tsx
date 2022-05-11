import { Form, Formik } from "formik";
import { observer } from "mobx-react-lite";
import { Button } from "semantic-ui-react";
import * as Yup from "yup";
import { useStore } from "../../api/main/appStore";
import { QueryParam } from "../../api/models/shared";
import { toUTCConverter } from "../../helper-functions/sharedFunctions";
import { CustomSelect, CustomTextInput } from "../forms/custom/CustomInputs";
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
          startDate: new Date(),
          endDate: new Date(),
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
            <div className="filter-form-container">
              {!isOnlyDeposit && (
                <div>
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
              <div>
                <CustomTextInput
                  name="startDate"
                  label="Start Date"
                  type="datetime-local"
                  placeholder="Enter start date"
                  required
                />
              </div>
              <div>
                <CustomTextInput
                  name="endDate"
                  label="End Date"
                  type="datetime-local"
                  placeholder="Enter end date"
                  required
                />
              </div>
              <div>
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
