import { useState } from "react";
import Appintment from "./Appintment";

function AppointmentList({ appointments}) {
  const [status, setStatus] = useState("Waiting");
  return (
    <>
      <div className=" mb-8 px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex flex-wrap justify-center gap-3 sm:gap-4 mb-6 bg-gray-900/80 p-4 rounded-xl shadow-lg">
          <button onClick={()=>{setStatus("Waiting")}} className="py-2 px-4 text-sm sm:text-base font-semibold text-white bg-purple-500 hover:bg-purple-600 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg">
            Waiting
          </button>
          <button onClick={()=>{setStatus("Reserved")}} className="py-2 px-4 text-sm sm:text-base font-semibold text-gray-800 bg-yellow-300 hover:bg-yellow-400 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg">
            Reserved
          </button>
          <button  onClick={()=>{setStatus("Completed")}}className="py-2 px-4 text-sm sm:text-base font-semibold text-white bg-green-500 hover:bg-green-600 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg">
            Completed
          </button>
          <button onClick={()=>{setStatus("Cancelled")}} className="py-2 px-4 text-sm sm:text-base font-semibold text-white bg-red-500 hover:bg-red-600 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg">
          Cancelled
          </button>
        </div>


        <div className="flex flex-wrap gap-6 justify-center items-start min-h-[200px] p-4 bg-gray-100 rounded-xl">
          {appointments.length === 0 ? (
            <p className="text-gray-500 text-lg font-medium animate-fade-in">
              You Don’t Have Any Appointments Yet
            </p>
          ) : (

            appointments.map((appointment) => (
              appointment.status === status && (
                <Appintment key={appointment.id} appointment={appointment} />
              )
            ))
          )}
          
        </div>
      </div>
    </>
  );
}

export default AppointmentList;