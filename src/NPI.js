import React, { Component } from "react";
import NewForm from "./components/NewForm";
import NavBar from "./components/NavBar";
import { Input, ListGroup, ListGroupItem } from "reactstrap";

import "./App.css";

class NPI extends Component {
  constructor(props) {
    super(props);
    this.state = {
      NPI: "",
      value: ""
    };
    //Bind all class methods.
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.child = React.createRef();
  }
  onClick = e => {
    const regex = /\d{10,}[a-z]*/; //validate 10 digits NPI number.
    const valid = regex.test(this.state.NPI);
    if (valid) {
      this.child.current.runAPI();
      this.setState({ value: "" }); // if NPI was valid, reset input box to blank.
      e.preventDefault();
    } else {
      alert("enter valid NPI"); //If NPI is invalid, generate alert.
      e.preventDefault();
    }
  };

  handleChange(e) {
    this.setState({ value: e.target.value, NPI: e.target.value }); // Take inputted value and assign it the State's NPI property.
  }

  handleSubmit(e) {
    this.setState({ NPI: this.state.value }); // On Submit, take inputted value and assign it the State's NPI property.
    e.preventDefault();
  }
  render() {
    return (
      <div className="App">
        <NavBar />
        <br />
        <h2 className="heading">NPI Lookup</h2>
        <hr />
        <form onSubmit={this.onClick}>
          <ListGroup>
            <ListGroupItem className="form-body-i">
              <Input
                className="form-input"
                style={{ display: "flex-center" }}
                type="text"
                value={this.state.value}
                onChange={this.handleChange}
                placeholder="enter NPI here"
              />
            </ListGroupItem>
          </ListGroup>
        </form>
        <br />
        <NewForm NPI={this.state.NPI} ref={this.child} />
      </div>
    );
  }
}

export default NPI;
