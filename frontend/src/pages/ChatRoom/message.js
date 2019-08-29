import React from "react";
import {Box, Typography, withStyles} from "@material-ui/core";

type propTypes ={
  messageList: {},
  username: string,
}

const styles = {
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

const Messages = (props:propTypes) => {
  const { messageList, classes, username } = props;
  console.log(messageList);
  return (
      <Box className={classes.height} id="messageList" component="div">
        {typeof messageList !== 'undefined' && messageList.map((obj,index) => (
            obj.username!==username ?
                <div className={classes.messageFriendText} key={index.toString()}>
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
  );
};

export default withStyles(styles)(Messages);