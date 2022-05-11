import { Form, Formik } from "formik";
import { observer } from "mobx-react-lite";
import { Button } from "semantic-ui-react";
import * as Yup from "yup";
import { useStore } from "../../api/main/appStore";
import { UserData } from "../../api/models/userAccount";
import { NairaFormatter } from "../../helper-functions/sharedFunctions";
import { CustomTextInput } from "../forms/custom/CustomInputs";
import CustomDefaultTabHeading from "../headings/CustomDefaultTabHeading";
import "./UserProfile.css";

interface Props {
  user: UserData | null;
}

export default observer(function UserProfile({ user }: Props) {
  const { userAccountStore } = useStore();

  if (user === null) return <></>;
  return (
    <div>
      <CustomDefaultTabHeading content="My account" />

      <div className="d-inline-block float-end p-2 bg-success text-white shadow-card ">
        Balance : {NairaFormatter(user.balance)}
      </div>

      <div className="user-profile-data shadow-card">
        <Formik
          initialValues={{
            userId: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            countryCode: user.countryCode,
            phone: user.phone,
            error: null,
          }}
          onSubmit={async (values, { setErrors }) =>
            userAccountStore.update(values)
          }
          validationSchema={Yup.object({
            firstName: Yup.string().required("This field is required"),
            lastName: Yup.string().required("This field is required"),
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
              />
              <CustomTextInput
                name="lastName"
                placeholder="Enter last name"
                label="Last Name"
              />

              <CustomTextInput
                name="email"
                placeholder="Enter your email"
                label="Email"
                type="email"
                disabled
              />
              <CustomTextInput
                name="countryCode"
                placeholder="Enter country code"
                label="Country Code"
              />
              <CustomTextInput
                name="phone"
                placeholder="Enter your phone number"
                label="Phone"
                type="tel"
              />

              <Button
                loading={isSubmitting}
                content="Save Profile"
                type="submit"
                color="vk"
                icon="edit"
                className="official-form-btn"
              />
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
});
