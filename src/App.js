import React from "react";
import { ReactiveBase } from "@appbaseio/reactivesearch";

import theme from "./styles/theme";

import Header from "./components/Header";
import Users from "./components/User";
import Login from "./components/Login";
import SearchFilters from "./components/SearchFilters";

import Container from "./styles/Container";

import Navigation from "./components/Navigation";
import Main from "./components/Main";

const App = () => (
  <div>
    <Navigation />
    <Main />
  </div>
);

export default App;
