// src/socket.js
import { io } from "socket.io-client";

const socket = io("http://localhost:1337"); // Replace with your server URL

export default socket;
