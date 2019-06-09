import React from 'react';
import { DropdownItem, UncontrolledDropdown, DropdownToggle, DropdownMenu } from 'reactstrap';
import { NavLink as Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignInAlt } from '@fortawesome/free-solid-svg-icons/faSignInAlt';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons/faSignOutAlt'


const accountMenuItemsAuthenticated = onLogout => {

  return (  
    <DropdownItem>
      <div onClick={onLogout}>
        <FontAwesomeIcon icon={faSignOutAlt}/> Sign out
      </div>
    </DropdownItem>
   );
};

const accountMenuItems = (
  <>
   <DropdownItem id="login-item" tag={Link} to="/login" replace>
      <FontAwesomeIcon icon={faSignInAlt} /> Sign in
    </DropdownItem>
    <DropdownItem tag={Link} to="/register">
      <FontAwesomeIcon icon={faSignInAlt} /> Register
    </DropdownItem>
  </>
);

const NavDropdown = props => (
  <UncontrolledDropdown nav inNavbar id={props.id}>
    <DropdownToggle nav caret className="d-flex align-items-center">      
      <span>{props.name}</span>
    </DropdownToggle>
    <DropdownMenu right style={props.style}>
      {props.children}
    </DropdownMenu>
  </UncontrolledDropdown>
);

export const AccountMenu = ({ isAuthenticated = false, onLogout }) => {
  let auth = accountMenuItemsAuthenticated(onLogout);
 
  return (
  <NavDropdown icon="user" name="Account" id="account-menu">
    {isAuthenticated ? auth : accountMenuItems}
  </NavDropdown>
  );
};

export default AccountMenu;