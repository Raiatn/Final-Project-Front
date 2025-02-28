import { useState ,useEffect} from "react";
import Header from "../components-of-the page/Header";
import axios from "axios";
import Button from "../components-of-the page/Button";
import { useNavigate } from "react-router-dom";

function ChangePasswordPage() {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [errors, setErrors] = useState({
    passwordError: "",
    newPasswordError: "",
  });
  const [message, setMessage] = useState("");

  function handleSubmit(event) {
    event.preventDefault();

    if (checkPass()) {
      const token = localStorage.getItem("token");
      axios
        .patch(
          `${import.meta.env.VITE_BASE_URL}/change-pass`,
          { password, newPassword },
          {
            headers: {
              authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        )
        .then((response) => {
          setMessage(response.data.message);
          setErrors({ passwordError: "", newPasswordError: "" });
          setPassword("");
          setNewPassword("");
        })
        .catch((error) => {
          if (error.response) {
            const status = error.response.status;
            const errorMsg = error.response.data.error;
            if (status === 404) {
              setMessage("User not found");
            } else if (status === 403) {
              setMessage("Wrong current password");
            } else if (status === 400) {
              setMessage("New password cannot be empty");
            } else if (status === 500) {
              setMessage("Server error, please try again later");
            } else {
              setMessage(errorMsg || "An error occurred");
            }
          } else {
            setMessage("Network error");
          }
        });
    }
  }

  function checkPass() {
    const passRegex = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d!@#$%^&*()-+=]{8,}$/;
    const errors = { passwordError: "", newPasswordError: "" };
    let isFormatCorrect = true;
    if (!passRegex.test(password)) {
      isFormatCorrect = false;
      errors.passwordError =
        "Password must be at least 8 characters, include one uppercase letter and one number";
    }
    if (!passRegex.test(newPassword)) {
      isFormatCorrect = false;
      errors.newPasswordError =
        "Password must be at least 8 characters, include one uppercase letter and one number";
    }
    setErrors(errors);
    return isFormatCorrect;
  }

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-start gap-4 pt-10 px-4">
        <div className="w-full max-w-md bg-white shadow-lg rounded-xl p-8">
          <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
            Change Password
          </h1>
          {message && (
            <div
              className={`text-center p-3 mb-4 rounded-md ${
                message.includes("successfully") ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
              }`}
            >
              {message}
            </div>
          )}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Current Password
              </label>
              <input
                type="password"
                id="password"
                placeholder="Enter your current password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md 
                           focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <p className="text-red-500 text-xs mt-1">{errors.passwordError}</p>
            </div>
            <div>
              <label
                htmlFor="new-password"
                className="block text-sm font-medium text-gray-700"
              >
                New Password
              </label>
              <input
                type="password"
                id="new-password"
                placeholder="Enter your new password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md 
                           focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <p className="text-red-500 text-xs mt-1">
                {errors.newPasswordError}
              </p>
            </div>
            <button
              type="submit"
              className="w-full py-2 px-4 bg-gradient-to-r from-bg-green to-project-green text-white font-semibold rounded-md 
                         focus:outline-none focus:ring-2"
            >
              Update Password
            </button>
          </form>
        </div>
        <Button text={"Back"} event={()=>{navigate("/Dashboard")}}/>
      </div>
    </>
  );
}

export default ChangePasswordPage;