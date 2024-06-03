import { RouterProvider } from "react-router-dom";
import { routes } from "./routes";
import { AuthenticationProvider } from "./authentication";

function App() {
  return (
    <AuthenticationProvider>
      <RouterProvider router={routes} />
    </AuthenticationProvider>
  );
}

export default App;
