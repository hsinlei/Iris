import React from "react";
import { Button } from "reactstrap";
import Cookies from "universal-cookie";

const cookies = new Cookies();

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = { user_id: 0, email: "", password: "" };
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    const login_str = decodeURIComponent(
      cookies.get("login", { doNotParse: true })
    );
    console.log("login = " + String(login_str));
    if (login_str) {
      const login = JSON.parse(login_str);
      const log_in_request = new Request(
        "http://localhost:8002/api/loginuser",
        {
          method: "POST",
          headers: new Headers({ "Content-Type": "application/json" }),
          body: JSON.stringify({
            email: login.email,
            password: login.password
          })
        }
      );
      fetch(log_in_request)
        .then(response => {
          console.log("A person logged in: " + login.email + login.password);

          response.json().then(data => {
            this.setState({
              user_id: data.user_id
            });
            this.props.store.set_user_id(data.user_id);
            console.log(cookies.get("login")); // Pacman
            console.log(data.user_id);
          });
        })
        .catch(function(err) {
          console.log("caught :" + err);
        });
    }
  }

  handleEmailChange(event) {
    this.setState({ email: event.target.value });
  }

  handlePasswordChange(event) {
    this.setState({ password: event.target.value });
  }
  // TODO: change the submit into sign-up or log-in
  handleSubmit(event) {
    const log_in_request = new Request("http://localhost:8002/api/loginuser", {
      method: "POST",
      headers: new Headers({ "Content-Type": "application/json" }),
      body: JSON.stringify({
        email: this.state.email,
        password: this.state.password
      })
    });
    fetch(log_in_request)
      .then(response => {
        console.log(
          "A person logged in: " + this.state.email + this.state.password
        );

        response.json().then(data => {
          this.setState({
            user_id: data.user_id
          });
          this.props.store.set_user_id(data.user_id);
          // TODO: set log in status
          cookies.set(
            "login",
            JSON.stringify({
              email: this.state.email,
              password: this.state.password
            })
          );
          console.log(cookies.get("login")); // Pacman
          console.log(data.user_id);
        });
      })
      .catch(function(err) {
        console.log("caught :" + err);
      });

    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Email:
          <input
            type="text"
            value={this.state.email}
            onChange={this.handleEmailChange}
          />
          <br />
          Password:
          <input
            type="text"
            value={this.state.password}
            onChange={this.handlePasswordChange}
          />
        </label>
        <br />
        <div>
          <Button style={{ backgroundColor: "#3F51B5" }} type="submit">
            Log in
          </Button>
        </div>
      </form>
    );
  }
}
export default Login;
