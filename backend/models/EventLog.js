const mongoose = require("mongoose");

const eventLogSchema = new mongoose.Schema({
  eventType: { type: String, required: true },
  timestamp: { type: Date, required: true, default: Date.now },
  sourceAppId: { type: String, required: true },
  dataPayload: { type: Object, required: true },
  hash: { type: String, required: true },
  previousHash: { type: String, required: true },
});

module.exports = mongoose.model("EventLog", eventLogSchema);
