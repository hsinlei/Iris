import React from "react";
import Cookies from "universal-cookie";

const cookies = new Cookies();

class Logout extends React.Component {
  constructor(props) {
    super(props);
    console.log(`logging out for user id = ${props.user.id}...`);
    cookies.remove("login");
    props.setUser({ user: { user_id: 0, name: "Unknown", email: "" } });
    document.location.href = "/login";
  }

  render() {
    return;
  }
}
export default Logout;
