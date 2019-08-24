import React from 'react';
import styled from '@emotion/styled'

import { NavLink, BrowserRouter as Router } from 'react-router-dom';
import Navbar from '../styles/Navbar';
import Brightness1OutlinedIcon from '@material-ui/icons/Brightness1Outlined';
const PlainLink = styled(NavLink)`
  color: white;
  text-decoration: none;
  display:flex;
  padding:0px 2px;
`
const ProfileIcon = styled(Brightness1OutlinedIcon)`
  color: white;
  text-decoration: none;
  display:inline-block;
    align-self: flex-end;
  `
const Navigation = () => (
  <Navbar style={{ display: 'flex', flexDirection: 'row' }}>
    <Router>
    <PlainLink to='/'>Iris</PlainLink>
    <PlainLink to='/profile' style={{ minWidth: '10px', minHeight: '10px' }}><ProfileIcon /></PlainLink>
    </Router>
  </Navbar>
);

export default Navigation;