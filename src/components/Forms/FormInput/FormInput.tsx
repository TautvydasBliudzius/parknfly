import React, { InputHTMLAttributes } from "react";
import "./fromInput.css"

interface FormInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

const FormInput: React.FC<FormInputProps> = ({ label, ...rest }) => {
  return (
    <div id="formInput">
      <label>{label}</label>
      <br />
      <input className="form-item-input" {...rest} />
    </div>
  );
};

export default FormInput;
