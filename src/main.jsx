import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider} from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import Login from '../Frontend/Login/Login.jsx'
import Signup from '../Frontend/Signup/Signup.jsx'

const router = createBrowserRouter([
  { path: '/', element: <App />},
  { path: '/Login', element: <Login />},
  { path: '/Signup', element: <Signup/>},
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
