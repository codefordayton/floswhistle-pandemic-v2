import React from "react";
import { StyledFormControl } from "../formcontrollabel/StyledFormControl";
import { StyledLegend } from "../legend/StyledLegend";
import { RadioGroup } from "@material-ui/core";
import { Radio } from "@material-ui/core";
import { withStyles } from "@material-ui/core";

export const StyledRadio = withStyles({
  root: {
    "&.MuiButtonBase-root": { color: "#bce0fd" },
  },
})(Radio);

export const MyRadioGroup = ({
  field,
  name,
  options,
  labels,
  legend,
  ...props
}) => {
  return (
    <div>
      <StyledLegend component="legend">{legend}</StyledLegend>
      <RadioGroup {...field} {...props} name={name}>
        {options.map((option) => (
          <StyledFormControl
            key={option.value}
            value={option.value}
            control={<StyledRadio />}
            label={option.label}
          />
        ))}
      </RadioGroup>
    </div>
  );
};
