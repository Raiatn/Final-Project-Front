import React, { useState } from "react";
import "../index.css";
import axios from "axios";
import LoadingOverlay from "./LoadingOverlay";

function SignUpForm({ setIsSubmited }) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("Recipient");
  const [isLoading, setIsLoading] = useState(false);

  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const validateInputs = () => {
    const nameRegex = /^[آ-یA-Za-z]+$/;
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[A-Za-z]{2,}$/;
    const passRegex = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d!@#$%^&*()-+=]{8,}$/;
    let valid = true;
    const newErrors = { firstName: "", lastName: "", email: "", password: "" };

    if (!nameRegex.test(firstName)) {
      newErrors.firstName = "Invalid format";
      valid = false;
    }
    if (!nameRegex.test(lastName)) {
      newErrors.lastName = "Invalid format";
      valid = false;
    }
    if (!emailRegex.test(email)) {
      newErrors.email = "Invalid email format";
      valid = false;
    }
    if (!passRegex.test(password)) {
      newErrors.password =
        "Password must be at least 8 characters, include one uppercase letter and one number";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({ firstName: "", lastName: "", email: "", password: "" });
    if (validateInputs()) {
      setIsLoading(true);
      try {
        const response = await axios.post(
          `${import.meta.env.VITE_BASE_URL}/signup`,
          {
            firstName,
            lastName,
            email,
            password,
            role,
          }
        );
       
        setIsSubmited(true);
      } catch (error) {
        console.error(error);
        setErrors((prev) => ({
          ...prev,
          email: "This Email Already Exists!",
        }));
      } finally {
        setIsLoading(false);
      }
    }
  };

  const toggleRole = () => {
    setRole((prevRole) =>
      prevRole === "Recipient" ? "Provider" : "Recipient"
    );
  };

  return (
    <>
      <LoadingOverlay isLoading={isLoading} />
      <form
        onSubmit={handleSubmit}
        className="absolute top-1/4 left-0 right-0 mx-auto z-50 flex flex-col bg-white max-w-md p-8 border border-gray-200 rounded-lg shadow-lg"
      >
        <h2 className="text-center text-2xl font-bold mb-6">Sign Up</h2>

        <div className="mb-4">
          <label
            htmlFor="firstName"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            First Name
          </label>
          <input
            type="text"
            id="firstName"
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter Your First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
          {errors.firstName && (
            <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>
          )}
        </div>

        <div className="mb-4">
          <label
            htmlFor="lastName"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Last Name
          </label>
          <input
            type="text"
            id="lastName"
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter Your Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
          {errors.lastName && (
            <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>
          )}
        </div>

        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter Your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          {errors.email && (
            <p className="text-red-500 text-xs mt-1">{errors.email}</p>
          )}
        </div>

        <div className="mb-4">
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter Your Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {errors.password && (
            <p className="text-red-500 text-xs mt-1">{errors.password}</p>
          )}
        </div>

        <div className="mb-6 flex items-center justify-between">
          <span className="text-sm text-gray-700">Recipient</span>
          <div
            onClick={toggleRole}
            className="w-12 h-6 bg-gray-300 rounded-full cursor-pointer relative"
          >
            <div
              className={`w-6 h-6 bg-white rounded-full shadow-md absolute top-0 transition-transform duration-300 ${
                role === "Provider" ? "transform translate-x-6" : ""
              }`}
            ></div>
          </div>
          <span className="text-sm text-gray-700">Provider</span>
        </div>

        <button
          type="submit"
          className="w-full py-3 px-7 bg-gradient-to-r from-bg-green to-project-green rounded-xl font-bold text-white text-xl transition-all hover:opacity-90"
        >
          Sign Up
        </button>
      </form>
    </>
  );
}

export default SignUpForm;
