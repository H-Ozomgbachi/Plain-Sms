import { Form, Formik } from "formik";
import { observer } from "mobx-react-lite";
import { Link } from "react-router-dom";
import { Button } from "semantic-ui-react";
import * as Yup from "yup";
import { useStore } from "../../api/main/appStore";
import { Authentication } from "../../components/authentication/Authentication";
import {
  CustomPasswordInput,
  CustomSelect,
  CustomTextInput,
} from "../../components/forms/custom/CustomInputs";
import { CountryCodeOptions } from "../../local-data/CountryCodeOptions";
import "../page-specific-styles/Register.css";

export default observer(function Register() {
  const { userAccountStore } = useStore();

  return (
    <Authentication>
      <div className="register-form-container">
        <h2>Get Started</h2>
        <p>
          Already have an account ? <Link to={"/account/login"}>Login</Link>
        </p>
        <div className="register-form">
          <Formik
            initialValues={{
              firstName: "",
              lastName: "",
              email: "",
              password: "",
              countryCode: "",
              phone: "",
              error: null,
            }}
            onSubmit={async (values, { setErrors }) =>
              userAccountStore.register(values)
            }
            validationSchema={Yup.object({
              firstName: Yup.string().required("This field is required"),
              lastName: Yup.string().required("This field is required"),
              email: Yup.string().email().required("This field is required"),
              password: Yup.string().required(),
              countryCode: Yup.string().required("This field is required"),
              phone: Yup.string().required("This field is required"),
            })}
          >
            {({ handleSubmit, isSubmitting, isValid, dirty }) => (
              <Form>
                <CustomTextInput
                  name="firstName"
                  placeholder="Enter first name"
                  label="First Name"
                  onFocus={() =>
                    userAccountStore.setAuthenticationErrorMessage(null)
                  }
                />
                <CustomTextInput
                  name="lastName"
                  placeholder="Enter last name"
                  label="Last Name"
                  onFocus={() =>
                    userAccountStore.setAuthenticationErrorMessage(null)
                  }
                />

                <CustomTextInput
                  name="email"
                  placeholder="Enter your email"
                  label="Email"
                  type="email"
                  onFocus={() =>
                    userAccountStore.setAuthenticationErrorMessage(null)
                  }
                />

                <CustomPasswordInput
                  name="password"
                  placeholder="Enter your password"
                  label="Password"
                  onFocus={() =>
                    userAccountStore.setAuthenticationErrorMessage(null)
                  }
                />

                <div className="d-flex mb-2">
                  <CustomSelect
                    name="countryCode"
                    label="Code"
                    children={
                      <>
                        {CountryCodeOptions.map((el) => {
                          return (
                            <option value={el.value} key={el.value}>
                              {el.text}
                            </option>
                          );
                        })}
                      </>
                    }
                  />
                  <div className="flex-grow-1">
                    <CustomTextInput
                      name="phone"
                      type="tel"
                      label="Telephone"
                    />
                  </div>
                </div>

                <Button
                  loading={isSubmitting}
                  content="Register"
                  type="submit"
                  className="register-form-btn"
                />
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </Authentication>
  );
});
