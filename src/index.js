import React from 'react';
import ReactDOM from 'react-dom';
import { ProductProvider } from './context/context';


import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import App from './App';

ReactDOM.render(
    <ProductProvider><App/></ProductProvider>, 
    document.getElementById('root'));
