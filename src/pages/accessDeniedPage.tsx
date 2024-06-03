/**
 * Component for displaying an access denied message.
 * This component is rendered when a user tries to access a page without proper authorization.
 * @returns {JSX.Element} AccessDeniedPage component.
 */
export default function AccessDeniedPage() {
  return (
    <div>
      <h1>Oops!</h1>
      <p>You don't have access to this page</p>
    </div>
  );
}
