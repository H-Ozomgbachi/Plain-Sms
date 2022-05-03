import "./CustomInputs.css";
import { useField } from "formik";
import { useState } from "react";

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
  required?: boolean;
}

export const CustomTextInput = (props: Props) => {
  const [field, meta] = useField(props);
  return (
    <div>
      <label className="input-label">
        {props.label}{" "}
        {props.required ? <span className="text-danger">*</span> : null}
      </label>

      <input className={`text-input`} {...field} {...props} />
      {meta.touched && meta.error ? (
        <div className="input-text-error">{meta.error}</div>
      ) : null}
    </div>
  );
};

export const CustomSelect = (props: Props) => {
  const [field, meta] = useField(props);
  return (
    <div>
      <label>
        {props.label}{" "}
        {props.required ? <span className="text-danger">*</span> : null}
      </label>
      <select {...field} {...props} className={`text-input`} />
      {meta.touched && meta.error ? (
        <div className="input-text-error">{meta.error}</div>
      ) : null}
    </div>
  );
};

export const CustomTextInputWithButton = (props: Props) => {
  const [field, meta] = useField(props);
  const [btnTitle, setBtnTitle] = useState("copy");
  const [isCopied, setIsCopied] = useState(false);
  return (
    <div>
      <label className="input-label">{props.label}</label>
      <div className="input-with-btn-box">
        <input className={`text-input-with-btn`} {...field} {...props} />
        <button
          className={`input-btn ${isCopied ? "is-copied" : "done-copy"}`}
          type="button"
          onClick={(e) => {
            navigator.clipboard.writeText(props.value);
            setIsCopied(true);
            setBtnTitle("copied");
            setTimeout(() => {
              setBtnTitle("copy");
              setIsCopied(false);
            }, 1500);
          }}
        >
          {btnTitle}
        </button>
      </div>
      {meta.touched && meta.error ? (
        <div className="input-text-error">{meta.error}</div>
      ) : null}
    </div>
  );
};
