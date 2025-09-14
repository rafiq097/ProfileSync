import mongoose from "mongoose";

const integrationEventSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "user_profiles", required: true },
    integration: { type: String, enum: ["googleSheets", "slack", "hubspot"], required: true },
    status: { type: String, enum: ["success", "failed"], required: true },
    message: { type: String },
    createdAt: { type: Date, default: Date.now },
});

const IntegrationEvent = mongoose.model("integration_events", integrationEventSchema);
export default IntegrationEvent;
