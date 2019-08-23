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

class Store {
  constructor(initialState = { user_id: 0 }) {
    this.state = initialState;
  }
  set_user_id(user_id) {
    this.state.user_id = user_id;
  }
  get_user_id(user_id) {
    return this.state.user_id;
  }
}

const store = new Store();

const EntryForm = {
  margin: "2rem",
  textAlign: "center",
  fontFamily: "Lato, Helvetica, sans-serif"
};

const EntryLogo = {
  fontSize: "5rem"
};

const UserEntry = () => (
  <div style={EntryForm}>
    <label style={EntryLogo}>Iris</label>
    <Users />
    <Login store={store} />
  </div>
);

export default UserEntry;
