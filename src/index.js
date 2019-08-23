import React from "react";
import ReactDOM from "react-dom";

import App from "./App";
import "bootstrap/dist/css/bootstrap.css";

import { BrowserRouter } from "react-router-dom";

ReactDOM.render(
  <App />,

  // TODO: BrowserRouter is throwing invariant error
  // <BrowserRouter>  </BrowserRouter>
  document.getElementById("app")
);
