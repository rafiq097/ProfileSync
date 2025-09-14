import { appendRowToGoogleSheet } from "./providers/googleSheetsService.js";
import { postToSlack } from "./providers/slackService.js";
import { syncHubspotContact } from "./providers/hubspotService.js";

export const triggerIntegrations = async (user) => {
    const results = {};

    try {
        results.googleSheets = await appendRowToGoogleSheet(user);
    } catch (err) {
        results.googleSheets = { success: false, message: err.message };
    }

    try {
        results.slack = await postToSlack(user);
    } catch (err) {
        results.slack = { success: false, message: err.message };
    }

    try {
        results.hubspot = await syncHubspotContact(user);
    } catch (err) {
        results.hubspot = { success: false, message: err.message };
    }

    return results;
};
