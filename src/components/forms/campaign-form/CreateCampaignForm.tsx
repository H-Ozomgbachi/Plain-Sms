import { Form, Formik } from "formik";
import { Button } from "semantic-ui-react";
import { useStore } from "../../../api/main/appStore";
import MyTextInput from "../../inputs/MyTextInput";
import * as Yup from "yup";
import { CampaignData } from "../../../api/models/campaign";
import { observer } from "mobx-react-lite";

interface Props {
  currentData?: CampaignData;
  closeEdit?: () => void;
}

export default observer(function CreateCampaignForm({
  currentData,
  closeEdit,
}: Props) {
  const { campaignStore, userAccountStore } = useStore();

  const INITIAL_VALUES = {
    name: currentData?.name ?? "",
    callbackUrl: currentData?.callbackUrl ?? "",
    userId: userAccountStore.user?.id!,
    error: null,
  };

  return (
    <div>
      {currentData && (
        <h5 className="text-center text-secondary">Edit Campaign</h5>
      )}
      <Formik
        initialValues={INITIAL_VALUES}
        onSubmit={async (values, { setErrors, resetForm }) =>
          currentData
            ? campaignStore
                .editCampaign({ ...values, id: currentData.uniqueId })
                .finally(closeEdit)
            : campaignStore
                .createCampaign(values)
                .finally(() => resetForm({ values: INITIAL_VALUES }))
        }
        validationSchema={Yup.object({
          name: Yup.string().required("This field is required"),
          callbackUrl: Yup.string().required("This field is required"),
        })}
      >
        {({ handleSubmit, isSubmitting, isValid, dirty }) => (
          <Form className="ui form">
            <MyTextInput
              name="name"
              placeholder="Enter campaign name"
              label="Campaign Name"
            />
            <MyTextInput
              name="callbackUrl"
              placeholder="Enter url"
              label="Callback Url"
            />

            <Button
              loading={isSubmitting}
              content={currentData ? "Update Campaign" : "Create New Campaign"}
              icon="pencil"
              color="vk"
              type="submit"
            />
            {currentData && <Button content="Cancel" onClick={closeEdit} />}
          </Form>
        )}
      </Formik>
    </div>
  );
});
