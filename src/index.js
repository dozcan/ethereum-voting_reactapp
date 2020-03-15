import React from "react";
import ReactDOM from "react-dom";
import { StoreProvider } from "./redux/store";
import App from "./components/App";

const rootElement = document.getElementById("root");
ReactDOM.render(
  <React.StrictMode>
    <StoreProvider>
      <App />
    </StoreProvider>
  </React.StrictMode>,
  rootElement
);
