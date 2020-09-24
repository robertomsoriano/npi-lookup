import React, { Component } from "react";
import { Button, Input, ListGroupItem } from "reactstrap";

import axios from "axios";
import CallResult from "./CallResult";

export default class IcdApi extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
      value: "",
      code: "F.30.1",
      loading: true
    };

    this.apiCall = this.apiCall.bind(this);
    this.handleChange = this.handleChange.bind(this);
    // this.enterPressed = this.enterPressed.bind(this);
  }
  componentDidMount() {}

  apiCall = async (e = null) => {
    if (e) {
      e.preventDefault();
    }
    let res = await axios({
      method: "get",
      url: `https://cors-anywhere.herokuapp.com/http://icd10api.com/?code=${this.state.code}&desc=long&r=json`,
      headers: {
        Origin: `http://icd10api.com/?code=${this.state.code}&desc=long&r=json`
      }
    });
    const { data } = await res;
    await this.setState({ data: data, loading: false });
    await console.log(data);
    if (!data.Name) {
      alert("Please Enter a Valid ICD-10 Diagnosis Code");
    }
    return data;
  };

  enterPressed(event) {
    var code = event.keyCode || event.which;
    if (code === 13) {
      this.apiCall(event);
    }
  }
  handleChange(e) {
    this.setState({ value: e.target.value, code: e.target.value }); // Take inputted value and assign it the State's NPI property.
  }
  render() {
    return (
      <div>
        <form onSubmit={(e) => this.apiCall(e)}>
          <ListGroupItem className="form-body-i">
            <Input
              className="form-input"
              style={{ display: "flex-center" }}
              type="text"
              value={this.state.value}
              onChange={this.handleChange}
              onKeyPress={this.enterPressed.bind(this)}
              placeholder="Enter ICD-10 code Here"
              id="icd10"
            />
          </ListGroupItem>
          <br />
          <Button outline color="primary" onClick={(e) => this.apiCall(e)}>
            Search Diagnosis
          </Button>
        </form>

        <CallResult code={this.state} />
      </div>
    );
  }
}
