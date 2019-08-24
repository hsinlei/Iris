import React from "react";
import styled from "@emotion/styled";

import { NavLink } from "react-router-dom";
import Navbar from "../styles/Navbar";
import Brightness1OutlinedIcon from "@material-ui/icons/Brightness1Outlined";
const PlainLink = styled(NavLink)`
  color: white;
  text-decoration: none;
  display: flex;
  padding: 0px 2px;
`;
const ProfileIcon = styled(Brightness1OutlinedIcon)`
  color: white;
  text-decoration: none;
  display: inline-block;
  align-self: flex-end;
`;
const Navigation = () => (
  <Navbar style={{ display: "flex", flexDirection: "row" }}>
    <PlainLink to="/">Iris</PlainLink>
    <PlainLink to="/profile" style={{ minWidth: "10px", minHeight: "10px" }}>
      <ProfileIcon />
    </PlainLink>
    <PlainLink
      to="/logout"
      style={{ minWidth: "10px", minHeight: "10px", marginLeft: "60rem" }}
    >
      Logout
    </PlainLink>
  </Navbar>
);

export default Navigation;
