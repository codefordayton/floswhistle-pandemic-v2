import React from "react";
import { StyledFormControl } from "../formcontrollabel/StyledFormControl";
import { StyledLegend } from "../legend/StyledLegend";
import { useField } from "formik";
import { Checkbox } from "@material-ui/core";
import { withStyles } from "@material-ui/core";
import "./MyCheckboxGroup.css";

export const StyledCheckbox = withStyles({
  root: {
    "&.MuiCheckbox-root": { color: "#bce0fd" },
  },
})(Checkbox);

const MyCheckbox = ({ label, ...props }) => {
  const [field] = useField(props);
  return (
    <StyledFormControl {...field} control={<StyledCheckbox />} label={label} />
  );
};

export const MyCheckboxGroup = ({ options, legend, name }) => {
  return (
    <div className="MyCheckboxGroup">
      <StyledLegend component="legend">{legend}</StyledLegend>
      {options.map((option) => (
        <MyCheckbox key={option.name} name={option.name} label={option.label} />
      ))}
    </div>
  );
};
