import React from "react";
import { ReactiveBase } from "@appbaseio/reactivesearch";
import theme from "../styles/theme";
import SearchContainer from "../styles/SearchContainer";
import SearchFilters from "./SearchFilters";
import Users from "./User";
import Login from "./Login";

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

const SearchResult = () => (
  <ReactiveBase
    app="hackernews-live"
    credentials="kxBY7RnNe:4d69db99-6049-409d-89bd-e1202a2ad48e"
    theme={theme}
  >
    <SearchContainer>
      <Users />
      <Login store={store} />
      <SearchFilters store={store} />
    </SearchContainer>
  </ReactiveBase>
);

export default SearchResult;
