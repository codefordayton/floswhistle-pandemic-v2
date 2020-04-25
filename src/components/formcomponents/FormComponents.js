import React from "react";
import { StyledFormControl } from "../formcontrollabel/StyledFormControl";
import { StyledCheckbox } from "../checkbox/StyledCheckbox";
import { StyledRadio } from "../radio/StyledRadio";
import { useField } from "formik";

export const MyCheckbox = ({ label, ...props }) => {
  const [field] = useField(props);
  return (
    <StyledFormControl {...field} control={<StyledCheckbox />} label={label} />
  );
};

export const MyRadio = ({ label, ...props }) => {
  const [field] = useField(props);
  return (
    <StyledFormControl {...field} control={<StyledRadio />} label={label} />
  );
};
