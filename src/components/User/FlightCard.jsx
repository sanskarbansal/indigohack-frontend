/* eslint-disable react/prop-types */
import "./FlightCard.css";

const FlightCard = ({ flight, isSubscribed, onSubscribe, onUnsubscribe }) => (
    <div className="flight-card">
        <h3>{flight.flight_id}</h3>
        <p>
            <b>Airline</b>: {flight.airline}
        </p>
        <p>
            <b>Status:</b> {flight.status}
        </p>
        <p>
            <b>Departure Gate</b>: {flight.departure_gate}
        </p>
        <p>
            <b>Arrival Gate</b>: {flight.arrival_gate}
        </p>
        <p>
            <b>Scheduled Departure</b>: {new Date(flight.scheduled_departure).toLocaleString()}
        </p>
        <p>
            <b>Scheduled Arrival</b>: {new Date(flight.scheduled_arrival).toLocaleString()}
        </p>
        <button className={`${isSubscribed && "unsubscribed"}`} onClick={() => (isSubscribed ? onUnsubscribe(flight._id) : onSubscribe(flight._id))}>
            {isSubscribed ? "Unsubscribe" : "Subscribe"}
        </button>
    </div>
);

export default FlightCard;
