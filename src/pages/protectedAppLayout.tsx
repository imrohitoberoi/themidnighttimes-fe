import React, { useEffect } from "react";
import { useAuthentication } from "../authentication/authenticationContext";
import { Outlet, useNavigate } from "react-router-dom";
import { Header } from "../components";

const ProtectedAppLayout = () => {
  const { user } = useAuthentication();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user?.token) {
      // navigate("/login");
    }
  }, [user]);

  return (
    <>
      <Header />
      <Outlet />
    </>
  ) 
};

export default ProtectedAppLayout;
