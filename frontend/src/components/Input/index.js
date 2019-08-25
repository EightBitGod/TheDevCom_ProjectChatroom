import React from "react";
import { withStyles,TextField, Box } from "@material-ui/core";
import AccountCircle from "@material-ui/icons/AccountCircle";

type Props = {
  label: string,
  handleChange: func,
  classes: {},
};

const styles = {
  margin: {
    marginRight: '10px',
  }
};

class TextInput extends React.Component<Props>{

  onChange = (e) => {
    const { handleChange } = this.props;

    if(handleChange){
      handleChange(e.target.value);
    }
  };

  render(){
    const {label, classes} = this.props;

    return(
        <Box display="flex" alignItems="flex-end">
          <div>
            <AccountCircle className={classes.margin} />
          </div>
          <div>
            <TextField id="input-with-icon-grid" label={label} onChange={this.onChange}/>
          </div>
        </Box>
    );
  }
}
export default withStyles(styles)(TextInput);
