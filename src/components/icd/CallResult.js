import React from "react";
import { ListGroup, ListGroupItem } from "reactstrap";

const CallResult = props => {
  // Variables from GET Response
  const desc =
    props.code.loading === true ? "" : props.code.data.Description || "null";
  const name =
    props.code.loading === true ? "" : props.code.data.Name || "null";
  const billable =
    props.code.loading === true
      ? ""
      : props.code.data.Valid === "0"
      ? "This code is NOT billable."
      : "This is a billable ICD-10 code.";
  const icdType =
    props.code.loading === true ? "" : props.code.data.Type || "null";
  const color =
    props.code.loading === true
      ? ""
      : props.code.data.Valid === "0"
      ? "red"
      : "green";

  // Will return only if GET req has finished and state.loading is 'false'.
  return (
    <div>
      <br />
      {props.code.loading === false && props.code.data.Name && (
        <div>
          <ListGroup>
            <ListGroupItem className="form-body-i">
              <strong>ICD-10 Diagnosis Code:</strong> {name}
            </ListGroupItem>
            <br />
            <ListGroupItem className="form-body-i">
              <strong>Description:</strong> {desc}
            </ListGroupItem>
            <br />
            <ListGroupItem className="form-body-i" style={{ color: color }}>
              <strong>Billable?</strong> {billable}
            </ListGroupItem>
            <br />
            <ListGroupItem className="form-body-i">
              <strong>ICD Type:</strong> {icdType}
            </ListGroupItem>
            <br />
          </ListGroup>
        </div>
      )}
    </div>
  );
};

export default CallResult;
