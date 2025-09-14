import mongoose from "mongoose";

const userProfileSchema = new mongoose.Schema({
    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, required: true, trim: true },
    phoneNumber: { type: String, required: true, match: /^\+?\d{10,15}$/ },
    isMarried: { type: Boolean, required: true },
    createdAt: { type: Date, default: Date.now }
});

const UserProfile = mongoose.model("user_profiles", userProfileSchema);
export default UserProfile;
