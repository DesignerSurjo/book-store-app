import MaintenanceModel from "../models/maintenanceModel.js";

// ✅ Get Maintenance Mode Status
export const getMaintenanceStatus = async (req, res) => {
    try {
        const maintainance = await MaintenanceModel.findOne();
        console.log("Fetched Maintenance Mode:", maintainance ? maintainance.maintenanceMode : 'No data found');
        res.json({ maintenanceMode: maintainance?.maintenanceMode || false });
    } catch (error) {
        console.error("Error fetching maintenance status:", error);
        res.status(500).json({ message: "Error fetching maintenance status" });
    }
};

// ✅ Toggle Maintenance Mode (Only Admin)
export const toggleMaintenanceMode = async (req, res) => {
    try {
        const { maintenanceMode } = req.body;
        // console.log("Requested Maintenance Mode:", maintenanceMode);  // Log the requested value

        let maintainance = await MaintenanceModel.findOne();
        if (maintainance) {
            maintainance.maintenanceMode = maintenanceMode;
            // console.log("Updating Maintenance Mode:", maintainance);  // Log the updated value
        } else {
            maintainance = new MaintenanceModel({ maintenanceMode });
            // console.log("Creating New Maintenance Entry:", maintainance);  // Log new entry creation
        }

        await maintainance.save();
        res.json({ success: true, message: `Maintenance mode ${maintenanceMode ? "enabled" : "disabled"}` });
    } catch (error) {
        console.error("Error updating maintenance status:", error);
        res.status(500).json({ message: "Error updating maintenance status" });
    }
};
