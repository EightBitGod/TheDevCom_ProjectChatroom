import React from "react";
import {Box, Typography, withStyles} from "@material-ui/core";

import ButtonBase from "../../components/Button";
import TextInput from "../../components/Input";

const styles = {
  display: {
    minHeight: "100vh"
  },
};

type Props = {
  userList: Array,
  classes: {},
};
type State = {
  username: String,
  error: boolean,
};

// TODO: Make Register Page and  Redirect to ChatRoom page after successfully login
// USE data.js file for static data until we have API
// ./conf/data.js

// TODO:
/**
 * Register Page should have username input and store in userList
 * userList would be another component would be use to display all the online users
 */
class Register extends React.Component<Props, State> {
  constructor(props: Object) {
    super(props);
    this.state = {
      username: "",
      userList: [],
      error: false,
    };
  }

  handleChange = (val) => {
    this.setState({
      username: val,
    });
  };

  onJoin= () => {
    const { userList, username } = this.state;

    if(username.length !==0){
      //TODO: Check if Username exist or not through API
      this.setState({
        userList: [...userList, username],
      });
    }

  };

  render() {
    const { classes } = this.props;
    const { error } = this.state;

    return(
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          className={classes.display}
        >
          <Typography variant="h2" gutterBottom={true}>Register</Typography>
          <TextInput label="Username" handleChange={v => {this.handleChange(v)}}/>
          <br/>
          { error===true ?
            <Typography variant="caption" gutterBottom={true} color="error">This username is already being used. Try another one.</Typography>
            :
            <Typography variant="caption" gutterBottom={true} color="textSecondary">Hey. Please enter your alias name to enter the chat room.</Typography>
          }
          <br/>
          <ButtonBase onButtonClick={() => this.onJoin()} label="Join"/>
        </Box>
    );
  }
}
export default withStyles(styles)(Register);
