import React, { useEffect, useState } from "react";
import checkToken from "../checkTken";
import Header from "../components-of-the page/Header";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendar } from "@fortawesome/free-regular-svg-icons";
import { faGears, faKey } from "@fortawesome/free-solid-svg-icons";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";

const Dashboard = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [id, setId] = useState(null);

  useEffect(() => {
    checkToken();
    const decoded = jwtDecode(localStorage.getItem("token"));
    setName(decoded.name);
    setEmail(decoded.email);
    setRole(decoded.role);
    if (decoded.role === "Provider") {
      
      setId(decoded.settingId);
    }
  }, []);

  return (
    <>
      <Header />
      <div className="flex flex-col items-center gap-16 px-4 py-8 ">
        <h2 className="font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-bg-green to-project-green text-3xl sm:text-4xl lg:text-5xl">
          Welcome {name}
        </h2>
        <button
          onClick={() => {
            navigate("/profile");
          }}
          className="bg-project-green border-2 border-project-green rounded-full flex flex-col items-center gap-2 p-4"
        >
          <FontAwesomeIcon
            icon={faUserCircle}
            className="text-white text-13xl"
          />
          <span className="font-bold text-bg-green border-4 border-project-green bg-white rounded-3xl px-4 py-1">
            Profile
          </span>
        </button>
        <div className="w-full max-w-md">
          <div
            className={`grid ${role === "Provider" ? "grid-cols-3" : "grid-cols-2"} gap-4`}
          >
            <button
              onClick={() => {
                navigate("/appoinments");
              }}
              className="flex flex-col items-center justify-center p-4 border-2 rounded-xl"
            >
              <FontAwesomeIcon
                icon={faCalendar}
                className="text-amber-600 text-5xl"
              />
              <span className="font-bold text-xs mt-2">Appointments</span>
            </button>
            <button
              onClick={() => {
                navigate("/change-password");
              }}
              className="flex flex-col items-center justify-center p-4 border-2 rounded-xl"
            >
              <FontAwesomeIcon
                icon={faKey}
                className="text-gray-400 text-5xl"
              />
              <span className="font-bold text-xs mt-2">Password</span>
            </button>
            {role === "Provider" ? (
              <>
                <button
                  onClick={() => {
                    navigate(`/appointments/${id}`);
                  }}
                  className="flex flex-col items-center justify-center p-4 border-2 rounded-xl"
                >
                  <FontAwesomeIcon
                    icon={faGears}
                    className="text-gray-400 text-5xl"
                  />
                  <span className="font-bold text-xs mt-2">
                    Appointment Settings
                  </span>
                </button>
              </>
            ) : null}
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;