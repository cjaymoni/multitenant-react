import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import "./App.scss";

import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "primereact/resources/primereact.css";
import "primeflex/primeflex.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "primeicons/primeicons.css";
import "primereact/resources/themes/lara-light-blue/theme.css";

import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistor } from "./shared/redux/store";
import store from "./shared/redux/store";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>{" "}
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
