import { useState } from "react";

const AddTrip = ({ onClose }: { onClose: any }) => {
  const [tripData, setTripData] = useState({
    tripId: "",
    source: "",
    dest: "",
    phoneNumber: "",
    transporter: "",
  });

  const transporters = ["Blue Dart", "DHL", "Delhivery", "Gati", "SafeExpress"];

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setTripData({ ...tripData, [name]: value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      // Send a POST request to add a new trip
      const response = await fetch("/api/trips", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(tripData),
      });

      if (response.ok) {
        const result = await response.json();
        console.log("Trip added:", result);
      } else {
        console.error("Error adding trip");
      }
    } catch (error) {
      console.error("Error:", error);
    }

    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50">
      <div className="bg-white p-8 rounded-lg w-full max-w-3xl">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold">Add Trip</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-800">
            &times;
          </button>
        </div>

        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">Trip Id</label>
            <input
              type="text"
              name="tripId"
              placeholder="Placeholder"
              value={tripData.tripId}
              onChange={handleChange}
              className="mt-1 p-2 w-full border border-gray-300 rounded-md"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Transporter</label>
            <select
              name="transporter"
              value={tripData.transporter}
              onChange={handleChange}
              className="mt-1 p-2 w-full border border-gray-300 rounded-md"
              required
            >
              <option value="" disabled>Select Option</option>
              {transporters.map((option, index) => (
                <option key={index} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Source</label>
            <input
              type="text"
              name="source"
              placeholder="Placeholder"
              value={tripData.source}
              onChange={handleChange}
              className="mt-1 p-2 w-full border border-gray-300 rounded-md"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Destination</label>
            <input
              type="text"
              name="dest"
              placeholder="Placeholder"
              value={tripData.dest}
              onChange={handleChange}
              className="mt-1 p-2 w-full border border-gray-300 rounded-md"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Phone</label>
            <input
              type="text"
              name="phoneNumber"
              placeholder="Placeholder"
              value={tripData.phoneNumber}
              onChange={handleChange}
              className="mt-1 p-2 w-full border border-gray-300 rounded-md"
              required
            />
          </div>
        </form>

        <div className="flex justify-end space-x-4 mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            Add Trip
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddTrip;
