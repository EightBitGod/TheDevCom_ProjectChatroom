import * as React from "react";
import { Input, Button } from "@material-ui/core";
import {} from "@material-ui/icons";

type Props = {};
type State = {
  username: String,
  userList: Array
};
//IGNORE this page user REGISTER page for now "we can implement this later"
// TODO: Complete Login Page and Redirect to ChatRoom page after successfully login
// USE data.js file for static data until we have API
// ./conf/data.js

// TODO: 
/**
 * Login Page should have username input and store in userList
 * userList would be another component would be use to display all the online users
 */
class Login extends React.Component<Props, State> {
  constructor(props: Object) {
    super(props);
    this.state = {
      username: "",
      userList: []
    };
  }

  handleSubmit(value) {
    // TODO: add userList into array whenever user enters username
    this.setState({
      username: value
    });
  }
  handleFormSubmit() {}
  render() {
    const { username } = this.state;
    return (
      <div>
        <Form onSubmit={this.handleFormSubmit}>
          <Input
            id="username"
            defaultValue={username}
            value={username}
            placeholder="Enter Your UserName"
          ></Input>
          <Button onClick={this.handleSubmit}>Submit</Button>
        </Form>
      </div>
    );
  }
}
export default Login;
