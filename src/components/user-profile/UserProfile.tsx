import { Form, Formik } from "formik";
import { observer } from "mobx-react-lite";
import { Button } from "semantic-ui-react";
import * as Yup from "yup";
import { UserData } from "../../api/models/userAccount";
import MyTextInput from "../inputs/MyTextInput";
import "./UserProfile.css";

interface Props {
  user: UserData | null;
}

export default observer(function UserProfile({ user }: Props) {
  if (user === null) return <></>;
  return (
    <div>
      <div className="user-profile-header">
        <h2 className="user-profile-header-title"> My account</h2>
      </div>

      <div className="user-profile-data">
        <Formik
          initialValues={{
            firstName: user?.firstName,
            lastName: user?.lastName,
            email: user?.email,
            countryCode: user?.countryCode,
            phone: user?.phone,
            error: null,
          }}
          onSubmit={async (values, { setErrors }) => console.log(values)}
          validationSchema={Yup.object({
            firstName: Yup.string().required("This field is required"),
            lastName: Yup.string().required("This field is required"),
            email: Yup.string().email().required("This field is required"),
            countryCode: Yup.string().required("This field is required"),
            phone: Yup.string().required("This field is required"),
          })}
        >
          {({ handleSubmit, isSubmitting, isValid, dirty }) => (
            <Form className="ui form">
              <MyTextInput
                name="firstName"
                placeholder="Enter first name"
                label="First Name"
              />
              <MyTextInput
                name="lastName"
                placeholder="Enter last name"
                label="Last Name"
              />

              <MyTextInput
                name="email"
                placeholder="Enter your email"
                label="Email"
                disabled
              />
              <MyTextInput
                name="countryCode"
                placeholder="Enter country code"
                label="Country Code"
              />
              <MyTextInput
                name="phone"
                placeholder="Enter your phone number"
                label="Phone"
              />

              <Button
                loading={isSubmitting}
                content="Edit Profile"
                type="submit"
                className="register-form-btn"
              />
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
});
