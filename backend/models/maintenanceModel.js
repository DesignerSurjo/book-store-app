import mongoose from "mongoose";

// Define the schema for maintenance mode
const maintenanceSchema = new mongoose.Schema({
    maintenanceMode: { type: Boolean, default: false },
    updatedAt: { type: Date, default: Date.now }  // ✅ Last updated timestamp
});

// ✅ Ensure there's only one maintenance document
const Maintenance = mongoose.models.Maintenance || mongoose.model("Maintenance", maintenanceSchema);

export default Maintenance;


