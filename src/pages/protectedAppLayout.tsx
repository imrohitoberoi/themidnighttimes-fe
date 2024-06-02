import React, { useEffect } from "react";
import { useAuthentication } from "../authentication/authenticationContext";
import { Outlet, useNavigate } from "react-router-dom";
import { Header } from "../components";
import { Box } from "@mui/material";

const ProtectedAppLayout = () => {
  const { user } = useAuthentication();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user?.token) {
      navigate("/login");
    }
  }, [user]);

  return user?.token ? (
    <>
      <Header />
      <Box sx={{ marginInline: "20px" }}>
        <Outlet />
      </Box>
    </>
  ) : null;
};

export default ProtectedAppLayout;
