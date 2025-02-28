import "../index.css";
import Header from "../components-of-the page/Header";
import SignUpForm from "../components-of-the page/SignUpForm";
import { useEffect, useState } from "react";
import checkToken from "../checkTken";

const SignUpPage = () => {
  const [isSubmited, setIsSubmited] = useState(false);
  useEffect(() => {
    checkToken();
  }, []);
  return (
    <>
      <Header />
      {isSubmited ? (
        <div className="absolute top-1/4 left-0 right-0 mx-auto z-49 flex flex-col items-center justify-center bg-white max-w-md p-6 border border-gray-300 rounded-lg shadow-md">
          <span className="font-bold text-lg bg-gradient-to-r from-bg-green to-project-green bg-clip-text text-transparent ">Check Your Email</span>
          <span>A link has been sent to your Email</span>
        </div>
      ) : (
        <SignUpForm setIsSubmited={setIsSubmited}/>
      )}
    </>
  );
};

export default SignUpPage;
