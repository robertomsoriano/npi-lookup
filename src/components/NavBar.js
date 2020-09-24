import React from "react";
import { Link } from "react-router-dom";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink
  //   UncontrolledDropdown,
  //   DropdownToggle,
  //   DropdownMenu,
  //   DropdownItem
} from "reactstrap";

export default class Example extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }
  render() {
    return (
      <div>
        <Navbar color="light" light expand="md">
          <NavbarBrand tag={Link} to="/">
            <img
              src={`https://robertomsoriano.github.io/npi-lookup/static/media/onestop.2c47db2f.png`}
              alt={`One Stop`}
              style={{ width: 100, marginTop: -7 }}
            />
          </NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <NavLink tag={Link} to="/">
                  NPI
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink tag={Link} to="/icd-codes/">
                  ICD Codes
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink tag={Link} to="/poa-exempt/">
                  POA Exempt
                </NavLink>
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}
