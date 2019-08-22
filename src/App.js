import React from "react";
import { ReactiveBase } from "@appbaseio/reactivesearch";

import theme from "./styles/theme";

import Header from "./components/Header";
import Users from "./components/User";
import Login from "./components/Login";
import SearchFilters from "./components/SearchFilters";

import Container from "./styles/Container";
import Main from "./styles/Main";

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

const App = () => (
  <Main>
    <Container>
      <ReactiveBase
        app="hackernews-live"
        credentials="kxBY7RnNe:4d69db99-6049-409d-89bd-e1202a2ad48e"
        theme={theme}
      >
        <Header />
        <Users />
        <Login store={store} />
        <SearchFilters store={store} />
      </ReactiveBase>
    </Container>
  </Main>
);

export default App;
