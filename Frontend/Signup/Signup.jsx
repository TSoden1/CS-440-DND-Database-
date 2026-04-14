import { useState } from "react"
import { useNavigate } from 'react-router-dom'
import './Signup.css'


export default function signup() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");

    const handleSignup = () => {
        setError(" ");
        if (!username.trim() || !password.trim() || !email.trim()) {
            setError("Please fill in all fields.");
            return;
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

                <div className="signup-header">
                    <h2 className="signup-title">Signup</h2>
                </div>

                <div className="user-input">
                    <label>Email</label>
                    <input
                        type="email"
                        placeholder="Enter a valid email">
                    </input>
                </div>

                <div className="user-input">
                    <label>Username</label>
                    <input
                        type="text"
                        minlength="1"
                        maxLength="20"
                        placeholder="Enter a valid username">
                    </input>
                </div>

                <div className="user-input">
                    <label>Password</label>
                    <input 
                        type="password"
                        minlength="8"
                        placeholder="Enter password">
                    </input>
                </div>

                <div>
                    <button className="signup-button">Signup</button>
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
