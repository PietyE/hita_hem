import React, {memo, useState} from 'react';
import { Field } from "formik";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import get from "lodash/get";

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
}) => {
  const [passInputType, setPassInputType] = useState(
    type === "password" ? "password" : "text"
  );

  const setShowPassword = () => {
    setPassInputType(passInputType === "password" ? "text" : "password");
  };
  const handleFocus = () => {
    if(setFieldError){
      setFieldError(inputName, undefined)
    }
    if(clearError){
      clearError(inputName)
    }
  }
  const handleChange = (e) => {
    setFieldValue(inputName, e.target.value);
  };
  const errorValue = get(errors, inputName);
  const touchedValue = get(touched, inputName);

  return (
    <>
      <label className={`input_component_label ${labelClassName}`}>
        {label}
        <br />
        <Field
          type={passInputType}
          name={inputName}
          onChange={handleChange}
          onFocus={handleFocus}
          autoComplete={autoComplete}
          className={
            !!errorValue
              ? ` input_warning input_component_input ${inputClassName}`
              : `input_component_input ${inputClassName}`
          }
          placeholder={placeholder}
        />

        {type === "password" ? (
          <>
            {passInputType === "password" && (
              <FontAwesomeIcon
                icon={faEyeSlash}
                className={`password_eye ${iconClassName}`}
                onClick={setShowPassword}
              />
            )}
            {passInputType === "text" && (
              <FontAwesomeIcon
                icon={faEye}
                className={`password_eye ${iconClassName}`}
                onClick={setShowPassword}
              />
            )}
          </>
        ) : null}
        {errorValue && touchedValue ? (
          <p className={`input_warning_text ${errorClassName}`}>{errorValue}</p>
        ) : null}
        {errorFromApi ?
            <p className= {`input_warning_text ${errorClassName}`}>{ Array.isArray(errorFromApi)?errorFromApi[0]:errorFromApi}</p>
            : null}
      </label>
    </>
  );
};

export default memo(InputComponent);
