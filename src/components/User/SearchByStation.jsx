import { useState } from "react";
import FlightCard from "./FlightCard";
import "./Flights.css";
import SearchBar from "../SearchBar";

const SearchByStation = () => {
    const [flights, setFlights] = useState([]);

    return (
        <>
            <SearchBar onSetFlights={setFlights} />
            <div className="flights">
                {flights.map((flight) => (
                    <FlightCard key={flight._id} flight={flight} />
                ))}
            </div>
        </>
    );
};

export default SearchByStation;
