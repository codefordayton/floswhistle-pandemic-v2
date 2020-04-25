import { Radio } from "@material-ui/core";
import { withStyles } from "@material-ui/core";

export const StyledRadio = withStyles({
  root: {
    "&.MuiButtonBase-root": { color: "#bce0fd" },
  },
})(Radio);
