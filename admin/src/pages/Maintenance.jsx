import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { backendUrl } from '../App';

const Maintenance = ({ token }) => {
    const [maintenanceMode, setMaintenanceMode] = useState(false);

    // ✅ Load Current Status
    useEffect(() => {
        // console.log("Fetching maintenance status...");
        axios.get(backendUrl + "/api/maintenance/get")
            .then((res) => {
            
                setMaintenanceMode(res.data.maintenanceMode);
            })
            .catch(() => {
                toast.error("Failed to fetch maintenance status");
            });
    }, [])
    // ✅ Toggle Maintenance Mode
    const toggleMaintenance = async () => {
        try {
            const newStatus = !maintenanceMode;
        

            const response = await axios.post(backendUrl + "/api/maintenance/toggle", 
                { maintenanceMode: newStatus }, 
                { headers: { token } });

        

            setMaintenanceMode(newStatus);
            toast.success(`Maintenance Mode ${newStatus ? "Enabled" : "Disabled"}`);
        } catch (error) {
            console.error('Error during API call:', error);
            toast.error("Failed to update maintenance mode");
        }
    };

    return (
        <div className="p-8 bg-white shadow-lg rounded-lg max-w-lg mx-auto mt-10">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Maintenance Settings</h1>

        <div className="flex justify-between items-center mb-4">
            <span className="text-lg text-gray-700">Maintenance Mode</span>
            <div 
                onClick={toggleMaintenance} 
                className={`relative inline-block w-14 h-8 transition duration-300 ease-in-out ${maintenanceMode ? 'bg-[#721587]' : 'bg-gray-400'} rounded-full cursor-pointer`}
            >
                <div
                    className={`absolute top-1 left-1 w-6 h-6 bg-white rounded-full shadow-md transition-all duration-300 ease-in-out ${maintenanceMode ? 'transform translate-x-6' : ''}`}
                ></div>
            </div>
        </div>

        <div className="text-center">
            <p className="text-sm text-gray-600">
                {maintenanceMode ? "Your site is currently in maintenance mode." : "Your site is live and available."}
            </p>
        </div>
    </div>
    );
};

export default Maintenance;
