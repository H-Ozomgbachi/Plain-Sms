import "./CustomInputs.css";
import { useField } from "formik";
import { useState } from "react";
import { Icon } from "semantic-ui-react";

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
  onFocus?: () => void;
}

export const CustomTextInput = (props: Props) => {
  const [field, meta] = useField(props);
  return (
    <div className="mb-2">
      <label className="input-label">
        {props.label}{" "}
        {props.required ? <span className="text-danger">*</span> : null}
      </label>

      <input
        className={`text-input`}
        {...field}
        {...props}
        onFocus={props.onFocus}
      />
      {meta.touched && meta.error ? (
        <div className="input-text-error">{meta.error}</div>
      ) : null}
    </div>
  );
};

export const CustomTextArea = (props: Props) => {
  const [field, meta] = useField(props);
  return (
    <div className="mb-2">
      <label className="input-label">
        {props.label}{" "}
        {props.required ? <span className="text-danger">*</span> : null}
      </label>

      <textarea
        rows={8}
        className={`text-area`}
        {...field}
        {...props}
        onFocus={props.onFocus}
      />
      {meta.touched && meta.error ? (
        <div className="input-text-error">{meta.error}</div>
      ) : null}
    </div>
  );
};

export const CustomSelect = (props: Props) => {
  const [field, meta] = useField(props);
  return (
    <div className="mb-2">
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
    <div className="mb-2">
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

export const CustomCheckboxInput = (props: Props) => {
  const [field] = useField(props);
  return (
    <div className="checkbox-style">
      <input {...field} {...props} onFocus={props.onFocus} type="checkbox" />{" "}
      <label>{props.label}</label>
    </div>
  );
};

export const CustomPasswordInput = (props: Props) => {
  const [field, meta] = useField(props);
  const [isVisible, setIsVisible] = useState(false);
  return (
    <div className="mb-2">
      <label className="input-label">{props.label}</label>
      <div className="input-with-btn-box">
        <input
          className={`text-input-with-btn`}
          {...field}
          {...props}
          type={isVisible ? "text" : "password"}
        />
        <button
          className={`input-btn`}
          type="button"
          onClick={(e) => setIsVisible(!isVisible)}
        >
          {isVisible ? <Icon name="eye slash" /> : <Icon name="eye" />}
        </button>
      </div>
      {meta.touched && meta.error ? (
        <div className="input-text-error">{meta.error}</div>
      ) : null}
    </div>
  );
};
