import { use, useState } from "react";
import axios from "axios";
import LoadingOverlay from "./LoadingOverlay";
import { useNavigate } from "react-router-dom";

function AppointmentSettingForm({
  userRole,
  setedStartTime,
  setedEndtime,
  setedDuration,
  setedType,
  pervEndTime,
  token,
  id,
}) {
  
  const [appointmentType, setAppointmentType] = useState(setedType);
  const [startTime, setStartTime] = useState(setedStartTime);
  const [endTime, setEndTime] = useState(setedEndtime);
  const [duration, setDuration] = useState(setedDuration);
  const [selectedDate, setSelectedDate] = useState("");
  const today = new Date().toISOString().split("T")[0];
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const updateAppointmentSettings = async () => {
    setIsLoading(true);
    try {
      const requestData = {
        openingTime: startTime,
        closingTime: endTime,
        appointmentDuration: duration,
        type: appointmentType,
      };

      const response = await axios.patch(
        `${import.meta.env.VITE_BASE_URL}/update-Appointment-Settings/${id}`,
        requestData,
        {
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      navigate("/Dashboard");
    } catch (error) {
      setError(true);
      console.error("error updating the setting", error);
    } finally {
      setIsLoading(false);
    }
  };

  async function addAutoAppointment() {
    setIsLoading(true)
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/add-auto-appointment/${id}`, 
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Success:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error calling API:", error.response ? error.response.data : error.message);
      throw error; 
    }finally{
      setIsLoading(false)
    }
  }

  async function addStaticAppointment() {
    setIsLoading(true)
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/add-static-appointment/${id}`, 
        { date: selectedDate },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
      console.log("Success:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error calling API:", error.response ? error.response.data : error.message);
      throw error; 
    }finally{
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-bg-green">
      <LoadingOverlay isLoading={isLoading} />
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md"
      >
        <h2 className="text-2xl font-bold text-project-green mb-4">
          {userRole === "Provider" ? "Appointment Settings" : "Get Appointment"}
        </h2>

        {error && (
          <div className="text-red-500 mb-4">Unable to submit the Form!</div>
        )}

        {userRole === "Provider" ? (
          <>
            <div className="mb-4">
              <label className="block text-project-green mb-2">
                Appointment Type:
              </label>
              <div className="flex space-x-4">
                <button
                  type="button"
                  onClick={() => setAppointmentType("Auto")}
                  className={`px-4 py-2 rounded ${
                    appointmentType === "Auto"
                      ? "bg-project-green text-white"
                      : "bg-gray-200 text-gray-700"
                  }`}
                >
                  Auto
                </button>

                <button
                  type="button"
                  onClick={() => setAppointmentType("Static")}
                  className={`px-4 py-2 rounded ${
                    appointmentType === "Static"
                      ? "bg-project-green text-white"
                      : "bg-gray-200 text-gray-700"
                  }`}
                >
                  Static
                </button>
              </div>
            </div>

            {appointmentType === "Auto" && (
              <>
                <div className="mb-4">
                  <label className="block text-project-green">
                    Start Time:
                  </label>
                  <input
                    type="time"
                    value={startTime}
                    onChange={(e) => setStartTime(e.target.value)}
                    className="w-full p-2 border rounded"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-project-green">End Time:</label>
                  <input
                    type="time"
                    value={endTime}
                    onChange={(e) => setEndTime(e.target.value)}
                    className="w-full p-2 border rounded"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-project-green">
                    Duration per Appointment (minutes):
                  </label>
                  <input
                    type="number"
                    value={duration}
                    onChange={(e) => {
                      const val = e.target.value;
                      if (val >= 15 && val <= 90) setDuration(val);
                    }}
                    className="w-full p-2 border rounded"
                    min="15"
                    max="90"
                  />
                </div>
              </>
            )}
            {appointmentType === "Static" && (
              <p className="text-gray-600">
                Appointments will be set manually later.
              </p>
            )}
            <button
              onClick={() => {
                updateAppointmentSettings();
              }}
              type="submit"
              className="w-full bg-project-green text-white py-2 rounded hover:bg-bg-green"
            >
              Save
            </button>
          </>
        ) : (
          <>
            {appointmentType === "Static" ? (
              <>
                <div className="mb-4">
                  <label className="block text-project-green">
                    Select Date:
                  </label>
                  <input
                    type="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    min={today}
                    className="w-full p-2 border rounded"
                    required
                  />
                </div>
                <button
                  onClick={() => {
                    addStaticAppointment();
                  }}
                  type="submit"
                  className="w-full bg-project-green text-white py-2 rounded hover:bg-bg-green"
                >
                  Confirm Appointment
                </button>
              </>
            ) : (
              <>
                <div className="mb-4">
                  <label className="block text-project-green">Date:</label>
                  <input
                    type="date"
                    value={today}
                    disabled
                    className="w-full p-2 border rounded bg-gray-100"
                  />
                </div>
                <button
                  onClick={() => addAutoAppointment()}
                  type="submit"
                  className="w-full bg-project-green text-white py-2 rounded hover:bg-bg-green"
                >
                  Get an appointment
                </button>
              </>
            )}
          </>
        )}
      </form>
    </div>
  );
}

export default AppointmentSettingForm;