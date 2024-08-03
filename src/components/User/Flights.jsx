import { useState, useEffect, useContext } from "react";
import { toast } from "react-toastify";
import FlightCard from "./FlightCard";
import "./Flights.css";
import { AuthContext } from "../../AuthContext";
import { useSocket } from "../../useState";
import { fetchFlights, fetchSubscribedFlights, subscribeFlight, unSubscribeFlight } from "../../services/api";

const Flights = () => {
    const [flights, setFlights] = useState([]);
    const [subscribedFlights, setSubscribedFlights] = useState([]);
    const { auth } = useContext(AuthContext);
    const socket = useSocket();

    useEffect(() => {
        if (auth?.token) {
            fetchFlights().then(setFlights);
            fetchSubscribedFlights().then((data) => {
                setSubscribedFlights(data.map((sub) => sub.flightId));
            });
        }
    }, [auth?.token]);

    useEffect(() => {
        // Subscribe to flight updates
        if (socket) {
            socket.on("connect", () => {
                socket.emit("flightUpdates");

                // Listen for flight status updates
                socket.on("message", async ({ text }) => {
                    toast.info(text);
                    fetchFlights().then(setFlights);
                });
            });
        }

        return () => {
            socket?.off("message");
        };
    }, [socket]);

    const handleSubscribe = async (flightId) => {
        try {
            await subscribeFlight(flightId);
            setSubscribedFlights([...subscribedFlights, flightId]);
        } catch (error) {
            console.error("Error subscribing to flight:", error);
        }
    };

    const handleUnsubscribe = async (flightId) => {
        try {
            await unSubscribeFlight(flightId);
            setSubscribedFlights(subscribedFlights.filter((sub) => flightId !== sub));
        } catch (error) {
            console.error("Error unsubscribing from flight:", error);
        }
    };

    return (
        <div className="flights">
            {flights.map((flight) => (
                <FlightCard
                    key={flight._id}
                    flight={flight}
                    onSubscribe={handleSubscribe}
                    isSubscribed={subscribedFlights.includes(flight._id)}
                    onUnsubscribe={handleUnsubscribe}
                />
            ))}
        </div>
    );
};

export default Flights;
