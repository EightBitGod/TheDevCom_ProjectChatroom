import React from "react";
import {Grid, Box, Typography, TextField, InputAdornment, withStyles} from "@material-ui/core";
import SendIcon from "@material-ui/icons/Send";

import DisplayOnlineUsers from "../../containers/DisplayOnlineUsers/index";

const styles = {
  root: {
    minHeight: "100vh",
    maxHeight: "100vh",
  },
  messageBox: {
    flexDirection: 'column',
    padding: '0 10px',
  },
  messageUserText:{
    paddingLeft: "20%",
  },
  messageFriendText:{
    paddingRight: "20%",
  },
  height: {
    overflowY: 'scroll',
    minHeight: "75vh",
    maxHeight: "75vh",
    margin: "1rem 0",
    paddingRight: "1rem"
  },
  multiline: {
    wordBreak: 'break-word',
  },
};
type Props = {
  userList: {},
  classes: {},
  username: string,
};
type State = {
  messages: [],
  message: string,
};

// TODO: Make ChatUI Page and Send Message back and forth with API
// 1. Make action to call API and dispatch it
// 2. Use static data for now
// 3. ChatUI Should have Online users list 
// 4. Chatshould have send button that would call action from react redux and call API to send message
class ChatUI extends React.Component<Props, State> {
  constructor(props: Object) {
    super(props);
    this.state = {
      messages: [],
      message: "",
    };
  }

  addMessage = (e) => {
    e.preventDefault();
    const { messages, message } = this.state;
    const { username } = this.props;

    this.setState({
      message: "",
      messages: [
        ...messages,
        {
          username,
          message,
        },
      ],
    });
  };

  onChange = (e) => {
    this.setState({
      message: e.target.value,
    });
  };

  componentDidUpdate() {
    const objDiv = document.getElementById('messageList');
    objDiv.scrollTop = objDiv.scrollHeight;
  }

  render() {
    const {userList, classes, username} = this.props;
    const { messages, message } = this.state;

    return (
        <div className={classes.root}>
          <Box p={1} boxShadow={1}>
            <DisplayOnlineUsers userList={userList}/>
            <Typography variant="h4" align="center">Chat Room</Typography>
          </Box>
          <Grid container component="div" className={classes.messageBox}>
            <Box className={classes.height} id="messageList" component="div">
              {typeof messages !== 'undefined' && messages.map(obj => (
                  obj.username!==username ?
                      <div className={classes.messageFriendText} key={obj.message}>
                        <Typography variant="caption" gutterBottom={true} color="textSecondary">{obj.username}</Typography>
                        <br/>
                        <Box border={1} mb={2} p={1} display="inline-block" borderRadius="5px">
                          <Typography className={classes.multiline}>{obj.message}</Typography>
                        </Box>
                      </div>:
                      <Box className={classes.messageUserText} display="flex" flexDirection="column" alignItems="flex-end" key={obj.message}>
                        <Typography variant="caption" gutterBottom={true} color="textSecondary">{obj.username}</Typography>
                        <Box border={1} mb={2} p={1} display="inline-block" borderRadius="5px" bgcolor="#00b6ff" borderColor="#00b6ff">
                          <Typography className={classes.multiline}>{obj.message}</Typography>
                        </Box>
                      </Box>
              ))}
            </Box>
            <Box>
              <TextField
                id="outlined-textarea"
                label="Enter Message here"
                multiline
                margin="normal"
                variant="outlined"
                fullWidth
                value={message}
                autoFocus={true}
                onChange={this.onChange}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <SendIcon
                          edge="end"
                          aria-label="toggle password visibility"
                          onClick={(event) => this.addMessage(event)}
                      />
                    </InputAdornment>
                )}}
              />
            </Box>
          </Grid>
        </div>
    );
  }
}
export default withStyles(styles)(ChatUI);
