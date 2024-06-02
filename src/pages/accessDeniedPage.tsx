import { useRouteError } from "react-router-dom";

export default function AccessDeniedPage() {
  const error = useRouteError();

  return (
    <div>
      <h1>Oops!</h1>
      <p>You don't have access to this page</p>
    </div>
  );
}
