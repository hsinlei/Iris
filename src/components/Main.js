import React from "react";
import Container from "../styles/Container";
import { Switch, Route } from "react-router-dom";
import SearchResult from "./SearchResult";
import Profile from "./Profile";
import Login from "./Login";
import User from "./User";
import Home from "./Home";
import '../styles/main.css';

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: { name: "Bob", id: 2 },
      query: ""
    };
  }
  setUser = user => {
    this.setState({
      user: user
    });
  };
  setQuery = query => {
    this.setState({
      query: query
    });
  };
  render() {
    return (
      <Container>
        <Switch><Route exact path="/signup" render={props => (
              <User {...props} user={this.state.user}
                setUser={this.setUser.bind(this)}
              />
            )}
          />
          <Route exact path="/" render={props => (
              <Home {...props} user={this.state.user} setUser={this.setUser.bind(this)}
                setQuery={this.setQuery.bind(this)}
              />
            )}
          />
          <Route exact path="/login" render={props => ( <Login {...props} user={this.state.user} setUser={this.setUser.bind(this)} />
            )}
          />
          <Route exact path="/result"
            render={(props) => <SearchResult {...props} user={this.state.user} query={this.state.query}/>}
          />
          <Route exact path="/profile" component={Profile}></Route>
        </Switch>
      </Container>
    );
  }
}
export default Main;
