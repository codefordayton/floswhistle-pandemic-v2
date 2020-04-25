import { Checkbox } from "@material-ui/core";
import { withStyles } from "@material-ui/core";

export const StyledCheckbox = withStyles({
  root: {
    "&.MuiCheckbox-root": { color: "#bce0fd" },
  },
})(Checkbox);
