import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import { createBrowserRouter, RouterProvider, useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import './App.css'
import Login from '../Frontend/Login/Login.jsx'
import Signup from '../Frontend/Signup/Signup.jsx'



function App() {

  return (
    <>
      <div className="page">
        <div className="header">
          <h1>DNDatabase</h1>
        </div>

        <div className="center">
        <div className="nav-box">

          <div className="nav-header">
            <h2 className="nav-title">Welcome!</h2>
          </div>

          <div>
            <label>Signup for an account!</label>
            <button className="nav-signup">Signup</button>
          </div>

          <div>
            <label>Login to your account!</label>
            <button className="nav-login" onClick={() => navigate("/Login")}>Login</button>
            
          </div>

        </div>
        </div>
      </div>
    </>
  )
}

export default App
