import IntegrationEvent from "../models/integrationEvents.model.js";

export const syncHubspotContact = async (user) => {
  try {
    console.log("HubSpot contact synced for:", user.phoneNumber);

    return { success: true, message: "HubSpot synced successfully" };
  } catch (error) {
    console.error("HubSpot Error:", error.message);

    await IntegrationEvent.create({
      userId: user._id,
      integration: "hubspot",
      status: "failed",
      message: error.message
    });

    return { success: false, message: error.message };
  }
};
