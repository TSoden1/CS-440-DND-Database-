import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Login from '/Users/tylersoden/CS-440-DND-Database-/Frontend/Login/Login.jsx'
import Signup from '/Users/tylersoden/CS-440-DND-Database-/Frontend/Signup/Signup.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App /> 
  </StrictMode>,
)
