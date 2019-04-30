import React, { useReducer } from 'react';

function reducer(state, action) {
    switch (action.type) {
      case 'change':
        return {
            ...state,
            NPI: action.payload
        };
      case 'decrement':
        return state;
      default:
        throw new Error();
    }
  }


const initialState= {
    NPI: "enter NPI here", 
    value: ""
}

 const ProductContext = React.createContext();
 const ProductProvider = (props) => { 
    const [state, dispatch] = useReducer(reducer, initialState);

        return (
            <ProductContext.Provider value={{state, dispatch}}>
                {props.children}
            </ProductContext.Provider>
        );
    }

const ProductConsumer = ProductContext.Consumer;

export { ProductConsumer, ProductProvider};

