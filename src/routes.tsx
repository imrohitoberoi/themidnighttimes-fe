import { createBrowserRouter } from "react-router-dom";
import { Admin, Login, SearchNews } from "./pages";
import { ProtectedAppLayout } from "./pages/protectedAppLayout";

export const routes = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/",
    element: <ProtectedAppLayout />,
    children: [
      {
        index: true,
        element: <SearchNews />,
      },
      {
        path: "admin",
        element: <Admin />,
      },
      {
        path: "search-news",
        element: <SearchNews />,
      },
    ],
  },
  {
    path: "*",
    element: <h1>Not found</h1>,
  },
]);
