import React, { useState, useEffect, Suspense } from "react";
import axios from "axios";
import { Button, ListGroup, ListGroupItem, Input, Spinner } from "reactstrap";
import NavBar from "../NavBar";

// const provNPI = 1740389154;

const NPIForm = () => {
  const [provNPI, setProvNPI] = useState("");
  const [provider, setProvider] = useState({});
  const [loading, setLoading] = useState(false);
  useEffect(() => {}, []);
  console.log(provider);

  const searchNPI = async (e) => {
    e.preventDefault();
    setLoading(true);
    // fetchProv(NPIValue).then((res) => setProvider(res));
    fetchProv(provNPI).then((res) => {
      setProvider(res);
      setLoading(false);
    });
  };
  if (provider.data && provider.data.Errors) {
    return (
      <Suspense fallback={<Spinner color="dark" />}>
        <NavBar />
        <div className={`d-flex flex-row d-flex justify-content-center`}>
          <h2 className="heading">NPI Lookup</h2>
        </div>
        <div className="container form-body" style={{ display: "flex-center" }}>
          <>
            <form>
              <ListGroup className={`mb-4`}>
                <ListGroupItem className="form-body-i">
                  <Input
                    className="form-input"
                    style={{ display: "flex-center" }}
                    type="text"
                    value={provNPI}
                    onChange={(e) => setProvNPI(e.target.value)}
                    placeholder="Enter NPI here"
                  />
                </ListGroupItem>
              </ListGroup>

              <Button
                className={`mt-2`}
                outline
                color="primary"
                type="submit"
                value="Submit"
                onClick={(e) => searchNPI(e)}
              >
                Search
              </Button>
            </form>
          </>
          {loading && (
            <>
              <div className={`my-4`}>
                <Spinner color="dark" />
              </div>
            </>
          )}
          <div className={`my-5`}>
            <h2>Provider not found. Please verify NPI.</h2>
            <p>{provider.data.Errors[0].description}</p>
          </div>
        </div>
      </Suspense>
    );
  }

  return (
    <Suspense fallback={<Spinner color="dark" />}>
      <NavBar />

      <div className={`d-flex flex-row d-flex justify-content-center`}>
        <h2 className="heading">NPI Lookup</h2>
      </div>
      <div className="container form-body" style={{ display: "flex-center" }}>
        <>
          <form>
            <ListGroup>
              <ListGroupItem className="form-body-i">
                <Input
                  className="form-input"
                  style={{ display: "flex-center" }}
                  type="text"
                  value={provNPI}
                  onChange={(e) => setProvNPI(e.target.value)}
                  placeholder="Enter NPI here"
                />
              </ListGroupItem>
            </ListGroup>
            <Button
              className={`mt-2`}
              outline
              color="primary"
              type="submit"
              value="Submit"
              onClick={(e) => searchNPI(e)}
            >
              Search
            </Button>
          </form>
        </>
        {loading && (
          <>
            <div className={`my-4`}>
              <Spinner color="dark" />
            </div>
          </>
        )}
        {provider.data && provider.data.results && (
          <>
            <div className={`my-2`}>
              <ListGroup>
                <ListGroupItem className="form-body-i">
                  <strong>
                    {provider.data.results[0].basic.organization_name
                      ? `Facility`
                      : `Provider`}{" "}
                    Name:
                  </strong>{" "}
                  {provider.data.results[0].basic.organization_name
                    ? provider.data.results[0].basic.organization_name
                    : provider.data.results[0].basic.name}
                </ListGroupItem>
                {provider.data.results[0].other_names[0] && (
                  <ListGroupItem className="form-body-i">
                    <strong>Other Names: </strong>{" "}
                    {provider.data.results[0].other_names[0].organization_name}
                  </ListGroupItem>
                )}

                <ListGroupItem className="form-body-i">
                  <strong>
                    {provider.data.results[0].basic.organization_name
                      ? `Facility `
                      : `Provider `}{" "}
                    NPI:
                  </strong>{" "}
                  {provider.data.results[0].number}
                </ListGroupItem>

                <ListGroupItem className="form-body-i">
                  <strong>
                    {provider.data.results[0].basic.organization_name
                      ? `Facility `
                      : `Office `}{" "}
                    Address:
                  </strong>{" "}
                  {`${provider.data.results[0].addresses[0].address_1}, ${provider.data.results[0].addresses[0].city}, ${provider.data.results[0].addresses[0].state}`}
                </ListGroupItem>

                {provider.data.results[0].taxonomies.map((tax, idx) => (
                  <>
                    <ListGroupItem key={idx} className="form-body-i">
                      <strong>{tax.desc} Taxonomy: </strong> {tax.code}
                    </ListGroupItem>
                  </>
                ))}
              </ListGroup>
            </div>
          </>
        )}
      </div>
    </Suspense>
  );
};
export default NPIForm;

// Helper Functions
const validateNPI = (provNPI) => {
  const regex = /\d{10,}[a-z]*/;
  const valid = regex.test(provNPI);
  return valid ? true : false;
};

async function fetchProv(provNPI) {
  try {
    validateNPI(provNPI);
    let response = await axios.get(
      `https://cors-anywhere.herokuapp.com/https://npiregistry.cms.hhs.gov/api/?number=${provNPI}&version=2.0`
    );

    if (response.data) return response;
    else {
      return Error(`NPI invalid or not found`);
    }
  } catch (error) {
    alert(`NPI invalid or not found`);
    console.log(error);
  }
}
