import { RouterProvider } from "react-router-dom";
import { AuthenticationProvider } from "./authentication/authenticationContext";
import { routes } from "./routes";

function App() {
  return (
    <AuthenticationProvider>
      <RouterProvider router={routes} />
    </AuthenticationProvider>
  );
}

export default App;
