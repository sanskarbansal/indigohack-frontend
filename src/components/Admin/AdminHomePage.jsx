import { Outlet } from "react-router-dom";
import Navbar from "./AdminNavbar";
import "./AdminHomePage.css";

const AdminHomePage = () => {
    return (
        <div className="admin-home-page">
            <Navbar />
            <div className="content">
                <Outlet />
            </div>
        </div>
    );
};

export default AdminHomePage;
