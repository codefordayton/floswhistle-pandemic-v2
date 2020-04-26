import { Button } from "@material-ui/core";
import { withStyles } from "@material-ui/core";

export const StyledButton = withStyles({
  root: {
    backgroundColor: "#f9552e",
    "&:hover": {
      backgroundColor: "#f9572ed8",
    },
    width: "140px",
    margin: "1em auto 2em",
  },
  label: {
    color: "white",
    lineHeight: "1.25",
    fontSize: "16px",
  },
})(Button);
