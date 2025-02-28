import axios from "axios";

function checkToken() {
  const urlParams = new URLSearchParams(window.location.search);
  const firstLoginToken = urlParams.get("firstlogin");
  let token = localStorage.getItem("token");

  if (firstLoginToken) {
    if (typeof firstLoginToken === "string") {
      localStorage.setItem("token", firstLoginToken);
      token = firstLoginToken;
    } else {
      console.error("Invalid firstlogin token type");
      window.location.href = "/";
      return;
    }
  }

  const currentPath = window.location.pathname;

  if (!token ) {
    console.error("No token was found");
    if (currentPath !== "/login" && currentPath !== "/signup" && currentPath !== "/") {
      window.location.href = "/";
    }
    return;
  }

  if (typeof token === "string") {
    axios
      .get(`${import.meta.env.VITE_BASE_URL}/check-token`, {
        headers: {
          authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        console.log("Token validated successfully");
        if (currentPath === "/" || currentPath === "/login" || currentPath === "/signup") {
          window.location.href = "/Dashboard";
        }
      })
      .catch((error) => {
        console.error("Token validation failed", error);
        localStorage.removeItem("token");
        if (currentPath !== "/login" && currentPath !== "/signup" && currentPath !== "/") {
          window.location.href = "/";
        }
      });
  } else {
    console.error("Invalid token type");
    window.location.href = "/";
  }
}

export default checkToken;