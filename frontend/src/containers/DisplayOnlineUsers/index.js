// TODO: Use the data which we got from UserList array and display in card of MaterialUI or whatever
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import People from "@material-ui/icons/People";
const useStyles = makeStyles({
  list: {
    width: 250
  },
  activity: {
    backgroundColor: "#16B626",
    borderRadius: "50%",
    width: "2vw",
    height: "2vw"
  }
});

export default function SwipeableTemporaryDrawer(userList) {
  const classes = useStyles();
  const [state, setState] = React.useState({
    left: false
  });

  const toggleDrawer = (side, open) => event => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [side]: open });
  };

  const sideList = (side, users) => (
    <div
      className={classes.list}
      role="presentation"
      onClick={toggleDrawer(side, false)}
      onKeyDown={toggleDrawer(side, false)}
    >
      <List>
        <ListItem>
          <ListItemIcon>
            <People />
          </ListItemIcon>
          <ListItemText primary="Users" />
        </ListItem>
      </List>
      <Divider />
      <List>
        {users.UserList.map((user, index) => (
          <ListItem button key={index}>
            <ListItemIcon>
              <div className={classes.activity} />
            </ListItemIcon>
            <ListItemText primary={user.username} />
          </ListItem>
        ))}
      </List>
    </div>
  );

  return (
    <div>
      <div>
        <Button onClick={toggleDrawer("left", true)}>
          <People />
        </Button>
      </div>
      <SwipeableDrawer
        open={state.left}
        onClose={toggleDrawer("left", false)}
        onOpen={toggleDrawer("left", true)}
      >
        {sideList("left", userList)}
      </SwipeableDrawer>
    </div>
  );
}

