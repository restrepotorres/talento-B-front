import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { GoogleOAuthProvider,  } from "@react-oauth/google"
import { BrowserRouter } from 'react-router-dom'

ReactDOM.createRoot(document.getElementById('root')).render(
  <GoogleOAuthProvider clientId='668739241949-0fs99fbb6j32jdlt417dqk45tc7o0dd0.apps.googleusercontent.com'>
    <React.StrictMode>
      <BrowserRouter><App /></BrowserRouter>
      
    </React.StrictMode>
  </GoogleOAuthProvider>


  
)

