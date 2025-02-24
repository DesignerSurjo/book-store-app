import express from "express";
import { getMaintenanceStatus, toggleMaintenanceMode } from "../controllers/maintenanceController.js";
import adminAuth from "../middleware/adminAuth.js";

const maintenanceRouter = express.Router();

// ✅ Get Maintenance Status
maintenanceRouter.get("/get", getMaintenanceStatus);

// ✅ Toggle Maintenance Mode (Admin Only)
maintenanceRouter.post("/toggle", adminAuth, toggleMaintenanceMode);

export default maintenanceRouter;
