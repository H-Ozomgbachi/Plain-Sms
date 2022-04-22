import "./css/MyInput.css";
import { useField } from "formik";
import { Form } from "semantic-ui-react";

interface Props {
  placeholder?: string;
  name: string;
  type?: string;
  label?: string;
  value?: any;
  disabled?: boolean;
  onFocus?: () => void;
  checked?: boolean;
}

export function MyTextArea(props: Props) {
  const [field, meta] = useField(props.name);

  return (
    <Form.Field error={meta.touched && !!meta.error}>
      <label className="input-text-label"> {props.label} </label>
      <textarea {...field} {...props} autoComplete="off" />
      {meta.touched && meta.error ? (
        <span className="error-label">{meta.error}</span>
      ) : null}
    </Form.Field>
  );
}

export default function MyTextInput(props: Props) {
  const [field, meta] = useField(props.name);

  return (
    <Form.Field error={meta.touched && !!meta.error}>
      <label className="input-text-label"> {props.label} </label>
      <input
        {...field}
        {...props}
        autoComplete="off"
        onFocus={props.onFocus}
        checked={props.checked}
      />
      {meta.touched && meta.error ? (
        <span className="error-label">* {meta.error}</span>
      ) : null}
    </Form.Field>
  );
}
