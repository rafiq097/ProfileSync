import mongoose from "mongoose";

const integrationEventSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "user_profiles", required: true },
  integration: { type: String, enum: ["googleSheets", "slack", "hubspot"], required: true },
  status: { type: String, enum: ["success", "failed"], required: true },
  message: { type: String },
  createdAt: {
    type: Date,
    default: () => {
      const now = new Date();
      return new Date(now.getTime() + (5.5 * 60 * 60 * 1000));
    }
  }
});


const IntegrationEvent = mongoose.model("integration_events", integrationEventSchema);
export default IntegrationEvent;
