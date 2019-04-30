import React, { Component } from 'react';
import NewForm from './components/NewForm'
import { Input, ListGroup, ListGroupItem } from 'reactstrap';

import './App.css';



class App extends Component {
  constructor(props) {
    super(props);
    this.state ={
      NPI: '',
      value:'',
      
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.child = React.createRef();
  }
  onClick = (e) => {
    const regex = /\d{10,}[a-z]*/;
    const valid = regex.test(this.state.NPI)
    if (valid){
      this.child.current.runAPI();
      this.setState({value: ''})
      e.preventDefault()
    }
    else {
      alert('enter valid NPI')
      e.preventDefault()
  }
    

  }

    handleChange(e){
      this.setState({value: e.target.value, NPI: e.target.value})
    }

    handleSubmit(e) {
      this.setState({NPI : this.state.value})
      e.preventDefault()
    }
  render() {
    return (
      <div className="App">
            <br />
            <h2 Heading className='heading'>NPI Lookup </h2>
            <hr />
            <form onSubmit={this.onClick}>
            
            <ListGroup>
                <ListGroupItem className='form-body-i'>
            <Input className='form-input' style={{display: 'flex-center'}} type="text" value={this.state.value} onChange={this.handleChange} placeholder= "enter NPI here"/>
            </ListGroupItem>
            </ListGroup>
            </form>
            <br />
            <NewForm NPI={this.state.NPI} ref={this.child}/>  
      </div>
    );
  }
}

export default App;
