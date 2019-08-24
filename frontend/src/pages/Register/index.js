import * as React from "react";
import {} from "@material-ui/core";
import {} from "@material-ui/icons";

type Props = {
  userList: Array
};
type State = {
  username: String
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
      userList: []
    };
  }

  render() {
    const {} = this.state;
    return <div></div>;
  }
}
export default Register;
