import { useState, useContext, useEffect } from "react";
import { AuthContext } from "../AuthContext";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { login, auth } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const d = await login(email, password);
            if (d.role === "admin") navigate("/admin");
            else navigate("/");
        } catch (err) {
            alert("Failed to log in");
        }
    };
    useEffect(() => {
        if (auth?.loggedIn) {
            navigate("/");
        }
    }, [auth?.loggedIn, navigate]);

    return (
        <div className="login-container">
            <h1>Login</h1>
            <form className="login-form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="Email">Email</label>
                    <input id="email" type="text" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                </div>

                <button type="submit">Login</button>
                <p>
                    Do not have a account ? <Link to="/register">Register</Link> here.
                </p>
                {/* <button type="submit">Login</button> */}
            </form>
        </div>
    );
};

export default Login;
