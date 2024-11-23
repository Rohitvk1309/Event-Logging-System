const express = require("express");
const router = express.Router();
const EventLog = require("../models/EventLog");
const crypto = require("crypto");

// Function to calculate hash
const calculateHash = (log) => {
  const data = `${log.eventType}${log.timestamp}${log.sourceAppId}${JSON.stringify(log.dataPayload)}${log.previousHash}`;
  return crypto.createHash("sha256").update(data).digest("hex");
};

// POST: Log an event
router.post("/log", async (req, res) => {
  const { eventType, sourceAppId, dataPayload } = req.body;

  if (!eventType || !sourceAppId || !dataPayload) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    const previousLog = await EventLog.findOne().sort({ timestamp: -1 });
    const previousHash = previousLog ? previousLog.hash : "0";

    const newLog = new EventLog({
      eventType,
      sourceAppId,
      dataPayload,
      previousHash,
    });

    newLog.hash = calculateHash(newLog);
    await newLog.save();

    res.status(201).json({ message: "Event logged successfully", log: newLog });
  } catch (err) {
    res.status(500).json({ error: "Failed to log event", details: err.message });
  }
});

// GET: Query events
router.get("/events", async (req, res) => {
  const { startDate, endDate, eventType, sourceAppId, page = 1, limit = 10 } = req.query;

  const query = {};
  if (startDate && endDate) query.timestamp = { $gte: new Date(startDate), $lte: new Date(endDate) };
  if (eventType) query.eventType = eventType;
  if (sourceAppId) query.sourceAppId = sourceAppId;

  try {
    const events = await EventLog.find(query)
      .sort({ timestamp: -1 })
      .skip((page - 1) * limit)
      .limit(parseInt(limit));
    res.json(events);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch events", details: err.message });
  }
});

module.exports = router;
