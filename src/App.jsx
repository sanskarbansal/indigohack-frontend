// src/App.js
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

import { AuthProvider } from "./AuthContext";
import Register from "./components/Register";
import Login from "./components/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminHomePage from "./components/Admin/AdminHomePage";
import CreateFlight from "./components/Admin/CreateFlight";
import FlightList from "./components/Admin/FlightList";
import UserHomePage from "./components/User/HomePage";
import Flights from "./components/User/Flights";
import Notifications from "./components/User/Notifications";

const App = () => (
    <>
        <ToastContainer autoClose={false} />

        <AuthProvider>
            <Router>
                <Routes>
                    <Route path="/register" element={<Register />} />
                    <Route path="/login" element={<Login />} />

                    <Route
                        path=""
                        element={
                            <ProtectedRoute roles={["user"]}>
                                <UserHomePage />
                            </ProtectedRoute>
                        }
                    >
                        <Route path="/notifications" element={<Notifications />} />
                        <Route index element={<Flights />} />
                    </Route>

                    <Route
                        path="/admin"
                        element={
                            <ProtectedRoute roles={["admin"]}>
                                <AdminHomePage />
                            </ProtectedRoute>
                        }
                    >
                        <Route path="create-flight" element={<CreateFlight />} />
                        <Route index element={<FlightList />} />
                    </Route>
                </Routes>
            </Router>
        </AuthProvider>
    </>
);

export default App;
