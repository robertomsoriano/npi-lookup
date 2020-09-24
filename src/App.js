import React, { Component, Fragment } from "react";
import "./App.scss";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";

// import NPI from "./NPI";

import IcdCodes from "./components//icd/IcdCodes";
import NewPOA from "./components/NewPOA";
import NPIForm from "./components/NPI/NPIForm";

export default class App extends Component {
  render() {
    return (
      <Router basename={process.env.PUBLIC_URL}>
        <Switch>
          <Fragment>
            <div className="App">
              <Route exact path="/" component={NPIForm} />
              <Route path="/npi" component={NPIForm} />
              <Route path="/icd-codes" component={IcdCodes} />
              <Route path="/poa-exempt" component={NewPOA} />
            </div>
          </Fragment>
        </Switch>
      </Router>
    );
  }
}
