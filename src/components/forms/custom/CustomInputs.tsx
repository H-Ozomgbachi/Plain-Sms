import "./CustomInputs.css";
import { useField } from "formik";

interface Props {
  children?: JSX.Element;
  id?: string;
  placeholder?: string;
  name: string;
  type?: string;
  label?: string;
  value?: any;
  disabled?: boolean;
  checked?: boolean;
}

export const CustomTextInput = (props: Props) => {
  const [field, meta] = useField(props);
  return (
    <>
      <label className="input-label">{props.label}</label>
      <input className={`text-input`} {...field} {...props} />
      {meta.touched && meta.error ? (
        <div className="input-text-error">{meta.error}</div>
      ) : null}
    </>
  );
};

export const CustomSelect = (props: Props) => {
  const [field, meta] = useField(props);
  return (
    <div>
      <label>{props.label}</label>
      <select {...field} {...props} className={`text-input`} />
      {meta.touched && meta.error ? (
        <div className="input-text-error">{meta.error}</div>
      ) : null}
    </div>
  );
};
