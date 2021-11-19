import React, { memo, useState } from "react";
import { Field } from "formik";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import get from "lodash/get";

import IconComponent from "components/ui/IconComponent";

const InputComponent = ({
  type,
  labelClassName,
  errorClassName,
  label,
  inputClassName,
  inputName,
  iconClassName,
  setFieldValue,
  setFieldError,
  touched,
  errors,
  errorFromApi,
  clearError,
  placeholder,
  autoComplete,
  restrictInput,
  disabled
}) => {
  //
  // const checkType = () => {
  //   if(type === "email"){
  //     return "email"
  //   }else{
  //     return type === "password" ? "password" : "text"
  //   }
  // }

  const [passInputType, setPassInputType] = useState(
    type === "password" ? "password" : "text"
      // checkType()
  );
  const setShowPassword = () => {
    setPassInputType(passInputType === "password" ? "text" : "password");
  };
  const handleFocus = () => {
    if (setFieldError) {
      setFieldError(inputName, undefined);
    }
    if (clearError) {
      clearError(inputName);
    }
  };
  const handleChange = (e) => {
    if(typeof restrictInput === 'function'){
      const inputData = restrictInput(e.target.value)
      setFieldValue(inputName, inputData);
    }else{
      setFieldValue(inputName, e.target.value);
    }

  };
  const errorValue = get(errors, inputName);
  const touchedValue = get(touched, inputName);
  return (
    <>
      <label className={`input_component_label ${labelClassName}`}>
        {label}
        <br />
        <div
             className={
               type === "password" ?
               (!!errorValue || errorFromApi)
                   ? ` input_warning input_wrapper ${inputClassName}`
                   : `input_wrapper ${inputClassName}` : ''
             }
        >
          <Field
              type={passInputType}
              name={inputName}
              onChange={handleChange}
              onFocus={handleFocus}
              autoComplete={autoComplete}
              disabled={disabled}
              className={ type !== "password" ?
                (!!errorValue || errorFromApi)
                    ? ` input_warning input_component_input ${inputClassName}`
                    : `input_component_input ${inputClassName}` :  'input_component_input_psw'
              }
              placeholder={placeholder}
          />
        </div>


        {type === "password" ? (
          <IconComponent
            icon={passInputType === "password" ? faEyeSlash : faEye}
            className={`password_eye ${iconClassName}`}
            onClick={setShowPassword}
          />
        ) : null}
        {errorValue && touchedValue ? (
          <p className={`input_warning_text ${errorClassName}`}>{errorValue}</p>
        ) : null}
        {errorFromApi ? (
          <p className={`input_warning_text ${errorClassName}`}>
            {Array.isArray(errorFromApi) ? errorFromApi[0] : errorFromApi}
          </p>
        ) : null}
      </label>
    </>
  );
};

export default memo(InputComponent);
