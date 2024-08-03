import { Link } from "react-router-dom";
import "./Navbar.css";
import { useContext } from "react";
import { AuthContext } from "../../AuthContext";
const Navbar = () => {
    const { logout } = useContext(AuthContext);

    const handleLogout = () => {
        logout();
    };

    return (
        <nav className="navbar">
            <div className="brand">
                <Link to="/admin">Indigo</Link>
            </div>
            <div className="nav-links">
                <Link to="/admin/create-flight">Create New Flight</Link>
                <Link to="/admin">Fetch All Flights</Link>
            </div>
            <button className="logout-button" onClick={handleLogout}>
                Logout
            </button>
        </nav>
    );
};

export default Navbar;
