import React from "react";
import { FormControlLabel, Checkbox, Radio } from "@material-ui/core";
import { useField } from "formik";

export const MyCheckbox = ({ label, ...props }) => {
  const [field] = useField(props);
  return <FormControlLabel {...field} control={<Checkbox />} label={label} />;
};

export const MyRadio = ({ label, ...props }) => {
  const [field] = useField(props);
  return <FormControlLabel {...field} control={<Radio />} label={label} />;
};
