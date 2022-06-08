import { Form, Formik } from "formik";
import * as Yup from "yup";
import { observer } from "mobx-react-lite";
import { AuthenticationBackground } from "../../components/account/AuthenticationBackground";
import { Button } from "semantic-ui-react";
import { useStore } from "../../api/main/appStore";
import { CustomTextInput } from "../../components/forms/custom/CustomInputs";
import { Link, useSearchParams } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";
import { customHistory } from "../..";

export default observer(function ResetPassword() {
  const { userAccountStore } = useStore();

  const [searchParam] = useSearchParams();
  const [receivedToken, setReceivedToken] = useState("");

  useEffect(() => {
    const token = searchParam.get("token");

    if (token) {
      setReceivedToken(token);
    } else {
      customHistory.push("/account/forgot-password");
    }
  }, [searchParam]);

  return (
    <AuthenticationBackground>
      <div className="login-form-container shadow-lg">
        <h2>Reset password</h2>

        <div className="login-form">
          <Formik
            initialValues={{
              password: "",
              confirmPassword: "",
              error: null,
            }}
            onSubmit={async (values, { setErrors }) =>
              userAccountStore.resetPassword({
                ...values,
                token: receivedToken,
              })
            }
            validationSchema={Yup.object({
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
