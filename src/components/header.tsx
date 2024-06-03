import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import { useAuthentication } from "../authentication/authenticationContext";
import { useNavigate } from "react-router-dom";

/**
 * Header Component
 * 
 * This component renders the application's header with navigation buttons
 * for searching news, viewing search history, accessing admin panel (if the user is a staff member),
 * and logging out. It utilizes the `useAuthentication` hook for user authentication state 
 * and the `useNavigate` hook for navigation.
 * 
 * @component
 */
const Header: React.FC = () => {
  const { user, logout } = useAuthentication();
  const navigate = useNavigate();

  /**
   * Handles the click event for the Search button.
   * Navigates to the search news page.
   */
  const handleSearchClick = () => {
    navigate("/search-news");
  };

  /**
   * Handles the click event for the History button.
   * Navigates to the search news history page.
   */
  const handleHistoryClick = () => {
    navigate("/search-news-history");
  };

  /**
   * Handles the click event for the Admin button.
   * Navigates to the admin panel.
   * This button is only rendered if the user is a staff member.
   */
  const handleAdminClick = () => {
    navigate("/admin");
  };

  /**
   * Handles the click event for the Logout button.
   * Logs the user out and navigates to the login page.
   */
  const handleLogoutClick = () => {
    logout();
    navigate("/login");
  };

  return (
    <Box sx={{ flexGrow: 1, marginBottom: "20px" }}>
      <AppBar position="static">
        <Toolbar variant="dense">
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <Box sx={{ display: "flex" }}>
              <Button color="inherit" onClick={handleSearchClick}>
                Search
              </Button>
              <Button color="inherit" onClick={handleHistoryClick}>
                History
              </Button>
              {user?.is_staff && (
                <Button color="inherit" onClick={handleAdminClick}>
                  Admin
                </Button>
              )}
            </Box>
            <Box>
              <Button color="inherit" onClick={handleLogoutClick}>
                Logout
              </Button>
            </Box>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Header;
