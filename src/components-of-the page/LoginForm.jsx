import React, { useRef, useState } from 'react';
import axios from 'axios';
import "../index.css"
import { useNavigate } from 'react-router-dom';
import LoadingOverlay from './LoadingOverlay';

function LoginForm() {
  const navigate = useNavigate();
  const validation = useRef([false, false]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailAlert, setEmailAlert] = useState("");
  const [passwordAlert, setPasswordAlert] = useState("");
  const [isOverlayVisible, setIsOverlayVisible] = useState(false);
  const [isPassAndEmailValid, setIsPassAndEmailValid] = useState(validation);
  const [apiError, setApiError] = useState(""); 

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[A-Za-z]{2,}$/;
    if (!emailRegex.test(value)) {
      setEmailAlert("Invalid Email Format");
      validation.current[1] = false;
      setIsPassAndEmailValid(validation.current);
    } else {
      validation.current[1] = true;
      setIsPassAndEmailValid(validation.current);
      setEmailAlert("");
    }
    setApiError(""); 
  };

  const handlePassChange = (e) => {
    const value = e.target.value;
    setPassword(value);
    const passRegex = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d!@#$%^&*()-+=]{8,}$/;
    if (!passRegex.test(value)) {
      setPasswordAlert("Must include uppercase, number, and be 8+ chars.");
      validation.current[0] = false;
      setIsPassAndEmailValid(validation.current);
    } else {
      validation.current[0] = true;
      setIsPassAndEmailValid(validation.current);
      setPasswordAlert("");
    }
    setApiError(""); 
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setApiError(""); 
    if (validation.current[1] && validation.current[0]) {
      setIsOverlayVisible(true);
      try {
        const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/login`, {
          email: email,
          password: password 
        });
        localStorage.setItem("token", response.data.token);
        navigate("/Dashboard");
      } catch (error) {
        if (error.response) {
          if (error.response.status === 403) {
            setApiError("Wrong password, please try again!");
          } else if (error.response.status === 404) {
            setApiError("User not found!");
          } else {
            setApiError(error.response.data.error || "Something went wrong!");
          }
        } else {
          setApiError("Network error, please check your connection!");
        }
      } finally {
        setIsOverlayVisible(false);
      }
    } else {
      setApiError("Please fix the form errors before submitting!");
    }
  };

  return (
    <>
      <LoadingOverlay isLoading={isOverlayVisible}/>
      <form 
        onSubmit={handleSubmit} 
        className="absolute top-1/4 left-0 right-0 mx-auto z-49 flex flex-col bg-white max-w-md p-6 border border-gray-300 rounded-lg shadow-md"
      >
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium mb-1">
            Email
          </label>
          <input
            type="email"
            id="email"
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Please Enter Your Email"
            value={email}
            onChange={handleEmailChange}
            required
          />
        </div>
        <span className='font-extrabold text-[13px] text-red-600'>{emailAlert}</span>

        <div className="mb-4 mt-5">
          <label htmlFor="password" className="block text-sm font-medium mb-1">
            Password
          </label>
          <input
            type="password"
            id="password"
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Please Enter Your Password"
            value={password}
            onChange={handlePassChange}
            required
          />
        </div>
        <span className='font-extrabold text-[13px] text-red-600 mb-5'>{passwordAlert}</span>
        
        {apiError && (
          <div className='font-extrabold text-[13px] text-red-600 mb-5'>{apiError}</div>
        )}

        <button 
          type="submit" 
          className="p-3 px-7 flex bg-project-green w-fit rounded-xl font-bold text-white text-xl transition-all self-center bg-gradient-to-r from-bg-green to-project-green"
        >
          Login
        </button>
      </form>
    </>
  );
}

export default LoginForm;