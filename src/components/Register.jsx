// src/components/Register.js
import { useState, useContext, useEffect } from "react";
import { AuthContext } from "../AuthContext";
import { Link, useNavigate } from "react-router-dom";
import "./Register.css";

const Register = () => {
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const { register, auth } = useContext(AuthContext);
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await register(email, phone, password);
            alert("User registered");
            navigate("/login");
        } catch (err) {
            alert("Failed to register");
        }
    };

    useEffect(() => {
        if (auth?.loggedIn) {
            navigate("/");
        }
    }, [auth?.loggedIn, navigate]);

    return (
        <div className="register-container">
            <h1>Register</h1>
            <form className="register-form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </div>
                <div className="form-group">
                    <label htmlFor="phone">Phone Number</label>
                    <input id="phone" type="text" value={phone} onChange={(e) => setPhone(e.target.value)} required />
                    <small id="phoneHelp">Please add country code and without any symbols and spaces e.g +918059976629</small>
                </div>

                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                </div>

                <button type="submit">Register</button>
                <p>
                    Already have a account ? <Link to="/login">Login</Link> here.
                </p>
            </form>
        </div>
    );
};

export default Register;
