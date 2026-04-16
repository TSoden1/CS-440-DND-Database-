import { createBrowserRouter, RouterProvider, useNavigate } from 'react-router-dom'
import './App.css'
import Login from '../Frontend/Login/Login.jsx'
import Signup from '../Frontend/Signup/Signup.jsx'
import Profile from '../Frontend/Profile/Profile.jsx'

function HomePage() {
  const navigate = useNavigate()

  return (
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
            <button className="nav-signup" onClick={() => navigate('/Signup')}>
              Signup
            </button>
          </div>

          <div>
            <label>Login to your account!</label>
            <button className="nav-login" onClick={() => navigate('/Login')}>
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />
  },
  {
    path: '/Login',
    element: <Login />
  },
  {
    path: '/Signup',
    element: <Signup />
  },
  {
    path: '/Profile',
    element: <Profile />
  }
])

function App() {
  return <RouterProvider router={router} />
}

export default App