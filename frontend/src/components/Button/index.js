import * as React from "react";
import { Button, makeStyles } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  button: {
    margin: theme.spacing(1)
  },
  input: {
    display: "none"
  }
}));

type propTypes ={
  label: string,
  onButtonClick: func,
};

const ButtonBase = (props:propTypes) => {
  const classes = useStyles();
  const { label, onButtonClick } =props;
  return (
      <Button variant="contained" color="primary" className={classes.button} onClick={() => onButtonClick()}>
        {label}
      </Button>
  );
};

export default ButtonBase;
