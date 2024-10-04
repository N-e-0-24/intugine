import React, { useState } from "react";

interface UpdateStatusProps {
  onClose: () => void;
  tripId: string | null;
}

const UpdateStatus: React.FC<UpdateStatusProps> = ({ onClose, tripId }) => {
  const [statusData, setStatusData] = useState({
    transporter: "",
    tripStartTime: "",
    currenStatus: "" // Keep the name consistent
  });

  const transporters = ["Blue Dart", "DHL", "Delhivery", "Gati", "SafeExpress"];
  const statuses = ["Booked", "In Transit", "Reached Destination", "Delivered"];

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    const { name, value } = e.target;
    setStatusData({ ...statusData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!tripId) {
      console.error("Trip ID not provided.");
      return;
    }

    const updatedData = {
      ...statusData,
      tripId
    };

    try {
      const response = await fetch(`/api/trips/`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedData)
      });

      if (response.ok) {
        console.log("Trip status updated successfully");
        onClose(); // Close the modal after update
      } else {
        console.error("Failed to update trip status");
      }
    } catch (error) {
      console.error("An error occurred while updating the trip status:", error);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50">
      <div className="bg-white p-8 rounded-lg w-full max-w-3xl">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold">Update Status for Trip {tripId}</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-800">
            &times;
          </button>
        </div>

        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">Transporter</label>
            <select
              name="transporter"
              value={statusData.transporter}
              onChange={handleChange}
              className="mt-1 p-2 w-full border border-gray-300 rounded-md"
              required
            >
              <option value="" disabled>Select Transporter</option>
              {transporters.map((option, index) => (
                <option key={index} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Trip Start Time</label>
            <input
              type="datetime-local"
              name="tripStartTime"
              value={statusData.tripStartTime}
              onChange={handleChange}
              className="mt-1 p-2 w-full border border-gray-300 rounded-md"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Current Status</label>
            <select
              name="currenStatus" // Corrected the name to match the state
              value={statusData.currenStatus}
              onChange={handleChange}
              className="mt-1 p-2 w-full border border-gray-300 rounded-md"
              required
            >
              <option value="" disabled>Select Status</option>
              {statuses.map((option, index) => (
                <option key={index} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>

          <div className="col-span-2 flex justify-end space-x-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
            >
              Update Status
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateStatus;
