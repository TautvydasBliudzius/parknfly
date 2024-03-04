import React, { InputHTMLAttributes } from "react";
import "./fromInput.css";

interface FormInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  errorMessage?: string;
}

const FormInput: React.FC<FormInputProps> = ({
  label,
  errorMessage,
  ...rest
}) => {
  return (
    <div id="formInput">
      <label>{label}</label>
      <br />
      <input
        className="form-item-input"
        required
        {...rest}
      />
      {errorMessage && <span className="error-message">{errorMessage}</span>}
    </div>
  );
};

export default FormInput;
