import { useAuthentication } from "../authentication/authenticationContext";
import { Users } from "../components";
import AccessDeniedPage from "./accessDeniedPage";

function Admin() {
  const { user } = useAuthentication();

  return user?.is_staff ? <Users /> : <AccessDeniedPage />;
}

export default Admin;
