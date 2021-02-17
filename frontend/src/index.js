import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { Router } from "react-router-dom";
import { ConnectedRouter } from "connected-react-router";

import "./styles/normalize.less";
import App from "./containers/App";
import configureStore from "./store/configureStore";
import reportWebVitals from "./reportWebVitals";
import { AuthProvider } from "./components/Context/AuthContext";
import history from "./utils/historyUtil";

const store = configureStore();

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <Router history={history}>
        <AuthProvider>
          <App />
        </AuthProvider>
      </Router>
    </ConnectedRouter>
  </Provider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
