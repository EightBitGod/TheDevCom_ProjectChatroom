import React from "react";
import { Provider } from 'react-redux';
import {applyMiddleware, createStore} from 'redux';
import logger from 'redux-logger'
import thunk from 'redux-thunk';


import "./App.css";
import Register from "./pages/Register";
import rootReducer from "./reducer";

const middlewares = [thunk];
const store = createStore(rootReducer,{},applyMiddleware(logger,...middlewares));

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <Register />
      </div>
    </Provider>
  );
}

export default App;
