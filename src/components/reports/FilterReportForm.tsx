import { Form, Formik } from "formik";
import { observer } from "mobx-react-lite";
import { Button } from "semantic-ui-react";
import * as Yup from "yup";
import { CampaignData } from "../../api/models/campaign";
import { QueryParam } from "../../api/models/shared";
import { CustomSelect, CustomTextInput } from "../forms/custom/CustomInputs";
import "./FilterReportForm.css";

interface Props {
  campaigns: CampaignData[];
  handleSubmit: (id: string, query: QueryParam) => void;
}

export default observer(function FilterReportForm({
  campaigns,
  handleSubmit,
}: Props) {
  return (
    <div className="filter">
      <Formik
        initialValues={{
          id: "",
          pageNumber: 1,
          code: "",
          recipientNumber: "",
          startDate: "",
          endDate: "",
          pageSize: 10,
        }}
        onSubmit={(values, { resetForm }) => handleSubmit(values.id, values)}
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
                />
              </div>
              <div>
                <CustomTextInput
                  name="startDate"
                  label="Start Date"
                  type="date"
                />
              </div>
              <div>
                <CustomTextInput name="endDate" label="End Date" type="date" />
              </div>
            </div>

            <Button
              loading={isSubmitting}
              content="Continue"
              className="filter-form-btn"
              color="vk"
              type="submit"
            />
          </Form>
        )}
      </Formik>
    </div>
  );
});
