import { useEffect, useState } from "react";
import checkToken from "../checkTken";
import AppointmentSettingForm from "../components-of-the page/AppointmentSettingForm";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import LoadingOverlay from "../components-of-the page/LoadingOverlay";

function AppintmentSettingPage() {
  const id = window.location.pathname.split("/")[2];
  const [userRole, setUserRole] = useState("Recipient");
  const [setting, setSetting] = useState({});

  useEffect(() => {
    checkToken();
    const token = localStorage.getItem("token");
    const deCoded = jwtDecode(token);

    async function getSetting() {
      try {
        const response = await fetchAppointmentSetting(id,token);
        setSetting(response);
        if (String(deCoded.settingId) === id) {
          setUserRole("Provider");
        }
      } catch (error) {
        console.error("Failed to fetch setting:", error);
      }
    }
    getSetting();
  }, [id]);

  async function fetchAppointmentSetting(id, token) {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/getappointmentsetting/${id}`,
        {
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error:", error.response?.data?.error || error.message);
      throw error;
    }
  }
  return (
    <>
      {setting.type ? (
        <>
          <AppointmentSettingForm
            pervEndTime={setting.lastAppointmentTime}
            userRole={userRole}
            setedDuration={setting.appointmentDuration}
            setedEndtime={setting.closingTime}
            setedStartTime={setting.openingTime}
            setedType={setting.type}
            id={id}
            token={localStorage.getItem("token")}
          />
        </>
      ) : (
        <LoadingOverlay isLoading={true} />
      )}
     
    </>
  );
}

export default AppintmentSettingPage;
