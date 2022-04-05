import "./css/MyInput.css";
import { useField } from "formik";
import { Form } from "semantic-ui-react";

interface Props {
  placeholder?: string;
  name: string;
  type?: string;
  label?: string;
  value?: string;
  disabled?: boolean;
  onFocus?: () => void;
}

export function MyTextTexArea(props: Props) {
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
      <input {...field} {...props} autoComplete="off" onFocus={props.onFocus} />
      {meta.touched && meta.error ? (
        <span className="error-label">* {meta.error}</span>
      ) : null}
    </Form.Field>
  );
}
