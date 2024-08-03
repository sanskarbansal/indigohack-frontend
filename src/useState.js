// src/useSocket.js
import { useEffect, useState } from "react";
import { io } from "socket.io-client";

const SOCKET_URL = "http://localhost:1337"; // Change to your server URL

export const useSocket = () => {
    const [socket, setSocket] = useState(null);

    useEffect(() => {
        const socketInstance = io(SOCKET_URL);
        setSocket(socketInstance);

        return () => {
            socketInstance.disconnect();
        };
    }, []);

    return socket;
};
