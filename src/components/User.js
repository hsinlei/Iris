import React from "react";
import { Button } from "reactstrap";

const SignUpColor = {
  backgroundColor: "#3F51B5"
};
class Users extends React.Component {
  constructor(props) {
    super(props);

    this.state = { value: "", email: "", password: "" };
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleNameChange(event) {
    this.setState({ value: event.target.value });
  }

  handleEmailChange(event) {
    this.setState({ email: event.target.value });
  }

  handlePasswordChange(event) {
    this.setState({ password: event.target.value });
  }
  // TODO: change the submit into sign-up or log-in
  handleSubmit(event) {
    const sign_up_request = new Request(
      "http://localhost:8002/api/createuser",
      {
        method: "POST",
        headers: new Headers({ "Content-Type": "application/json" }),
        body: JSON.stringify({
          name: this.state.value,
          email: this.state.email,
          password: this.state.password
        })
      }
    );
    fetch(sign_up_request)
      .then(response => {
        response.json().then(data => {
          console.log("I got here" + data);
          //   this.setState({
          //     checked: data.count > 0
          //   });
        });
        document.location.href = "/login";
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
          Name:
          <input
            type="text"
            value={this.state.value}
            onChange={this.handleNameChange}
          />
          <br />
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
          <br />
        </label>
        <div>
          <Button style={{ backgroundColor: "#3F51B5" }} type="submit">
            Sign Up
          </Button>
        </div>
      </form>
    );
  }
}
export default Users;
