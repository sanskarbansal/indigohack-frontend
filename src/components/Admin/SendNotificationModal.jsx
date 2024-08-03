/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import "./SendNotificationModal.css";
import { createNotification, fetchRecipients } from "../../services/api";

const SendNotificationModal = ({ flight, onClose }) => {
    const [method, setMethod] = useState("SMS");
    const [message, setMessage] = useState(`Your flight ${flight.flight_id} is ${flight.status}. Departure gate: ${flight.departure_gate}.`);
    const [recipients, setRecipients] = useState([]);
    const [selectedRecipients, setSelectedRecipients] = useState([]);
    const [selectAll, setSelectAll] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await fetchRecipients(flight._id);
                setRecipients(data);
                setSelectedRecipients(data.map((r) => r._id));
            } catch (error) {
                console.error("Error fetching recipients:", error);
            }
        };

        fetchData();
    }, [flight._id]);

    const handleSelectAll = () => {
        setSelectAll(!selectAll);
        setSelectedRecipients(!selectAll ? recipients.map((r) => r._id) : []);
    };

    const handleRecipientChange = (id) => {
        if (selectedRecipients.filter((r) => r === id).length === 1) {
            setSelectedRecipients(selectedRecipients.filter((r) => r !== id));
        } else {
            setSelectedRecipients([...selectedRecipients, id]);
        }
    };
    useEffect(() => {
        if (selectedRecipients.length === recipients.length) {
            setSelectAll(true);
        } else {
            setSelectAll(false);
        }
    }, [recipients.length, selectedRecipients.length]);

    const handleSend = async () => {
        try {
            const notification = {
                flight_id: flight._id,
                message,
                method,
                recipient: selectedRecipients,
            };

            await createNotification(notification);
            alert("Notification sent successfully");
            onClose();
        } catch (error) {
            console.error("Error sending notification:", error);
            alert("Failed to send notification");
        }
    };

    return (
        <div className="notification-modal">
            <h2>Send Notification</h2>
            <label>
                Method
                <select value={method} onChange={(e) => setMethod(e.target.value)}>
                    <option value="SMS">SMS</option>
                    <option value="Email">Email</option>
                    <option value="App">App</option>
                    <option value="All">All</option>
                </select>
            </label>
            <label>
                Message
                <textarea value={message} onChange={(e) => setMessage(e.target.value)}></textarea>
            </label>
            <label>
                Select All Recipients
                <input type="checkbox" checked={selectAll} onChange={handleSelectAll} />
            </label>
            <div className="recipients-list">
                {recipients.map((recipient) => (
                    <label key={recipient._id}>
                        {recipient.email}
                        <input
                            type="checkbox"
                            checked={selectedRecipients.filter((r) => r === recipient._id).length === 1}
                            onChange={() => handleRecipientChange(recipient._id)}
                        />
                    </label>
                ))}
            </div>
            <button onClick={handleSend}>Send</button>
            <button onClick={onClose}>Close</button>
        </div>
    );
};

export default SendNotificationModal;
