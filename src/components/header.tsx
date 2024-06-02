import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import { useAuthentication } from "../authentication/authenticationContext";
import { useNavigate } from "react-router-dom";

const Header: React.FC = () => {
  const { user, logout } = useAuthentication();
  const navigate = useNavigate();

  const handleHomeClick = () => {
    navigate("/");
  };

  const handleSearchClick = () => {
    navigate("/search-news");
  };

  const handleHistoryClick = () => {
    navigate("/search-news-history");
  };

  const handleAdminClick = () => {
    navigate("/admin");
  };

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
              <Button color="inherit" onClick={handleHomeClick}>
                Logo
              </Button>
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
