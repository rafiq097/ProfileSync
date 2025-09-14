import UserProfile from "../models/user.model.js";
import { triggerIntegrations } from "../utils/integrationService.js";

export const createUserProfile = async (req, res) => {
    try {
        const { firstName, lastName, phoneNumber, isMarried } = req.body;

        if (!firstName || !lastName || !phoneNumber || isMarried === undefined) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const newUser = await UserProfile.create({
            firstName,
            lastName,
            phoneNumber,
            isMarried
        });

        const integrationsStatus = await triggerIntegrations(newUser);

        return res.status(201).json({
            data: newUser,
            integrations: integrationsStatus,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error, try again later" });
    }
};
