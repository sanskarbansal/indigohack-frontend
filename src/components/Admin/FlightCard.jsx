/* eslint-disable react/prop-types */
import { useState } from "react";
import SendNotificationModal from "./SendNotificationModal";
import "./FlightCard.css";

const FlightCard = ({ flight, onEdit, onDelete }) => {
    const [showModal, setShowModal] = useState(false);

    const handleSendNotification = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    return (
        <div className="flight-card">
            <h3>{flight.flight_id}</h3>
            <p>
                <strong>Airline:</strong> {flight.airline}
            </p>
            <p>
                <strong>Status:</strong> {flight.status}
            </p>
            <p>
                <strong>Departure Gate:</strong> {flight.departure_gate}
            </p>
            <p>
                <strong>Arrival Gate:</strong> {flight.arrival_gate}
            </p>
            <p>
                <strong>Scheduled Departure:</strong> {new Date(flight.scheduled_departure).toLocaleString()}
            </p>
            <p>
                <strong>Scheduled Arrival:</strong> {new Date(flight.scheduled_arrival).toLocaleString()}
            </p>
            {flight.actual_departure && (
                <p>
                    <strong>Actual Departure:</strong> {new Date(flight.actual_departure).toLocaleString()}
                </p>
            )}
            {flight.actual_arrival && (
                <p>
                    <strong>Actual Arrival:</strong> {new Date(flight.actual_arrival).toLocaleString()}
                </p>
            )}
            <div className="card-buttons">
                <button onClick={() => onEdit(flight)}>Edit</button>
                <button onClick={() => onDelete(flight._id)}>Delete</button>
                <button onClick={handleSendNotification}>Send Notification</button>
            </div>

            {showModal && <SendNotificationModal flight={flight} onClose={handleCloseModal} />}
        </div>
    );
};

export default FlightCard;
