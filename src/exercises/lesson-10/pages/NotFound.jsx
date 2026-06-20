import { useLocation, Link } from 'react-router';

function NotFound() {
  // EXERCISE 4B REQUIREMENT: Grab the current router location details
  const location = useLocation();

  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h2>404 - Page Not Found</h2>
      {/* Display the precise location pathname that failed matching */}
      <p style={{ color: 'red' }}>
        The path <code>{location.pathname}</code> does not exist.
      </p>

      <Link to="/">Return to Home</Link>
    </div>
  );
}

export default NotFound;
