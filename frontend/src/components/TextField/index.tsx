import { RefCallback } from "react";
import ErrorMsg from "./ErrorMsg";

interface TextFieldProps {
  id: string;
  label: string;
  placeholder?: string;
  error?: string;
  autoComplete?: string;
  inputProps?: {
    onChange?: (ev: any) => unknown;
    onBlur?: (ev: any) => unknown;
    ref?: RefCallback<HTMLInputElement>;
    name?: string;
    min?: string | number;
    max?: string | number;
    maxLength?: number;
    minLength?: number;
    pattern?: string;
    required?: boolean;
    disabled?: boolean;
  };
  type?: "password" | "text" | "tel";
}

export const TextField = (props: TextFieldProps) => {
  return (
    <div className="form-control col-start w-full max-w-xs">
      <label htmlFor={props.id}>{props.label}</label>
      <input
        id={props.id}
        name={props.label}
        type={props.type ?? "text"}
        {...(props.inputProps ?? {})}
        className="w-72 border-b"
        autoComplete={props.autoComplete ?? ""}
        placeholder={props.placeholder ?? ""}
      />
      {props.error ? <ErrorMsg>{props.error}</ErrorMsg> : null}
    </div>
  );
};
