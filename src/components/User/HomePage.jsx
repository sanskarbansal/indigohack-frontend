import { Outlet } from "react-router-dom";
import Navbar from "./UserNavbar";

const HomePage = () => (
    <div>
        <Navbar />
        <Outlet />
    </div>
);

export default HomePage;
