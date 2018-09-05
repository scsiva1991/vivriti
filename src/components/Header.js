import React, { Component } from 'react';
import { Navbar, Nav, NavItem} from 'react-bootstrap';
import { withRouter } from "react-router-dom";
import logo from '../logo.png';
class Header extends Component {

  constructor(props) {
    super(props);
    this.state = {
      activeKey: 1
    }
  }

  navigateTo = path => {
    this.props.history.push(path);
    this.setState({
      activeKey: path === '/' ? 1 : 2
    })
  }
  
  render() {
    const { activeKey } = this.state;
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
          <Nav pullRight activeKey={activeKey} >
            <NavItem eventKey={1} onClick={()=>this.navigateTo('/')} >
              Todo App
            </NavItem>
            <NavItem eventKey={2} onClick={()=>this.navigateTo('/good-read')}>              
              Good Read App
            </NavItem>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    )
  }
}

export default withRouter(Header);