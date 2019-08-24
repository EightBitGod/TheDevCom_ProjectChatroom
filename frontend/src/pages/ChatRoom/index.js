import * as React from "react";
import {} from "@material-ui/core";
import {} from "@material-ui/icons";

type Props = {};
type State = {};

// TODO: Make ChatUI Page and Send Message back and forth with API
// 1. Make action to call API and dispatch it
// 2. Use static data for now
// 3. ChatUI Should have Online users list 
// 4. Chatshould have send button that would call action from react redux and call API to send message
class ChatUI extends React.Component<Props, State> {
  constructor(props: Object) {
    super(props);
    this.state = {};
  }

  render() {
    const {} = this.state;
    return <div></div>;
  }
}
export default ChatUI;
