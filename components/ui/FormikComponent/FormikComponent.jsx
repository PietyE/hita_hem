import { Formik, Form, Field } from "formik";
import React from "react";


export const FormikComponent = ({ children, ...extra }) => {
    return <Formik {...extra}>{children}</Formik>;
};

export const FormikFormComponent = ({ children, ...extra }) => {
    return <Form {...extra}>{children}</Form>;
};

export const FormikFieldComponent = ({ children, ...extra }) => {
    return <Field {...extra}>{children}</Field>;
};