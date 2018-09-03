import React, { Component } from 'react';
import { Navbar, Nav, NavItem} from 'react-bootstrap';
import logo from '../logo.png';

export default class Header extends Component {
  render() {
    return(
      <Navbar fluid>
        <Navbar.Header>
          <Navbar.Brand>
            <a href="#home">
              <img src={logo} alt="logo" className="img-responsive logo"/>
            </a>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav pullRight activeKey={1} >
            <NavItem eventKey={1} href="#">
              Todo App
            </NavItem>
            <NavItem eventKey={2} href="#">
              Good Read App
            </NavItem>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    )
  }
}