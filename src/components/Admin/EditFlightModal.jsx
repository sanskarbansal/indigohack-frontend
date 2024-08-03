/* eslint-disable react/prop-types */
import { useState, useEffect, useRef } from "react";
import "./EditFlightModal.css";

const EditFlightModal = ({ flight, onClose, onSave }) => {
    const [editedFlight, setEditedFlight] = useState({ ...flight });
    const modalRef = useRef();

    useEffect(() => {
        setEditedFlight({ ...flight });
    }, [flight]);
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (modalRef.current && !modalRef.current.contains(event.target)) {
                onClose();
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [onClose]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditedFlight({ ...editedFlight, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(editedFlight);
    };

    return (
        <div className="modal">
            <div className="modal-content" ref={modalRef}>
                <span className="close-button" onClick={onClose}>
                    &times;
                </span>
                <h2>Edit Flight</h2>
                <form onSubmit={handleSubmit}>
                    <label>
                        Flight ID:
                        <input type="text" name="flight_id" value={editedFlight.flight_id} onChange={handleChange} required />
                    </label>
                    <label>
                        Airline:
                        <input type="text" name="airline" value={editedFlight.airline} onChange={handleChange} required />
                    </label>
                    <label>
                        Status:
                        <select name="status" value={editedFlight.status} onChange={handleChange} required>
                            <option value="On Time">On Time</option>
                            <option value="Delayed">Delayed</option>
                            <option value="Cancelled">Cancelled</option>
                        </select>
                    </label>
                    <label>
                        Departure Gate:
                        <input type="text" name="departure_gate" value={editedFlight.departure_gate} onChange={handleChange} required />
                    </label>
                    <label>
                        Arrival Gate:
                        <input type="text" name="arrival_gate" value={editedFlight.arrival_gate} onChange={handleChange} required />
                    </label>
                    <label>
                        Scheduled Departure:
                        <input
                            type="datetime-local"
                            name="scheduled_departure"
                            value={new Date(editedFlight.scheduled_departure).toISOString().slice(0, -1)}
                            onChange={handleChange}
                            required
                        />
                    </label>
                    <label>
                        Scheduled Arrival:
                        <input
                            type="datetime-local"
                            name="scheduled_arrival"
                            value={new Date(editedFlight.scheduled_arrival).toISOString().slice(0, -1)}
                            onChange={handleChange}
                            required
                        />
                    </label>
                    <label>
                        Actual Departure:
                        <input
                            type="datetime-local"
                            name="actual_departure"
                            value={editedFlight.actual_departure ? new Date(editedFlight.actual_departure).toISOString().slice(0, -1) : ""}
                            onChange={handleChange}
                        />
                    </label>
                    <label>
                        Actual Arrival:
                        <input
                            type="datetime-local"
                            name="actual_arrival"
                            value={editedFlight.actual_arrival ? new Date(editedFlight.actual_arrival).toISOString().slice(0, -1) : ""}
                            onChange={handleChange}
                        />
                    </label>
                    <button type="submit">Save Changes</button>
                </form>
            </div>
        </div>
    );
};

export default EditFlightModal;
