import axios from "axios";
import { useState } from "react";
import LoadingOverlay from "./LoadingOverlay";

function Appointment({ appointment }) {
  const [status, setStatus] = useState(appointment.status);
  const [note, setNote] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleCancel = async () => {
    setIsLoading(true);
    try {
      await axios.patch(
        `${import.meta.env.VITE_BASE_URL}/change-status`,
        { id: appointment.id, status: "Cancelled" },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        }
      );
      setStatus("Cancelled");
      window.location.reload();
    } catch (error) {
      console.error(error.response?.data || "Error changing status");
    } finally {
      setIsLoading(false);
    }
  };
  const readableDate = (iso) => new Date(iso).toLocaleDateString();

  const convertToReadableTime = time => {
    const [hours, minutes] = time.split(':');
    return `${hours}:${minutes}`;
  };


  return (
    <div className="flex flex-col font-bold justify-between w-3/5 md:w-max items-center border-2 rounded-xl shadow-lg bg-gray-50 flex-shrink-0">
      {isLoading ? <LoadingOverlay isLoading={true} /> : null}
      <div
        className=" cursor-pointer flex flex-col items-center w-full justify-evenly h-auto"
        onClick={() => setNote(note ? null : appointment.note)}
      >
        {note ? (
          <span className="p-5 text-gray-600">{appointment.note}</span>
        ) : (
          <>
            <span className="w-full flex justify-center text-white font-bold bg-gradient-to-r from-bg-green to-project-green p-5 rounded-t-xl">
              {appointment.name}
            </span>
            <div className="border-b-2">
              <span className="bg-gradient-to-r from-bg-green to-project-green text-transparent bg-clip-text">
                {convertToReadableTime(appointment.startTime)}
              </span>
              <span className="text-gray-600 font-normal"> To </span>
              <span className="bg-gradient-to-r from-bg-green to-project-green text-transparent bg-clip-text">
                {convertToReadableTime(appointment.endTime)}
              </span>
            </div>
            <span className="border-b-2">{readableDate(appointment.date)}</span>
            <span className="border-b-2">{status}</span>
          </>
        )}
      </div>
      <button
        className="rounded-t-xl mt-2 shadow-md px-2 bg-red-700 text-white transition-all focus:bg-red-600"
        onClick={handleCancel}
        disabled={status === "Cancelled"}
      >
        Cancel
      </button>
    </div>
  );
}

export default Appointment;
