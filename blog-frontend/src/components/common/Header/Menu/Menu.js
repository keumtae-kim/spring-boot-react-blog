import React from 'react';

import styles from './Menu.scss';
import classNames from 'classnames/bind';
import {
  Container,
  Collapse,
  Navbar,
  Nav,
  NavItem,
  NavLink
} from 'reactstrap';

const cx = classNames.bind(styles);

const Menu = () => (
  <Navbar className="navbar navbar-expand-lg navbar-light fixed-top is-visible" id="mainNav">
    <Container>
      <a className="navbar-brand" href="index.html">Spring React Blog</a>
      <button className="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
        Menu
  <i className="fas fa-bars"></i>
      </button>
      <Collapse isOpen={true} navbar>
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


export default Menu;