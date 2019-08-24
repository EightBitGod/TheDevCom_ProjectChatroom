import React, { Component } from "react";
import { Switch, Redirect } from "react-router-dom";
import { withRouter } from "react-router";

import { CONSTANTS, INTERNAL_LINKS } from "./enum";
import load from "utils/load";

const Home = load(() => import("./pages/Home"));
const Login = load(() => import("./pages/Login"));
const Register = load(() => import("./page/Register"));
const Chat = load(() => import("./pages/ChatRoom"));

class Routes extends Component<{}> {
  render() {
    return (
      <Switch>
        {/*TODO MAKE HOME PAGE  */}
        <Route exact path="/" render={props => <Home {...props} />} />

        <Redirect path={INTERNAL_LINKS.HOME} to="/" />

        {/*TODO MAKE LOGIN PAGE  */}
        <Route path="/login" render={props => <Login {...props} />} />

        {/*TODO MAKE REGISTER PAGE  */}
        <Route path="/register" render={props => <Register {...props} />} />
        
        {/*TODO MAKE ChatRoom PAGE  */}
        <Route path="/register" render={props => <Chat {...props} />} />
      </Switch>
    );
  }
}

export default withRouter(Routes);
