import { FormLabel } from "@material-ui/core";
import { withStyles } from "@material-ui/core";

export const StyledLegend = withStyles({
  root: {
    color: "#303a84",
    fontWeight: "bold",
  },
})(FormLabel);
