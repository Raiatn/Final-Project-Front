import "../index.css";
import Button from "../components-of-the page/Button";
import Header from "../components-of-the page/Header";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import checkToken from "../checkTken";

function Landing() {
  useEffect(() => {
    checkToken();
  }, []);

  const navigate = useNavigate();
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="flex flex-col md:flex-row flex-1 ">
        <div className="bg-gradient-to-b md:bg-gradient-to-r from-bg-green to-white w-full  md:w-1/2 h-[50vh] md:h-auto flex flex-col justify-start items-start p-4 font-extrabold text-4xl md:text-6xl text-white">
          <h2>Manage Your Time</h2>
          <span>With</span>
          <h1 className="bg-clip-text">Appointy</h1>
        </div>
        <div className="w-full md:w-1/2 h-[33vh] md:h-auto flex flex-col justify-center items-center gap-3">
          <Button text={"Log In"} event={() => navigate("/login")} />
          <span className="font-extrabold">or</span>
          <Button text={"Sign Up"} event={() => navigate("/signup")} />
        </div>
      </div>
    </div>
  );
}

export { Landing };