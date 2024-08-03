import { useState, useEffect } from "react";
import axios from "../axiosInstance";
import { debounce } from "lodash";
import "./SearchBar.css";

const SearchBar = () => {
    const [query, setQuery] = useState("");
    const [flightIds, setFlightIds] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [showDropdown, setShowDropdown] = useState(false);

    // Debounced search function
    const debouncedSearch = debounce(async (searchQuery) => {
        if (searchQuery) {
            setIsLoading(true);
            try {
                const response = await axios.get(`/flights/search?search=${searchQuery}`);
                setFlightIds(response.data.map((flight) => flight.flight_id));
                setShowDropdown(true);
            } catch (error) {
                console.error("Error fetching flights:", error);
                setFlightIds([]);
                setShowDropdown(false);
            }
            setIsLoading(false);
        } else {
            setFlightIds([]);
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

    const handleClose = () => {
        setQuery("");
        setFlightIds([]);
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
            {!isLoading && showDropdown && flightIds.length > 0 && (
                <ul className="dropdown">
                    {flightIds.map((flightId, index) => (
                        <li key={index}>{flightId}</li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default SearchBar;
