import { useState } from "react"
import { useNavigate } from 'react-router-dom'
import './Signup.css'
import axios from 'axios'

export default function signup() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");

    const navigate = useNavigate();

    const handleSignup = async (e) => {
        e.preventDefault();
        setError("");

        if (!username.trim() || !password.trim() || !email.trim()) {
            setError("Please fill in all fields.");
            return;
        }

        if (password.length < 8) {
            setError("Password must be at least 8 characters.");
            return;
        }

        try {
            const response = await axios.post('http://localhost:5174/Signup', {
                username,
                email,
                password
            });

            if (response.status === 200) {
                alert("Account created successfully!");
                navigate("/Login");
            }
        } catch (err) {
            console.error(err);
            setError(err.response?.data || "Signup failed. Please try again.");
        }
    };

    return(
        <>
        <div className="page">
            <div className="header">
                <h1>DNDatabase</h1>
            </div>

            <div className="center">
            <div className="login-box">

                <div className="signup-header">
                    <h2 className="signup-title">Signup</h2>
                </div>

                <div className="user-input">
                    <label>Email</label>
                    <input
                        type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter a valid email">
                    </input>
                </div>

                <div className="user-input">
                    <label>Username</label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        maxLength="20"
                        placeholder="Enter a valid username">
                    </input>
                </div>

                <div className="user-input">
                    <label>Password</label>
                    <input 
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter password">
                    </input>
                </div>

                <div>
                    <button className="signup-button" onClick={handleSignup}>Signup</button>
                </div>

                <div className="has-account">
                    <text>Already have an account?</text>
                    <button className ="link" onClick={() => navigate("/Login")}>Login</button>
                </div>


                
                </div>
            </div>        
        </div>
        </>
    );
}
