import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import Context from './context/Context'
import {Provider} from 'react-redux'
import store from './store'
import {Auth0Provider} from '@auth0/auth0-react';


ReactDOM.render(
  // <React.StrictMode>
    <Context>
    <BrowserRouter>
    <Provider store={store}>
      
      <Auth0Provider
        domain='agwork2304.us.auth0.com'
        clientId='csjOCwWk97WexpagNu7lHFxX933T01Ib'
        redirectUri={window.location.origin}>

      <App />

    </Auth0Provider>

    </Provider>  
    </BrowserRouter>
    </Context>
  // </React.StrictMode>
  ,
  document.getElementById('root')
);
