import React, { useState } from "react";
import { logEvent } from "../api";

const EventLogger = () => {
  const [eventType, setEventType] = useState("");
  const [sourceAppId, setSourceAppId] = useState("");
  const [dataPayload, setDataPayload] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const event = { eventType, sourceAppId, dataPayload };
      await logEvent(event);
      alert("Event logged successfully!");
    } catch (err) {
      console.error(err);
      alert("Failed to log event");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Event Type"
        value={eventType}
        onChange={(e) => setEventType(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Source App ID"
        value={sourceAppId}
        onChange={(e) => setSourceAppId(e.target.value)}
        required
      />
      <textarea
        placeholder="Data Payload (JSON)"
        onChange={(e) => setDataPayload(JSON.parse(e.target.value))}
        required
      />
      <button type="submit">Log Event</button>
    </form>
  );
};

export default EventLogger;
