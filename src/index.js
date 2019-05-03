import React from "react";
import ReactDOM from "react-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import App from "./App";
// import NPI from "./NPI";
// import IcdCodes from "./components/IcdCodes";
// import NewPOA from "./components/NewPOA";

// import { Route, BrowserRouter as Router } from "react-router-dom";

// const routing = (
//   <Router basename={process.env.PUBLIC_URL}>
//     <div>
//       <Route exact path="/" component={App} />
//       <Route path="/npi" component={NPI} />
//       <Route path="/icd-codes" component={IcdCodes} />
//       <Route path="/poa-exempt" component={NewPOA} />
//     </div>
//   </Router>
// );

ReactDOM.render(<App />, document.getElementById("root"));
