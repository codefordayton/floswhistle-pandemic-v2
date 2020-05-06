import { TextField } from "@material-ui/core";
import { withStyles } from "@material-ui/core";

export const StyledTextField = withStyles({
  root: {
    maxWidth: "324px",
    border: "1px solid #bce0fd",
    backgroundColor: "white",
    paddingInlineStart: "1em",
    color: "#2699fb",
  },
})(TextField);
