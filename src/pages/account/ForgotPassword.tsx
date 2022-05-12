import { Form, Formik } from "formik";
import { observer } from "mobx-react-lite";
import { Link } from "react-router-dom";
import { Button } from "semantic-ui-react";
import * as Yup from "yup";
import { useStore } from "../../api/main/appStore";
import { AuthenticationBackground } from "../../components/account/AuthenticationBackground";
import { CustomTextInput } from "../../components/forms/custom/CustomInputs";

export default observer(function ForgotPassword() {
  const { userAccountStore } = useStore();

  return (
    <AuthenticationBackground>
      <div className="login-form-container shadow-lg">
        <h2>Forgot your password ? </h2>

        <div className="login-form">
          <Formik
            initialValues={{
              email: "",
              error: null,
            }}
            onSubmit={async (values, { setErrors }) =>
              userAccountStore.forgotPassword(values)
            }
            validationSchema={Yup.object({
              email: Yup.string().email().required(),
            })}
          >
            {({ handleSubmit, isSubmitting, isValid, dirty }) => (
              <Form>
                <CustomTextInput
                  name="email"
                  placeholder="Enter your email address"
                  label="Enter your email address"
                  type="email"
                />

                <Button
                  loading={isSubmitting}
                  content="Proceed"
                  type="submit"
                  className="login-form-btn"
                />
              </Form>
            )}
          </Formik>

          <div className="d-flex justify-content-between mt-2">
            <Link to={"/account/login"} className="login-form-base-links">
              Return to Login
            </Link>
          </div>
        </div>
      </div>
    </AuthenticationBackground>
  );
});
