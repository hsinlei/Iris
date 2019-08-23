import React from "react";
import Container from "../styles/Container";
import { Switch, Route } from "react-router-dom";
import SearchResult from "./SearchResult";
import Profile from "./Profile";

const Main = () => {
  return (
    <Container>
      <Switch>
        <Route exact path="/" component={SearchResult}></Route>
        <Route exact path="/profile" component={Profile}></Route>
      </Switch>
    </Container>
  );
};
export default Main;
