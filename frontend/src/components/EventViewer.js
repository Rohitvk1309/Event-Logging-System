import React, { useState, useEffect } from "react";
import { getEvents } from "../api";

const EventViewer = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      const { data } = await getEvents();
      setEvents(data);
    };
    fetchEvents();
  }, []);

  return (
    <div>
      <h2>Event Logs</h2>
      {events.map((event) => (
        <div key={event._id}>
          <p>Event Type: {event.eventType}</p>
          <p>Source App ID: {event.sourceAppId}</p>
          <p>Data Payload: {JSON.stringify(event.dataPayload)}</p>
          <p>Timestamp: {new Date(event.timestamp).toLocaleString()}</p>
        </div>
      ))}
    </div>
  );
};

export default EventViewer;
