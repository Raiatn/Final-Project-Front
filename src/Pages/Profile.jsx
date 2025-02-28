import React from "react";
import { useNavigate } from "react-router-dom";
import checkToken from "../checkTken";
import { useState,useEffect } from "react";
import { jwtDecode } from "jwt-decode";

const Profile = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  useEffect(() => {
    checkToken();
    const decoded = jwtDecode(localStorage.getItem("token"));
        setName(decoded.name);
        setEmail(decoded.email);
        setRole(decoded.role);
  }, []);

  const handleBack = () => {
    navigate(-1);
  };

  const handleLogout = ()=>{
    localStorage.removeItem("token");
    window.location.reload();
  }

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="bg-gradient-to-r from-bg-green to-project-green h-24"></div>

          <div className="relative px-6 pb-6">
            <div className="flex justify-center -mt-12"></div>

            <div className="text-center mt-12">
              <h2 className="text-xl font-bold text-gray-900">{name}</h2>
              <p className="text-gray-600 mt-1">Role: {role}</p>
              <p className="text-gray-500 mt-1">Email: {email}</p>
            </div>

              <div className="mt-6 flex justify-center flex-col gap-3">
              {role==="Provider" ? (<><span>Your Link:</span><a className="bg-gray-100 p-2 rounded-lg text-blue-400 flex justify-center" href={`${import.meta.env.VITE_URL}/appointments/${jwtDecode(localStorage.getItem("token")).settingId}`}>{import.meta.env.VITE_URL}/appointments/{jwtDecode(localStorage.getItem("token")).settingId}</a></>):null}

              <button
                onClick={handleBack}
                className="bg-gray-200 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-300 transition duration-300"
              >
                Back
              </button>
              <button
                onClick={handleLogout}
                className="bg-red-200 text-gray-800 px-4 py-2 rounded-md hover:bg-red-300 transition duration-300"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
