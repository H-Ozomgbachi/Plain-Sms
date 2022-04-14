import { Form, Formik } from "formik";
import { observer } from "mobx-react-lite";
import * as Yup from "yup";
import { Button } from "semantic-ui-react";
import { CredentialsData } from "../../api/models/userAccount";
import MyTextInput from "../inputs/MyTextInput";
import { useStore } from "../../api/main/appStore";
import CustomDefaultTabHeading from "../headings/CustomDefaultTabHeading";

interface Props {
  creds: CredentialsData | null;
}

export default observer(function UserCredentials({ creds }: Props) {
  const { userAccountStore } = useStore();

  return (
    <div>
      <CustomDefaultTabHeading content="Api Credentials" />

      <div className="user-profile-data">
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
          {({ handleSubmit, isSubmitting }) => (
            <Form className="ui form">
              <MyTextInput
                name="clientId"
                placeholder="Enter client id"
                label="Client Id"
                disabled
              />
              <MyTextInput
                name="clientSecret"
                placeholder="Enter client secret"
                label="Client Secret"
                disabled
              />

              <div className="d-flex">
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
                    userAccountStore.resetCredentials(
                      userAccountStore.user?.id!
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
