import React, { InputHTMLAttributes } from "react";


interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  className?: string;
}

const Input: React.FC<InputProps> = ({ className, ...props }) => {
  return <input className={`styled-input ${className || ""}`} {...props} />;
};

export default Input;
