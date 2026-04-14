import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'

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
            <button className="nav-login">Login</button>
          </div>

        </div>
        </div>
      </div>
    </>
  )
}

export default App
