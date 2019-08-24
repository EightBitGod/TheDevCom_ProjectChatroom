import * as React from "react";
import { Button } from "@material-ui/core";

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  button: {
    margin: theme.spacing(1)
  },
  input: {
    display: "none"
  }
}));

class Button extends React.Component {
  render() {
    const classes = useStyles();
    return (
      <div>
        <Button variant="outlined" color="inherit" className={classes.button}>
          Test Button
        </Button>
      </div>
    );
  }
}

export default Button;
