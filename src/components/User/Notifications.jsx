import { useState, useEffect } from "react";
import "./Notifications.css";
import { useSocket } from "../../useState";
import { fetchNotifications, fetchSubscribedFlights } from "../../services/api";

const Notifications = () => {
    const [notifications, setNotifications] = useState([]);
    const [subscribedFlights, setSubscribedFlights] = useState([]);
    const socket = useSocket();

    useEffect(() => {
        fetchNotifications().then(setNotifications);
        fetchSubscribedFlights().then((data) => {
            setSubscribedFlights(data?.map((sub) => sub.flightId));
        });
    }, []);
    useEffect(() => {
        if (socket) {
            // socket.on("connect", () => {
            console.log("Called", subscribedFlights);
            subscribedFlights.forEach((flightId) => {
                socket.emit("joinFlightRoom", { flightId });
            });
            socket.on("notification", (notification) => {
                console.log(notification);
                setNotifications([notification, ...notifications]);
            });
            // });
        }

        return () => {
            socket?.off("notification");
        };
    }, [notifications, socket, subscribedFlights]);

    return (
        <div className="notifications-container">
            <h2>Notifications</h2>
            {notifications.length === 0 ? (
                <p>No notifications available.</p>
            ) : (
                <ul className="notifications-list">
                    {notifications.map((notification) => (
                        <li key={notification._id} className="notification-item">
                            <p>
                                <strong>Flight ID:</strong> {notification.flight_id}
                            </p>
                            <p>
                                <strong>Message:</strong> {notification.message}
                            </p>
                            <p>
                                <strong>Timestamp:</strong> {new Date(notification.timestamp).toLocaleString()}
                            </p>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default Notifications;
