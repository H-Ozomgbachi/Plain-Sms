import { Form, Formik } from "formik";
import { Button } from "semantic-ui-react";
import * as Yup from "yup";
import * as xlsx from "xlsx";
import { PriorityOptions } from "../../local-data/smsFeature";
import MySelectInput from "../inputs/MySelectInput";
import MyTextInput, { MyTextArea } from "../inputs/MyTextInput";
import { useState } from "react";
import { RecipientsOnly } from "../../api/models/sms";
import { observer } from "mobx-react-lite";
import { useStore } from "../../api/main/appStore";
import { processRecipientsArray } from "../../function-library/helper-functions/smsHelperMethods";
import { campaignOptionsBuilder } from "../../function-library/helper-functions/campaignHelperMethod";
import { CampaignData } from "../../api/models/campaign";

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
    schduleDateUTC: "",
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
    <div className="create-sms-container">
      <Formik
        initialValues={INITIAL_VALUES}
        onSubmit={async (values, { setErrors, resetForm }) =>
          smsStore
            .sendOneMessageToMany({
              ...values,
              priority: +values.priority,
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
          <Form className="ui form">
            <MySelectInput
              name="campaignId"
              label="Select Campaign"
              options={campaignOptionsBuilder(campaigns)}
              placeholder="Choose a campaign"
            />

            <MyTextArea
              name="message"
              placeholder="Write your message here..."
              label="Message"
            />

            <MyTextInput
              name="sender"
              placeholder="example: PlainSMS"
              label="Sender Name"
            />

            <div className="form-group">
              <label className="input-text-label">Recipients</label>
              <input
                name="recipients"
                type="file"
                onChange={readUploadFile}
                accept=".csv,.xlsx,.xls"
              />
            </div>

            <MySelectInput
              name="priority"
              label="Priority"
              options={PriorityOptions}
              placeholder="Select message priority"
            />

            <MyTextInput
              name="schduleDateUTC"
              label="Schedule Date"
              type="date"
            />

            <Button
              loading={isSubmitting}
              icon="send"
              content="Send SMS"
              type="submit"
              color="vk"
            />
          </Form>
        )}
      </Formik>
    </div>
  );
});
