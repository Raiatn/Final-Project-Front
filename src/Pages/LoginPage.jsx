import "../index.css";
import LoginForm from "../components-of-the page/LoginForm";
import Header from "../components-of-the page/Header";
import { useEffect } from "react";
import checkToken from "../checkTken";


const LoginPage = () => {
  useEffect(() => {
    checkToken();
  }, []);
  return (
    <>
    
      <Header />
      <LoginForm />
    </>
  );
};
export default LoginPage;
