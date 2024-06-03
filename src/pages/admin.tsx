import { Box } from "@mui/material";
import { useAuthentication } from "../authentication/authenticationContext";
import { MostSearchedKeyword, Users } from "../components";
import AccessDeniedPage from "./accessDeniedPage";

/**
 * Component representing the admin dashboard.
 * Renders different content based on the user's role.
 * If the user is a staff member, it displays the Users and MostSearchedKeyword components.
 * If not, it redirects to the AccessDeniedPage.
 * @returns {JSX.Element} Admin component.
 */
function Admin() {
  const { user } = useAuthentication();

  return user?.is_staff ? (
    <Box sx={{ display: "flex", flexDirection: "column", gap: "40px" }}>
      <Users />
      <MostSearchedKeyword />
    </Box>
  ) : (
    <AccessDeniedPage />
  );
}

export default Admin;
