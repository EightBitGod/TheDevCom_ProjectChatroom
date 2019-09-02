import React from "react";
import {Grid, Box, Typography, TextField, InputAdornment, withStyles} from "@material-ui/core";
import SendIcon from "@material-ui/icons/Send";

import DisplayOnlineUsers from "../../containers/DisplayOnlineUsers/index";
import Messages from "./message";

const styles = {
  root: {
    minHeight: "100vh",
    maxHeight: "100vh",
  },
  messageBox: {
    flexDirection: 'column',
    padding: '0 10px',
  },
};
type Props = {
  classes: {},
  username: string,
};
type State = {
  messages: [],
  message: string,
};

var chatSocket;
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
      activeUserList: [],
    };
    chatSocket = new WebSocket('ws://127.0.0.1:8000/ws/chat/default/$');
  }

  componentDidMount(): void {
    const { encryptedAlias } = this.props;

    chatSocket.onopen = function(e){
      chatSocket.send(JSON.stringify({
        'message': '--check--',
        'alias' : encryptedAlias,
      }));
    };

    chatSocket.onmessage = function(e) {
      const data = JSON.parse(e.data);
      updateMessageList(data);
    };

    const updateMessageList = (data) => {
      const type = data['type'];
      const { messages, activeUserList } = this.state;
      const { username } =this.props;

      if(type==='--msg--'){
        this.setState({
          messages: [
            ...messages,
            {
              username: data['alias'],
              message: data['message'],
            },
          ],
        });
      }else if(type==='--new--' && data['alias'] !== username) {
        this.setState({
          activeUserList: [
            ...activeUserList,
            data['alias'],
          ]
        });
      }else if (type==='--online--') {
        this.setState({
          activeUserList: data['active'],
        });
      }else if(type === '--offline--') {
        this.setState({
          activeUserList: activeUserList.filter((user) => user !== data['alias']),
        })
      }
    };
  }

  addMessage = (e) => {
    e.preventDefault();
    const { message } = this.state;
    const { encryptedAlias } = this.props;

    chatSocket.send(JSON.stringify({
      'message': message,
      'alias' : encryptedAlias,
    }));
    this.setState({
      message: "",
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
    const {classes, username} = this.props;
    const { messages, message, activeUserList } = this.state;

    return (
        <div className={classes.root}>
          <Box p={1} boxShadow={1}>
            <DisplayOnlineUsers userList={activeUserList}/>
            <Typography variant="h4" align="center">Chat Room</Typography>
          </Box>
          <Grid container component="div" className={classes.messageBox}>
            <Messages messageList={messages} username={username}/>
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
                onKeyDown={(event) => {
                  if (event.key === 'Enter') {
                    this.addMessage(event)
                  }
                }}
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
