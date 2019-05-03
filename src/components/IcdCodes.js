import React, { Component } from "react";
import NavBar from "./NavBar";

import IcdApi from "./icd/IcdApi";

export default class IcdCodes extends Component {
  render() {
    return (
      <div className="App">
        <NavBar />
        <br />
        <h2 className="heading">ICD-10 Diagnosis Codes</h2>
        <hr />
        <IcdApi />
      </div>
    );
  }
}
