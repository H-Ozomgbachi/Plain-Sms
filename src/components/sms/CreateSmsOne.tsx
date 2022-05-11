import { Form, Formik } from "formik";
import { Button } from "semantic-ui-react";
import * as Yup from "yup";
import * as xlsx from "xlsx";
import { useState } from "react";
import { RecipientsOnly } from "../../api/models/sms";
import { observer } from "mobx-react-lite";
import { useStore } from "../../api/main/appStore";
import { processRecipientsArray } from "../../helper-functions/smsHelperMethods";
import { CampaignData } from "../../api/models/campaign";
import { toUTCConverter } from "../../helper-functions/sharedFunctions";
import {
  CustomSelect,
  CustomTextArea,
  CustomTextInput,
} from "../forms/custom/CustomInputs";

interface Props {
  campaigns: CampaignData[];
}

export default observer(function CreateSmsOne({ campaigns }: Props) {
  const [uploadedRecipients, setUploadedRecipients] = useState<
    RecipientsOnly[]
  >([]);
  const { smsStore } = useStore();

  const INITIAL_VALUES = {
    message: "",
    sender: "",
    schduleDateUTC: new Date(),
    priority: 0,
    campaignId: "",
  };

  const readUploadFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files) {
      const reader = new FileReader();
      reader.onload = (e: ProgressEvent<FileReader>) => {
        const data = e.target?.result;
        const workbook = xlsx.read(data, { type: "array" });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const json = xlsx.utils.sheet_to_json(worksheet) as RecipientsOnly[];
        setUploadedRecipients(json);
      };
      reader.readAsArrayBuffer(e.target.files[0]);
    }
  };

  return (
    <div className="create-sms-container shadow-card">
      <Formik
        initialValues={INITIAL_VALUES}
        onSubmit={async (values, { setErrors, resetForm }) =>
          smsStore
            .sendOneMessageToMany({
              ...values,
              priority: +values.priority,
              schduleDateUTC: toUTCConverter(values.schduleDateUTC),
              recipients: processRecipientsArray(uploadedRecipients),
            })
            .finally(() => resetForm({ values: INITIAL_VALUES }))
        }
        validationSchema={Yup.object({
          message: Yup.string().required("This field is required"),
          sender: Yup.string().required("This field is required"),
          campaignId: Yup.string().required("please select a campaign"),
        })}
      >
        {({ handleSubmit, isSubmitting, isValid, dirty, values }) => (
          <Form className="">
            <CustomSelect
              name="campaignId"
              label="Select Campaign"
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

            <CustomTextArea
              name="message"
              placeholder="Write your message here..."
              label="Message"
            />

            <CustomSelect
              name="sender"
              label="Sender Name"
              placeholder="example: PlainSMS"
              type="text"
              children={
                <>
                  <option value="PLAINSMS">PLAINSMS</option>
                  <option value="PLAINOTP">PLAINOTP</option>
                  <option value="GUESTLIST">GUESTLIST</option>
                </>
              }
              required
            />

            <div className="mb-2">
              <label className="input-text-label">Recipients</label>
              <input
                name="recipients"
                type="file"
                onChange={readUploadFile}
                accept=".csv,.xlsx,.xls"
                className=" form-control"
              />
            </div>

            <CustomSelect
              name="priority"
              label="Priority"
              type="text"
              children={
                <>
                  <option value="0">Regular</option>
                  <option value="1">High</option>
                </>
              }
              required
            />

            <CustomTextInput
              name="schduleDateUTC"
              label="Schedule Date"
              type="datetime-local"
            />

            <Button
              loading={isSubmitting}
              icon="send"
              content="Send SMS"
              type="submit"
              color="vk"
              className="official-form-btn"
            />
          </Form>
        )}
      </Formik>
    </div>
  );
});
