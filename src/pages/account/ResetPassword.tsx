import { Form, Formik } from "formik";
import * as Yup from "yup";
import { observer } from "mobx-react-lite";
import { Authentication } from "../../components/authentication/Authentication";
import MyTextInput from "../../components/inputs/MyTextInput";
import { Button } from "semantic-ui-react";
import { useStore } from "../../api/main/appStore";

export default observer(function ResetPassword() {
  const { userAccountStore } = useStore();

  return (
    <Authentication>
      <div className="login-form-container shadow-lg">
        <h2>Reset password</h2>

        <div className="login-form">
          <Formik
            initialValues={{
              token: "",
              password: "",
              confirmPassword: "",
              error: null,
            }}
            onSubmit={async (values, { setErrors }) =>
              userAccountStore.resetPassword(values)
            }
            validationSchema={Yup.object({
              token: Yup.string().required(),
              password: Yup.string().required(),
              confirmPassword: Yup.string()
                .required()
                .oneOf([Yup.ref("password"), null], "Passwords must match"),
            })}
          >
            {({ handleSubmit, isSubmitting, isValid, dirty }) => (
              <Form className="ui form">
                <MyTextInput
                  name="password"
                  placeholder="Enter new password"
                  label="New password"
                  type="password"
                />
                <MyTextInput
                  name="confirmPassword"
                  placeholder="Re-enter new password"
                  label="Confirm new password"
                  type="password"
                />

                <Button
                  loading={isSubmitting}
                  content="Submit"
                  type="submit"
                  className="login-form-btn"
                />
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </Authentication>
  );
});
