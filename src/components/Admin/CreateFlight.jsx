import { useState } from "react";
import axios from "../../axiosInstance";
import "./CreateFlight.css";
import { createNewFlight } from "../../services/api";

const CreateFlight = () => {
    const [newFlight, setNewFlight] = useState({
        flight_id: "",
        airline: "",
        status: "On Time",
        departure_gate: "",
        arrival_gate: "",
        scheduled_departure: "",
        scheduled_arrival: "",
        actual_departure: "",
        actual_arrival: "",
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewFlight({
            ...newFlight,
            [name]: value,
        });
    };

    const handleCreateFlight = async (e) => {
        e.preventDefault();
        try {
            await createNewFlight(newFlight);
            setNewFlight({
                flight_id: "",
                airline: "",
                status: "On Time", // Reset to default value
                departure_gate: "",
                arrival_gate: "",
                scheduled_departure: "",
                scheduled_arrival: "",
                actual_departure: "",
                actual_arrival: "",
            });
        } catch (error) {
            console.error("Error creating flight:", error);
        }
    };

    return (
        <div className="create-flight-form">
            <h2>Create New Flight</h2>
            <form onSubmit={handleCreateFlight}>
                <label>
                    Flight ID:
                    <input type="text" name="flight_id" value={newFlight.flight_id} onChange={handleInputChange} required />
                </label>
                <label>
                    Airline:
                    <input type="text" name="airline" value={newFlight.airline} onChange={handleInputChange} required />
                </label>
                <label>
                    Status:
                    <select name="status" value={newFlight.status} onChange={handleInputChange} required>
                        <option value="On Time">On Time</option>
                        <option value="Delayed">Delayed</option>
                        <option value="Cancelled">Cancelled</option>
                    </select>
                </label>
                <label>
                    Departure Gate:
                    <input type="text" name="departure_gate" value={newFlight.departure_gate} onChange={handleInputChange} required />
                </label>
                <label>
                    Arrival Gate:
                    <input type="text" name="arrival_gate" value={newFlight.arrival_gate} onChange={handleInputChange} required />
                </label>
                <label>
                    Scheduled Departure:
                    <input type="datetime-local" name="scheduled_departure" value={newFlight.scheduled_departure} onChange={handleInputChange} required />
                </label>
                <label>
                    Scheduled Arrival:
                    <input type="datetime-local" name="scheduled_arrival" value={newFlight.scheduled_arrival} onChange={handleInputChange} required />
                </label>
                <label>
                    Actual Departure:
                    <input type="datetime-local" name="actual_departure" value={newFlight.actual_departure} onChange={handleInputChange} />
                </label>
                <label>
                    Actual Arrival:
                    <input type="datetime-local" name="actual_arrival" value={newFlight.actual_arrival} onChange={handleInputChange} />
                </label>
                <button type="submit">Create Flight</button>
            </form>
        </div>
    );
};

export default CreateFlight;
