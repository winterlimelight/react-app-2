import * as React from "react";
import * as ReactDOM from "react-dom";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import thunkMiddleware from 'redux-thunk'
import reducer from "./state/reducers";
import { Router } from "./containers/Router";
import "normalize.css"
import "./css/global.scss";

let store = createStore(
    reducer,
    applyMiddleware(thunkMiddleware)
);

ReactDOM.render(
    <Provider store={store}>
        <Router />
    </Provider>,
    document.getElementById("example")
);
