import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './assets/stylesheets/index.css';
import { BrowserRouter } from 'react-router-dom';
import 'ulog';

ReactDOM.render(
    <BrowserRouter>
        <App/>
    </BrowserRouter>,
    document.getElementById( 'root' ),
);
