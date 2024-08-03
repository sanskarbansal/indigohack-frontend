import axios from "../axiosInstance";

export async function fetchSubscribedFlights() {
    try {
        const response = await axios.get("/user/subscriptions");
        return response.data;
    } catch (error) {
        console.error("Error fetching subscribed flights:", error);
    }
}
export async function fetchFlights() {
    try {
        const response = await axios.get("/flights");
        return response.data;
    } catch (error) {
        console.error("Error fetching flights:", error);
    }
}

export async function fetchNotifications() {
    try {
        const response = await axios.get("/notifications"); // Adjust this endpoint as per your backend
        return response.data;
    } catch (error) {
        console.error("Error fetching notifications:", error);
    }
}

export async function loginUser(email, password) {
    try {
        const response = await axios.post("/auth/login", { email, password });
        return response.data;
    } catch (error) {
        console.error("Error in login:", error);
    }
}
export async function registerUser(email, phone, password) {
    try {
        await axios.post(`/auth/register`, { email, phone, password });
    } catch (error) {
        console.error("Error while registering:", error);
    }
}

export async function subscribeFlight(flightId) {
    const { data } = await axios.post(`/user/subscribe/${flightId}`);
    return data;
}
export async function unSubscribeFlight(flightId) {
    const { data } = await axios.post(`/user/unsubscribe/${flightId}`);
    return data;
}

export async function fetchRecipients(flightId) {
    const { data } = await axios.get(`/user/subscriptions/${flightId}`);
    return data;
}

export async function createNotification(notification) {
    const { data } = await axios.post("/notifications", notification);
    return data;
}

export async function createNewFlight(newFlight) {
    const { data } = await axios.post("/flights", newFlight);
    return data;
}
