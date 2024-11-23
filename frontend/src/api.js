import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5000/api" });

export const logEvent = (event) => API.post("/log", event);
export const getEvents = (params) => API.get("/events", { params });
