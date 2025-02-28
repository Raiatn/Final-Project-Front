import { useEffect, useState } from "react";
import axios from "axios";
import AppointmentList from "../components-of-the page/AppointmentList";
import Header from "../components-of-the page/Header";
import LoadingOverlay from "../components-of-the page/LoadingOverlay";
import checkToken from "../checkTken";
import { jwtDecode } from "jwt-decode";

function AppointmentsPage() {
  const [appointments, setAppointments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [role, setRole] = useState("");

  useEffect(() => {
    checkToken();
    const token = localStorage.getItem("token");
    const deCodedRoel = jwtDecode(token).role;
    setRole(deCodedRoel);
    async function fetchAppointments() {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/appointments-user`,
          {
            headers: {
              authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        
        setAppointments(Array.isArray(response.data) ? response.data : []);
      } catch (error) {
        
      } finally {
        setIsLoading(false);
      }
    }
    fetchAppointments();
  }, []);

  return (
    <>
      <Header />
      <div className=" items-center flex flex-col">
        <h2 className="flex font-semibold text-2xl mb-5 justify-self-center">
          Appointments
        </h2>
        {isLoading ? (
          <LoadingOverlay isLoading={true} />
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          <AppointmentList appointments={appointments} />
        )}
      </div>
    </>
  );
}

export default AppointmentsPage;
