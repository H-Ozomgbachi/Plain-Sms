import { Form, Formik } from "formik";
import * as Yup from "yup";
import { observer } from "mobx-react-lite";
import { AuthenticationBackground } from "../../components/account/AuthenticationBackground";
import { Button } from "semantic-ui-react";
import { useStore } from "../../api/main/appStore";
import { CustomTextInput } from "../../components/forms/custom/CustomInputs";

export default observer(function ResetPassword() {
  const { userAccountStore } = useStore();

  return (
    <AuthenticationBackground>
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
              <Form>
                <CustomTextInput
                  name="password"
                  placeholder="Enter new password"
                  label="New password"
                  type="password"
                />
                <CustomTextInput
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
    </AuthenticationBackground>
  );
});
