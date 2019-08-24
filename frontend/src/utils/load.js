// @flow

import React from "react";
import Loadable from "react-loadable";
import Preloader from "../components/Preloader";

type Props = {
  error: ?Error
};

const createLoadable = (loader: () => Promise<*>) =>
  Loadable({
    loader,
    loading: function loading(props: Props) {
      if (props.error) {
        console.error(props.error);
      }
      return <Preloader />;
    }
  });

export default createLoadable;
