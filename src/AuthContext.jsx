// src/AuthContext.js
import { createContext, useState, useEffect } from "react";
import axios from "./axiosInstance";
import { loginUser, registerUser } from "./services/api";

export const AuthContext = createContext();

// eslint-disable-next-line react/prop-types
export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState(() => {
        const token = localStorage.getItem("token");
        const role = localStorage.getItem("role");
        return token ? { loggedIn: true, token, role } : null;
    });

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const token = localStorage.getItem("token");
                const response = await axios.get("/auth/profile", { headers: { Authorization: `Bearer ${token}` } });
                setAuth({ loggedIn: true, token: token, role: response.data.role });
                localStorage.setItem("role", response.data.role);
            } catch (err) {
                setAuth(null);
                localStorage.removeItem("token");
                localStorage.removeItem("role");
            }
        };

        checkAuth();
    }, []);

    const login = async (email, password) => {
        try {
            const data = await loginUser(email, password);
            setAuth({ loggedIn: true, token: data.token, role: data.role });
            localStorage.setItem("token", data.token);
            localStorage.setItem("role", data.role);
            return data;
        } catch (err) {
            console.error("Error logging in:", err);
        }
    };

    const register = async (email, phone, password) => {
        registerUser(email, phone, password);
    };

    const logout = async () => {
        localStorage.removeItem("token");
        setAuth(false);
    };

    return <AuthContext.Provider value={{ auth, setAuth, login, register, logout }}>{children}</AuthContext.Provider>;
};
