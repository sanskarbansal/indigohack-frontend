import { useState, useEffect } from "react";
import axios from "../axiosInstance";
import { debounce } from "lodash";
import "./SearchBar.css";

// eslint-disable-next-line react/prop-types
const SearchBar = ({ onSetFlights }) => {
    const [query, setQuery] = useState("");
    const [flights, setFlights] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [showDropdown, setShowDropdown] = useState(false);

    // Debounced search function
    const debouncedSearch = debounce(async (searchQuery) => {
        if (searchQuery) {
            setIsLoading(true);
            try {
                const response = await axios.get(`/flights/search?search=${searchQuery}`);
                setFlights(response.data.map((flight) => flight));
                setShowDropdown(true);
            } catch (error) {
                console.error("Error fetching flights:", error);
                setFlights([]);
                setShowDropdown(false);
            }
            setIsLoading(false);
        } else {
            setFlights([]);
            setShowDropdown(false);
        }
    }, 300);

    useEffect(() => {
        // Execute the debounced search when the query changes
        debouncedSearch(query);

        // Cleanup function to cancel debounce on unmount
        return () => {
            debouncedSearch.cancel();
        };
    }, [query]);

    useEffect(() => {
        if (onSetFlights) onSetFlights(flights);
    }, [flights, onSetFlights]);

    const handleClose = () => {
        setQuery("");
        setFlights([]);
        setShowDropdown(false);
    };

    return (
        <div className="search-bar">
            <input type="text" placeholder="Search flights..." value={query} onChange={(e) => setQuery(e.target.value)} />
            {query && (
                <button className="close-button" onClick={handleClose}>
                    X
                </button>
            )}
            {isLoading && <p>Loading...</p>}
            {!isLoading && showDropdown && flights.length > 0 && (
                <ul className="dropdown">
                    {flights.map((flight, index) => (
                        <li key={index}>
                            From: {flight?.from} <br /> To: {flight?.to}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default SearchBar;
