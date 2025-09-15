import axios from "axios";
import IntegrationEvent from "../models/integrationEvents.model.js";

export const postToSlack = async (user) => {
  const webhook = process.env.SLACK_WEBHOOK_URL;
  if (!webhook) {
    return { success: false, message: "Missing SLACK_WEBHOOK_URL" };
  }

  try {
    const payloadObj = {
      firstName: user.firstName,
      lastName: user.lastName,
      phoneNumber: user.phoneNumber,
      isMarried: user.isMarried,
      createdAt: user.createdAt
        ? new Date(user.createdAt).toISOString()
        : new Date().toISOString(),
    };

    const text =
      "A new submission with details:\n```" +
      JSON.stringify(payloadObj, null, 2) +
      "```";

    const res = await axios.post(webhook, { text });
    
    if (res.status == 200) {
      // console.log(res);
      
      return { success: true, message: "Slack notified" };
    } else {
      // console.log(res);
      
      const msg = `Slack returned ${res.status}`;
      await IntegrationEvent.create({
        userId: user._id,
        integration: "slack",
        status: "failed",
        message: msg,
      });
      return { success: false, message: msg };
    }
  } catch (err) {
    const message =
      err.response?.data || err.response?.statusText || err.message || String(err);

    await IntegrationEvent.create({
      userId: user._id,
      integration: "slack",
      status: "failed",
      message: String(message),
    });

    console.log(err);
    return { success: false, message: String(message) };
  }
};

