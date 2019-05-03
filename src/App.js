import React, { Component, Fragment } from "react";

import { Route, BrowserRouter as Router, Switch } from "react-router-dom";

import NPI from "./NPI";
import IcdCodes from "./components/IcdCodes";
import NewPOA from "./components/NewPOA";

export default class App extends Component {
  render() {
    return (
      <Router basename={process.env.PUBLIC_URL}>
        <Switch>
          <Fragment>
            <div className="App">
              <Route exact path="/" component={NPI} />
              <Route path="/npi" component={NPI} />
              <Route path="/icd-codes" component={IcdCodes} />
              <Route path="/poa-exempt" component={NewPOA} />
            </div>
          </Fragment>
        </Switch>
      </Router>
    );
  }
}
