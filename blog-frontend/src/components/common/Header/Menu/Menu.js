import React, { Component } from 'react';

import styles from './Menu.scss';
import classNames from 'classnames/bind';
import {
  Container,
  Collapse,
  Navbar,
  Nav,
  NavItem,
  NavLink,
  NavbarToggler
} from 'reactstrap';

const cx = classNames.bind(styles);

class Menu extends Component {

  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }

  toggle = () => {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  render() {
    return (
      <Navbar className={cx("navbar", "navbar-expand-lg", "navbar-light", "fixed-top", "is-visible")} id="mainNav">
        <Container>
          <a className={cx("navbar-brand")} href="index.html">Spring-Boot React Blog</a>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="navbar-nav ml-auto">
              <NavItem>
                <NavLink to="/index">Home</NavLink>
              </NavItem>
              <NavItem>
                <NavLink to="/about">About</NavLink>
              </NavItem>
              <NavItem>
                <NavLink to="/post">Sample Post</NavLink>
              </NavItem>
              <NavItem>
                <NavLink to="/contact">Contact</NavLink>
              </NavItem>
            </Nav>
          </Collapse>
        </Container>
      </Navbar>
    );
  }
}

export default Menu;