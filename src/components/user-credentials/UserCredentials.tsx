import { Form, Formik } from "formik";
import { observer } from "mobx-react-lite";
import * as Yup from "yup";
import { Button } from "semantic-ui-react";
import { CredentialsData } from "../../api/models/userAccount";
import { useStore } from "../../api/main/appStore";
import CustomDefaultTabHeading from "../headings/CustomDefaultTabHeading";
import ModalDecisionContent from "../modal/ModalDecisionContent";
import { CustomTextInputWithButton } from "../forms/custom/CustomInputs";

interface Props {
  creds: CredentialsData | null;
}

export default observer(function UserCredentials({ creds }: Props) {
  const { userAccountStore, commonStore } = useStore();

  return (
    <div>
      <CustomDefaultTabHeading content="Api Credentials" />

      <div className="shadow-card user-profile-data">
        <Formik
          initialValues={{
            clientId: creds?.clientId,
            clientSecret: creds?.clientSecret,
            error: null,
          }}
          onSubmit={async (values, { setErrors }) => console.log(values)}
          validationSchema={Yup.object({
            clientId: Yup.string().required("This field is required"),
            clientSecret: Yup.string().required("This field is required"),
          })}
        >
          {({ handleSubmit, isSubmitting, values }) => (
            <Form>
              <CustomTextInputWithButton
                name="clientId"
                placeholder="Enter client id"
                label="Client Id :"
                value={values.clientId}
              />
              <CustomTextInputWithButton
                name="clientSecret"
                placeholder="Enter client secret"
                label="Client Secret :"
                value={values.clientSecret}
              />

              <div className="d-flex mt-3">
                <Button
                  loading={isSubmitting}
                  content="Edit Credentials"
                  type="submit"
                  className=""
                  size="tiny"
                  color="vk"
                  icon="edit"
                />
                <Button
                  type="button"
                  content="Reset Credentials"
                  size="tiny"
                  icon="sync alternate"
                  onClick={() =>
                    commonStore.setModalContent(
                      <ModalDecisionContent
                        actionName="reset your API credentials"
                        actionCallback={() =>
                          userAccountStore.resetCredentials(
                            userAccountStore.user?.id!
                          )
                        }
                      />
                    )
                  }
                />
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
});
