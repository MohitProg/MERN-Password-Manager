import React, { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

const Auth = () => {
  const token = localStorage.getItem("token");
  const Navigate=useNavigate()
  console.log(token);

  useEffect(() => {
    if (!token) {
    //   window.location.href = "/login";
    Navigate("/login")
    }
  }, [token]);
  return <Outlet />;
};

export default Auth;
