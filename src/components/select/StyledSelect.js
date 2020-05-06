import { Select } from "@material-ui/core";
import { withStyles } from "@material-ui/core";

export const StyledSelect = withStyles({
  root: {
    maxWidth: "300px",
    border: "1px solid #bce0fd",
    color: "#2699fb",
    backgroundColor: "white",
    paddingInlineStart: "1em",
  },
  icon: { color: "#2699fb" },
})(Select);
