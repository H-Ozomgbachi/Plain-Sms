import { Form, Formik } from "formik";
import { observer } from "mobx-react-lite";
import { Button } from "semantic-ui-react";
import * as Yup from "yup";
import { CampaignData } from "../../api/models/campaign";
import { QueryParam } from "../../api/models/shared";
import { toUTCConverter } from "../../helper-functions/sharedFunctions";
import { CustomSelect, CustomTextInput } from "../forms/custom/CustomInputs";
import "./FilterReportForm.css";

interface Props {
  campaigns: CampaignData[];
  handleSubmit: (id: string, query: QueryParam) => void;
  pageSize: number;
}

export default observer(function FilterReportForm({
  campaigns,
  handleSubmit,
  pageSize,
}: Props) {
  return (
    <div className="filter">
      <Formik
        initialValues={{
          id: "",
          pageNumber: 1,
          code: "",
          recipientNumber: "",
          startDate: new Date(),
          endDate: new Date(),
          pageSize,
        }}
        onSubmit={(values, { resetForm }) =>
          handleSubmit(values.id, {
            ...values,
            startDate: toUTCConverter(values.startDate),
            endDate: toUTCConverter(values.endDate),
          })
        }
        validationSchema={Yup.object({
          id: Yup.string().required("This field is required"),
          startDate: Yup.string().required("This field is required"),
          endDate: Yup.string().required("This field is required"),
        })}
      >
        {({ isSubmitting }) => (
          <Form>
            <div className="filter-form-container">
              <div>
                <CustomSelect
                  name="id"
                  label="Campaign"
                  type="text"
                  children={
                    <>
                      <option value="">Select a campaign</option>{" "}
                      {campaigns.map((el) => {
                        return (
                          <option value={el.uniqueId} key={el.id}>
                            {el.name}
                          </option>
                        );
                      })}
                    </>
                  }
                  required
                />
              </div>
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
