import axios from "axios";
import IntegrationEvent from "../models/integrationEvents.model.js";

export const appendRowToGoogleSheet = async (user) => {
  try {
    if (!process.env.GOOGLE_APPS_SCRIPT_URL) {
      throw new Error("Missing GOOGLE_APPS_SCRIPT_URL in env");
    }

    const response = await axios.post(process.env.GOOGLE_APPS_SCRIPT_URL, {
      firstName: user.firstName,
      lastName: user.lastName,
      phoneNumber: user.phoneNumber,
      isMarried: user.isMarried
    });

    const result = response.data;

    if (result.success) {
      console.log(result);
      console.log("Google Sheets Row Added:", user);

      return { success: true, message: result.message };
    } else {
      console.log(result.message);
      await IntegrationEvent.create({
        userId: user._id,
        integration: "googleSheets",
        status: "failed",
        message: result.message
      });

      return { success: false, message: result.message };
    }
  } catch (error) {
    console.error("Google Sheets Error:", error.message);
    await IntegrationEvent.create({
      userId: user._id,
      integration: "googleSheets",
      status: "failed",
      message: error.message
    });

    return { success: false, message: error.message };
  }
};

