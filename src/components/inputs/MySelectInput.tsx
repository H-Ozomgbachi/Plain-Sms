import { ReactJSXElement } from "@emotion/react/types/jsx-namespace";
import { useField } from "formik";
import { Form, Label, Select } from "semantic-ui-react";
import "./css/MyInput.css";

interface Props {
  placeholder: string;
  name: string;
  options: any;
  label?: string | ReactJSXElement;
  onOpen?: () => void;
  onClose?: () => void;
  required?: boolean;
}

export default function MySelectInput(props: Props) {
  const [field, meta, helpers] = useField(props.name);

  return (
    <Form.Field error={meta.touched && !!meta.error}>
      <label> {props.label} </label>
      <Select
        className="p-1"
        clearable
        options={props.options}
        value={field.value || null}
        onChange={(e, d) => helpers.setValue(d.value)}
        onBlur={() => helpers.setTouched(true)}
        placeholder={props.placeholder}
        onOpen={props.onOpen}
        onClose={props.onClose}
      />
      {meta.touched && meta.error ? (
        <span className="error-label">{meta.error}</span>
      ) : null}
    </Form.Field>
  );
}

export function MyMultipleSelectInput(props: Props) {
  const [field, meta, helpers] = useField(props.name);

  return (
    <Form.Field error={meta.touched && !!meta.error}>
      <label> {props.label} </label>
      <Select
        clearable
        multiple
        options={props.options}
        value={field.value || null}
        onChange={(e, d) => helpers.setValue(d.value)}
        onBlur={() => helpers.setTouched(true)}
        placeholder={props.placeholder}
        onOpen={props.onOpen}
        onClose={props.onClose}
      />
      {meta.touched && meta.error ? (
        <Label basic color="red">
          {meta.error}
        </Label>
      ) : null}
    </Form.Field>
  );
}
