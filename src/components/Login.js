import React from "react";

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = { email: "", password: "" };
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
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
        response.json().then(data => {
          console.log("I got here" + data);
        });
      })
      .then(response => {
        console.log(
          "A person logged in: " +
            this.state.email +
            this.state.password +
            response
        );
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
          Password:
          <input
            type="text"
            value={this.state.password}
            onChange={this.handlePasswordChange}
          />
        </label>
        <input type="submit" value="Log in" />
      </form>
    );
  }
}
export default Login;
