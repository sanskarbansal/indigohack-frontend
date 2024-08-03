import { Link } from "react-router-dom";
import "./Navbar.css";
import { useContext } from "react";
import { AuthContext } from "../../AuthContext";

const Navbar = () => {
    const { logout } = useContext(AuthContext);
    return (
        <nav className="navbar">
            <div className="navbar-brand">Indigo</div>
            <div className="navbar-links">
                <Link to="/" className="nav-link">
                    Flights
                </Link>
                <Link to="/notifications" className="nav-link">
                    Notifications
                </Link>
            </div>
            <button className="logout-button" onClick={logout}>
                Logout
            </button>
        </nav>
    );
};

export default Navbar;
