import React, { useState, useEffect, Suspense } from "react";
import axios from "axios";
import { Button, ListGroup, ListGroupItem, Input, Spinner } from "reactstrap";
import NavBar from "../NavBar";

// const provNPI = 1740389154;

const NPIForm = () => {
  const [provNPI, setProvNPI] = useState("");
  const [provider, setProvider] = useState({});
  const [loading, setLoading] = useState(false);
  const formattedProv = (provider) => {
    // if (provider.data) {
    //   if (provider.data.results) {
    return {
      provName: provider.data.results[0].basic.organization_name
        ? provider.data.results[0].basic.organization_name
        : provider.data.results[0].basic.name,
      provOtherName:
        provider.data.results[0].other_names.length > 0
          ? provider.data.results[0].other_names[0].organization_name
          : null,
      provAddress: provider.data.results[0].addresses
        .filter(onlyUnique)
        .map(
          (add, idx) =>
            `${add.address_1}, ${add.city}, ${
              add.state
            }, ${add.postal_code.slice(0, 5)}`
        ),
      provNPI: provider.data.results[0].number,
      provType: provider.data.results[0].basic.organization_name
        ? `Facility `
        : `Provider `
    };
    //   }
    // }
  };

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

  const copyProvInfo = (nameToUse) => {
    let textField = document.createElement("textarea");
    textField.innerText = `NPI: ${
      provider.data.results[0].number
    }/ ${nameToUse}, ${formattedProv(provider).provAddress}`;
    document.body.appendChild(textField);
    textField.style.fontWeight = "400";
    textField.select();
    document.execCommand("copy");
    textField.remove();
    return;
  };

  // If errors on search
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
                  {formattedProv(provider).provName}
                  <Button
                    outline
                    size={`sm`}
                    className={`my-0`}
                    value={`df`}
                    onClick={() => {
                      copyProvInfo(formattedProv(provider).provName);
                    }}
                    data-toggle="popover"
                    title="Copy info using this provider name"
                  >
                    Copy Info
                  </Button>
                </ListGroupItem>
                {formattedProv(provider).provOtherName !== null && (
                  <ListGroupItem className="form-body-i">
                    <strong>Other Names: </strong>{" "}
                    {formattedProv(provider).provOtherName}
                    <Button
                      outline
                      size={`sm`}
                      className={`my-0`}
                      value={`df`}
                      onClick={() => {
                        copyProvInfo(formattedProv(provider).provOtherName);
                      }}
                      data-toggle="popover"
                      title="Copy info using this provider name"
                    >
                      Copy Info
                    </Button>
                  </ListGroupItem>
                )}

                <ListGroupItem className="form-body-i">
                  <strong>{formattedProv(provider).provType} NPI:</strong>{" "}
                  {provider.data.results[0].number}
                </ListGroupItem>
                {provider.data.results[0].addresses
                  .filter(onlyUnique)
                  .map((add, idx) => (
                    <>
                      <ListGroupItem key={idx} className="form-body-i">
                        <strong>
                          {formattedProv(provider).provType} Address:
                        </strong>{" "}
                        {`${add.address_1}, ${add.city}, ${
                          add.state
                        }, ${add.postal_code.slice(0, 5)}`}
                      </ListGroupItem>
                    </>
                  ))}

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

// Validate NPI entered
const validateNPI = (provNPI) => {
  const regex = /\d{10,}[a-z]*/;
  const valid = regex.test(provNPI);
  return valid ? true : false;
};
// Make API with NPI entered
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
// Don't show the Mailing address
function onlyUnique(value, index, self) {
  return value.address_purpose === "MAILING";
}
