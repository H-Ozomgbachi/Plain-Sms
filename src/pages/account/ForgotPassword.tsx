import { Form, Formik } from "formik";
import { observer } from "mobx-react-lite";
import { Link } from "react-router-dom";
import { Button } from "semantic-ui-react";
import * as Yup from "yup";
import { useStore } from "../../api/main/appStore";
import { Authentication } from "../../components/authentication/Authentication";
import MyTextInput from "../../components/inputs/MyTextInput";

export default observer(function ForgotPassword() {
  const { userAccountStore } = useStore();

  return (
    <Authentication>
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
              <Form className="ui form">
                <MyTextInput
                  name="email"
                  placeholder="Enter your email address"
                  label="Enter your email address"
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
    </Authentication>
  );
});
