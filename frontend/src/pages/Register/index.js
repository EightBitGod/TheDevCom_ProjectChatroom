import React from "react";
import {Box, Typography, withStyles} from "@material-ui/core";
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import fetchUsername, {getSuccess, getUsernamePending, getEncryptedAlias} from '../../containers/CheckUsername/saga';
import ButtonBase from "../../components/Button";
import TextInput from "../../components/Input";
import ChatUI from '../../pages/ChatRoom/index';
import {userList} from '../../conf/data';
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
      userList: userList,
      isClicked: false,
    };
  }

  handleChange = (val) => {
    this.setState({
      username: val,
    });
  };

  onJoin= () => {
    const { username } = this.state;

    if(username.length !==0){
      //TODO: Check if Username exist or not through API
      const { actions } = this.props;
      actions.fetchUsername(username);
      this.setState({
        isClicked: true,
      })
    }
  };

  componentDidUpdate(prevProps: Props,prevState: State,snapshot) {
    const { success, pending, encryptedAlias } = this.props;
    const { userList, username } = this.state;

    if(typeof pending !== "undefined" && !pending){
      if(typeof success !== "undefined" && success){
        this.setState({
          userList: [...userList,{id: userList.length+1,username:username}],
        },function () {
          //TODO: Replace below code with router/redux
          ReactDOM.render(<ChatUI encryptedAlias={encryptedAlias} username={this.state.username} userList={this.state.userList}/>, document.getElementById('root'));
        });
      }
    }
  }

  render() {
    const { classes, success, pending } = this.props;
    const { isClicked } = this.state;

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
          { isClicked && !pending && !success ?
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
const mapStateToProps = state => ({
  success: getSuccess(state),
  pending: getUsernamePending(state),
  encryptedAlias: getEncryptedAlias(state),
});

export default connect(
    mapStateToProps,
    dispatch => ({
      actions: bindActionCreators({ fetchUsername }, dispatch),
    }),
)(withStyles(styles)(Register));