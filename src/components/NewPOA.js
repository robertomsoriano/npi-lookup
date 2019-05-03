import React, { Component } from "react";
import { Button, Input, ListGroup, ListGroupItem } from "reactstrap";
// import axios from "axios";
import NavBar from "./NavBar";
import poa2018 from "./poa2018";

export default class NewPOA extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "",
      code: "",
      data: {},
      loading: true,
      valid: true,
      loaded: "",
      stringVald: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.validate = this.validate.bind(this);
    this.stringVal = this.stringVal.bind(this);
  }

  handleChange(e) {
    let entry = e.target.value;
    entry = entry.charAt(0).toUpperCase() + entry.slice(1);
    this.setState({ value: e.target.value, code: entry }); // Take inputted value and assign it the State's NPI property.
  }

  stringVal() {
    const regex = /./; //validate 10 digits NPI number.
    const valid = regex.test(this.state.code);
    if (!valid) {
      alert("Please Enter a Valid ICD-10 Diagnosis Code");
    } else {
      this.setState({ stringVald: true });
    }
  }

  validate() {
    this.stringVal();
    this.setState({ loaded: this.state.code });
    const bool = Object.keys(poa2018).includes(this.state.code.toString())
      ? true
      : false;
    bool ? this.setState({ valid: true }) : this.setState({ valid: false });
    this.setState({ loading: false });
  }

  enterPressed(event) {
    var code = event.keyCode || event.which;
    if (code === 13) {
      this.validate();
    }
  }

  render() {
    return (
      <div className="App">
        <NavBar />
        <br />
        <h2 className="heading">POA Exempt Codes</h2>
        <hr />

        <form
          onSubmit={e => {
            e.preventDefault();
            this.validate();
          }}
        >
          <ListGroupItem className="form-body-i">
            <Input
              className="form-input"
              style={{ display: "flex-center" }}
              type="text"
              value={this.state.value}
              onChange={this.handleChange}
              placeholder="Enter Dx code Here"
              id="icd10"
            />
          </ListGroupItem>
          <br />
          <Button
            outline
            color="primary"
            onClick={() => this.validate()}
            onKeyPress={this.enterPressed.bind(this)}
          >
            Search Diagnosis Code
          </Button>
        </form>
        {!this.state.loading && this.state.stringVald && (
          <div>
            <Results result={this.state} />
          </div>
        )}
      </div>
    );
  }
}

const Results = props => {
  const name = props.result.loading ? "" : props.result.loaded.toString();
  const valid =
    props.result.loading === true ? "" : props.result.valid ? "" : "NOT";
  const color =
    props.result.loading === true ? "" : props.result.valid ? "green" : "red";
  return (
    <>
      {props.result.loading && <div>Loading....</div>}
      {!props.result.loading && (
        <div>
          <br />
          <ListGroup>
            <ListGroupItem className="form-body-i" style={{ color: color }}>
              <strong>The ICD-10 Diagnosis Code:</strong> {name} is {valid} POA
              Exempt.
            </ListGroupItem>
            <br />
          </ListGroup>
        </div>
      )}
    </>
  );
};
