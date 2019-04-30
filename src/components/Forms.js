import React from 'react';
import { ProductConsumer } from '../context/context'; // Global State Context

import { Input, ListGroup, ListGroupItem, Button } from 'reactstrap';


const InitialForm = () => {

//    const [inputState, setinputState] = useState()

    /* Functions */
    const onClick = (e) => {
        
        e.preventDefault()
    }
    const handleSubmit = (e) => {
        e.preventDefault()
      }
    // const handleChange = (e, dispatch) => {
    //     dispatch({type: 'changing', payload: "changed"})
    //     e.preventDefault()
    // }


    return (
        <>
        <ProductConsumer>
            {state => {
                const {NPI, value} = state.state
                const {dispatch} = state
                return(
        <form onSubmit={onClick}>
            <ListGroup>
                <ListGroupItem className='form-body-i'>
                    <Input className='form-input' style={{display: 'flex-center'}} type="text" placeholder= {NPI} onChange={(e) => {dispatch({type: 'change', payload: e.target.value}); e.preventDefault() }}/>
                </ListGroupItem>
            </ListGroup>
            <br/>
            <Button outline color="primary" onClick={() => dispatch({type: 'change', payload: "changed"})}>Search</Button>
            <p>{NPI}</p>
            </form>
                )
            }
            }
        </ProductConsumer>
        </>
    )
}

export default InitialForm