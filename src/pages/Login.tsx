import { Form, Formik } from "formik";
import { observer } from "mobx-react-lite";
import { Link } from "react-router-dom";
import { Button } from "semantic-ui-react";
import * as Yup from "yup";
import { useStore } from "../api/main/appStore";
import {
  Authentication,
  AuthenticationError,
} from "../components/authentication/Authentication";
import MyTextInput from "../components/inputs/MyTextInput";
import "./css/Login.css";

export default observer(function Login() {
  const { userAccountStore } = useStore();

  return (
    <Authentication>
      <div className="login-form-container shadow-lg">
        {userAccountStore.authenticationErrorMessage ? (
          <AuthenticationError
            message={userAccountStore.authenticationErrorMessage}
          />
        ) : null}

        <h2>Login to your account</h2>

        <div className="login-form">
          <Formik
            initialValues={{
              username: "",
              password: "",
              error: null,
            }}
            onSubmit={async (values, { setErrors }) =>
              userAccountStore.login(values)
            }
            validationSchema={Yup.object({
              username: Yup.string().email().required(),
              password: Yup.string().required(),
            })}
          >
            {({ handleSubmit, isSubmitting, isValid, dirty }) => (
              <Form className="ui form">
                <MyTextInput
                  name="username"
                  placeholder="Enter username"
                  label={<span className="login-form-label">Username</span>}
                  onFocus={() =>
                    userAccountStore.setAuthenticationErrorMessage(null)
                  }
                />
                <MyTextInput
                  name="password"
                  type="password"
                  placeholder="Enter your password"
                  label={<span className="login-form-label">Password</span>}
                  onFocus={() =>
                    userAccountStore.setAuthenticationErrorMessage(null)
                  }
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

          <div className="d-flex justify-content-between mt-2">
            <Link to={"/account/register"} className="login-form-base-links">
              {" "}
              Register{" "}
            </Link>

            <Link
              to={"/account/forgot-password"}
              className="login-form-base-links"
            >
              Forgot Password ?
            </Link>
          </div>
        </div>
      </div>
    </Authentication>
  );
});
