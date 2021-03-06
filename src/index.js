import React from "react";
import ReactDOM from "react-dom";

import {BrowserRouter, Route} from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/css/animate.min.css";
import "./assets/scss/light-bootstrap-dashboard-react.scss?v=2.0.0";
import "./assets/css/demo.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import * as serviceWorker from "./serviceWorker";
import App from "./App";

import {Provider} from 'react-redux'
import store from "./redux/store";

ReactDOM.render(
    <BrowserRouter>
        <Provider store={store}>
            <Route path="/" component={App}/>
        </Provider>
    </BrowserRouter>,
    document.getElementById('root')
);

serviceWorker.unregister();
