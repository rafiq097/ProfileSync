import { appendRowToGoogleSheet } from "../services/googleSheetsService.js";
import { postToSlack } from "../services/slackService.js";
import { pipeDriveService } from "../services/pipeDriveService.js";

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
        results.pipedrive = await pipeDriveService(user);
    } catch (err) {
        results.pipedrive = { success: false, message: err.message };
    }

    return results;
};
