import { useState } from "react"
import { useNavigate } from 'react-router-dom'
import './Login.css'
import axios from "axios";

export default function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleLogin = async () => {
        setError(" ");
        if (!username.trim() || !password.trim()) {
            setError("Please fill in both fields.");
            return;
        }

    try {
        const response = await axios.post('http://localhost:3001/Login', 
            { username, password },
            { withCredentials: true }
        );

        if (response.status === 200) {
            navigate("/Profile");
        }
    } catch (err) {
        setError(err.response?.data?.message || "Invalid username or password");
    }

    };

    const navigate = useNavigate();

    return(
        <>
        <div className="page">
            <div className="header">
                <h1>DNDatabase</h1>
            </div>

            <div className="center">
            <div className="login-box">

                <div className="login-header" id="center">
                    <h2 className="login-title">Login</h2>
                </div>

                {error && <p style={{ color: "red", fontSize: "0.85rem" }}>{error}</p>}

                <div className="user-input">
                    <label>Username</label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        minlength="1"
                        maxLength="20"
                        placeholder="Enter username">
                    </input>
                </div>

                <div className="user-input">
                    <label>Password</label>
                    <input 
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        minlength="8"
                        placeholder="Enter password">
                    </input>
                </div>


                <div className="forgot">
                    <button className="link" onClick={() => alert("Please wait for email to reset password")}>Forgot Password?</button>
                </div>

                
                <div>
                    <button className="login-button" onClick={handleLogin}>Login</button>
                </div>


                <div className="no-account">
                    <text>Dont have an account?</text>
                    <button className ="link" onClick={() => navigate("/Signup")}>Sign Up</button>
                </div>

                </div>
            </div>        
        </div>
        </>
    );
}


