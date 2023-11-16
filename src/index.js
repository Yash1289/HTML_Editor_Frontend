import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { GoogleOAuthProvider } from '@react-oauth/google';
import {render} from "react-dom";
import { BrowserRouter } from 'react-router-dom';


render(
  <GoogleOAuthProvider clientId = "888767537668-77co0ovkbl6kurh865l8lpfnpu6m4v5h.apps.googleusercontent.com">
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </GoogleOAuthProvider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
