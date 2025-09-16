import axios from "axios";
import IntegrationEvent from "../models/integrationEvents.model.js";

export const pipeDriveService = async (user) => {
  try {
    const token = process.env.PIPEDRIVE_API_TOKEN;
    const baseUrl = process.env.PIPEDRIVE_BASE_URL;

    const FIRST_NAME_FIELD_KEY = process.env.FIRST_NAME_FIELD_KEY;
    const LAST_NAME_FIELD_KEY = process.env.LAST_NAME_FIELD_KEY;
    const PHONE_FIELD_KEY = process.env.PHONE_FIELD_KEY;
    const IS_MARRIED_FIELD_KEY = process.env.IS_MARRIED_FIELD_KEY;
    const CREATED_AT_FIELD_KEY = process.env.CREATED_AT_FIELD_KEY;

    if (!token || !baseUrl) {
      throw new Error("Missing Pipedrive configuration");
    }

    const fullName = `${user.firstName} ${user.lastName}`;
    
    const payload = {
      name: `${user.firstName} ${user.lastName}`,
      [FIRST_NAME_FIELD_KEY]: user.firstName,
      [LAST_NAME_FIELD_KEY]: user.lastName,
      [PHONE_FIELD_KEY]: user.phoneNumber,
      [IS_MARRIED_FIELD_KEY]: user.isMarried ? "True" : "False",
      [CREATED_AT_FIELD_KEY]: user.createdAt
        ? new Date(user.createdAt).toISOString()
        : new Date().toISOString(),
    };
    
    console.log(payload);

    const res = await axios.post(
      `${baseUrl}/persons?api_token=${token}`,
      payload,
      { headers: { "Content-Type": "application/json" } }
    );
    
    if (res.data && res.data.success) {
      const personId = res.data.data.id;
      
      console.log(`${fullName} added to pipedrive`);
      return { success: true, message: `Created person ${personId}` };
    } else {
      throw new Error("Failed to create person in Pipedrive");
    }
  } catch (error) {
    console.error("pipeDriveService Error:", error.message);

    await IntegrationEvent.create({
      userId: user._id,
      integration: "pipedrive",
      status: "failed",
      message: error.message,
    });

    return { success: false, message: error.message };
  }
};
