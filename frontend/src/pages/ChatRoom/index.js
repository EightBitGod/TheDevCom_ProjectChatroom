import * as React from "react";
import {} from "@material-ui/core";
import {} from "@material-ui/icons";
import DisplayOnlineUsers from "../../containers/DisplayOnlineUsers/index";
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
    this.state = {
      userList:this.props.userList
    };
  }

  render() {
    const {} = this.state;
    return <div>
    			<DisplayOnlineUsers userList={this.state.userList} />
    	   </div>;
  }
}
export default ChatUI;
