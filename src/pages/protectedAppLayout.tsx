import React, { useEffect } from "react";
import { useAuthentication } from "../authentication/authenticationContext";
import { Outlet, useNavigate } from "react-router-dom";
import { Header } from "../components";
import { Box } from "@mui/material";

/**
 * Layout component for the protected application routes.
 * Renders a header and the content of the protected route.
 * Redirects to the login page if the user is not authenticated.
 * @returns {JSX.Element} ProtectedAppLayout component.
 */
const ProtectedAppLayout = () => {
  const { user } = useAuthentication();
  const navigate = useNavigate();

  // Redirect to login page if user is not authenticated
  useEffect(() => {
    if (!user?.token) {
      navigate("/login");
    }
  }, [user]);

  // Render header and content if user is authenticated
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
