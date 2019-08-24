import React from "react";
import Container from "../styles/Container";
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";
import SearchResult from "./SearchResult";
import Profile from "./Profile";
import Login from "./Login";
import Logout from "./Logout";
import User from "./User";
import Cookies from "universal-cookie";

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: { name: "Bob", id: 2 }
    };
    const cookies = new Cookies();
    const login = cookies.get("login");
    if (login && login.user_id) {
      this.state.user.id = login.user_id;
      this.state.user.name = login.name;
    }
  }
  setUser = user => {
    this.setState({
      user: user
    });
  };
  render() {
    return (
      <Container>
        <Router>
          <Switch>
            <Route
              exact
              path="/signup"
              render={props => (
                <User
                  {...props}
                  user={this.state.user}
                  setUser={this.setUser.bind(this)}
                />
              )}
            />
            <Route
              exact
              path="/login"
              render={props => (
                <Login
                  {...props}
                  user={this.state.user}
                  setUser={this.setUser.bind(this)}
                />
              )}
            />
            <Route
              exact
              path="/logout"
              render={props => (
                <Logout
                  {...props}
                  user={this.state.user}
                  setUser={this.setUser.bind(this)}
                />
              )}
            />
            <Route
              exact
              path="/"
              render={props => (
                <SearchResult {...props} user={this.state.user} />
              )}
            />
            <Route exact path="/profile" component={Profile}></Route>
          </Switch>
        </Router>
      </Container>
    );
  }
}
export default Main;
