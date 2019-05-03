import React, { Component } from "react";
import { Button, Input, ListGroup, ListGroupItem } from "reactstrap";
import Tabletop from "tabletop";
// import axios from "axios";
import NavBar from "./NavBar";
import config from "./config";
import poa2018 from "./poa2018";

export default class POA extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "",
      code: "B90.0",
      data: {},
      loading: true,
      valid: true,
      loaded: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.findCode = this.findCode.bind(this);
  }

  handleChange(e) {
    let entry = e.target.value;
    entry = entry.charAt(0).toUpperCase() + entry.slice(1);
    this.setState({ value: e.target.value, code: entry }); // Take inputted value and assign it the State's NPI property.
  }

  componentDidMount() {
    Tabletop.init({
      key: config.spreadsheetId,
      callback: googleData => {
        this.setState({
          data: googleData,
          loading: false
        });
      },
      simpleSheet: true
    });
  }

  findCode(state) {
    console.log(Object.keys(poa2018)[0]);
    const arr = this.state.loading
      ? []
      : this.state.data.map(e => e.POAexemptCode);
    if (!this.state.loading) {
      console.log(arr.includes(this.state.code));
      this.setState({
        valid: arr.includes(this.state.code),
        loaded: !this.state.loaded
      });
    } else {
      console.log("wait");
    }
  }

  render() {
    return (
      <div className="App">
        <NavBar />
        <br />
        <h2 className="heading">POA Exempt Codes</h2>
        <hr />

        <form onSubmit={e => e.preventDefault()}>
          <Input
            className="form-input"
            style={{ display: "flex-center" }}
            type="text"
            value={this.state.value}
            onChange={this.handleChange}
            placeholder="Enter Dx code Here"
            id="icd10"
          />
          <br />
          <Button
            outline
            color="primary"
            onClick={() => this.findCode(this.state)}
          >
            Search Diagnosis Code
          </Button>
        </form>
        {!this.state.loading && (
          <div>
            <Results result={this.state} />
          </div>
        )}
      </div>
    );
  }
}

const Results = props => {
  console.log(props.result);

  const name = props.result.loading === true ? "" : props.result.code || "null";
  const valid =
    props.result.loading === true ? "" : props.result.valid ? "" : "NOT";
  return (
    <>
      {!props.result.loaded && <div>Loading....</div>}
      {props.result.loading === false && props.result.loaded && (
        <div>
          <br />
          <ListGroup>
            <ListGroupItem className="form-body-i">
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
