import { useEffect, useState } from "react";
import axios from "../../axiosInstance";
import FlightCard from "./FlightCard";
import EditFlightModal from "./EditFlightModal";
import "./FlightList.css";
import { fetchFlights } from "../../services/api";

const FlightList = () => {
    const [flights, setFlights] = useState([]);
    const [editingFlight, setEditingFlight] = useState(null);

    useEffect(() => {
        async function fetchData() {
            try {
                const data = await fetchFlights();
                setFlights(data);
            } catch (error) {
                alert("Error while fetching flights");
            }
        }
        fetchData();
    }, []);
    const handleDelete = async (id) => {
        try {
            await axios.delete(`/flights/${id}`);
            setFlights(flights.filter((flight) => flight._id !== id));
        } catch (error) {
            console.error("Error deleting flight:", error);
        }
    };
    const handleEdit = (flight) => {
        setEditingFlight(flight);
    };

    const handleCloseModal = () => {
        setEditingFlight(null);
    };

    const handleSave = async (updatedFlight) => {
        try {
            await axios.put(`/flights/${updatedFlight._id}`, updatedFlight);
            setFlights(flights.map((flight) => (flight._id === updatedFlight._id ? updatedFlight : flight)));
            setEditingFlight(null);
        } catch (error) {
            console.error("Error updating flight:", error);
        }
    };

    return (
        <>
            <div className="flight-list">
                {flights?.map((flight) => (
                    <FlightCard key={flight._id} flight={flight} onEdit={handleEdit} onDelete={handleDelete} />
                ))}
                {editingFlight && <EditFlightModal flight={editingFlight} onClose={handleCloseModal} onSave={handleSave} />}
            </div>
        </>
    );
};

export default FlightList;
