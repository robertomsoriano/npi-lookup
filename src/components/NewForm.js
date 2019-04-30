import React, { Component } from 'react';
import { Button, ListGroup, ListGroupItem } from 'reactstrap';

class NewForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            provider : null,
            invalid : ''
        }
        this.runAPI = this.runAPI.bind(this)
    }

    runAPI(){
        const thisNPI = this.props.NPI
        const regex = /\d{10,}[a-z]*/;
        const valid = regex.test(thisNPI)
            
            if (valid){
            const myNPI= this.props.NPI
            const myToken = "3932f3b0-cfab-11dc-95ff-0800200c9a663932f3b0-cfab-11dc-95ff-0800200c9a66"
    
            var encodedURI= window.encodeURI('https://www.hipaaspace.com/api/npi/getcode?q='+ myNPI + '&token=' + myToken);
    
            fetch(encodedURI)
                .then(response => response.json())
                .then(data => {
                    this.setState({
                        provider : data,
                        loading: false
                    })
                    console.log(this.props.NPI)
                    console.log('API is working')
                    console.log(this.state.provider.NPI[0].OrgName || (this.state.provider.NPI[0].FirstName + " " + this.state.provider.NPI[0].LastName + ", " + this.state.provider.NPI[0].Credential) || "null")
                    
    
                })
                .catch(error => console.log('parsing failed', error))
    
            }
            else {
                return alert('enter valid NPI')
            }
    }

    
    render() {
        const entityType = this.state.loading ? "" : (this.state.provider.NPI[0].EntityType) || "null"
        //For Facilities
        const facName = this.state.loading ? "" : (this.state.provider.NPI[0].OrgName) || "null"
        const facOtherName = this.state.loading ? "" : (this.state.provider.NPI[0].OtherOrgName) || "null"
        const facNPI = this.state.loading ? "" : (this.state.provider.NPI[0].NPI) || "null"
        const facTaxonomy = this.state.loading ? "" : (this.state.provider.NPI[0].TaxonomyCode1) || "null"
        const facAddress = this.state.loading ? "" : (this.state.provider.NPI[0].PracticeLocationAddressCityName + ", " + this.state.provider.NPI[0].PracticeLocationAddressStateName) || "null"
        // For Individuals
        const clinicianName = this.state.loading ? "" : (this.state.provider.NPI[0].FirstName + " " + this.state.provider.NPI[0].LastName + ", " + this.state.provider.NPI[0].Credential) || "null"

       // const text= this.state.loading ? "Loading..." : ("NPI: " + facNPI 
       // + "- " + facName)
        
        return (
            <div className="container form-body" style={{display: 'flex-center'}}>
                
                <Button outline color="primary" onClick={this.runAPI || alert('enter valid NPI')}>Search</Button>
                
                
                <br />
                <br />
                {this.state.loading === false && entityType === "Organization" &&
                <div >
                <ListGroup >
                <ListGroupItem className='form-body-i'><strong>Facility Name:</strong> {facName}</ListGroupItem><br />
                <ListGroupItem className='form-body-i'><strong>Other Names:</strong>  {facOtherName}</ListGroupItem><br />
                <ListGroupItem className='form-body-i'><strong>Facility NPI:</strong>  {facNPI}</ListGroupItem><br />
                <ListGroupItem className='form-body-i'><strong>Facility Taxonomy:</strong> {facTaxonomy}</ListGroupItem><br />
                <ListGroupItem className='form-body-i'><strong>Facility Adress:</strong> {facAddress}</ListGroupItem><br />
                </ListGroup>
                </div>
                }
                {this.state.loading === false && entityType === "Individual" &&
                <div>
                 <ListGroup>
                <ListGroupItem className='form-body-i'><strong>Practitioner's Name:</strong> {clinicianName}</ListGroupItem><br />
                <ListGroupItem className='form-body-i'><strong>Other Names:</strong>  {facOtherName}</ListGroupItem><br />
                <ListGroupItem className='form-body-i'><strong>Clinician's NPI:</strong>  {facNPI}</ListGroupItem><br />
                <ListGroupItem className='form-body-i'><strong>Clinician's Taxonomy:</strong> {facTaxonomy}</ListGroupItem><br />
                <ListGroupItem className='form-body-i'><strong>Practice Adress:</strong> {facAddress}</ListGroupItem><br />
                </ListGroup>
                </div>
                }
                 
            </div>
        );
    }
}

export default NewForm;