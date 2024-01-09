// Authenticate.jsx

import React, { useState } from 'react';

const Authenticate = ({ token }) => {
  const [authenticatedData, setAuthenticatedData] = useState(null);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const handleClick = async () => {
    try {
      // Actual API endpoint for authentication
      const apiUrl = "https://fsa-jwt-practice.herokuapp.com/authenticate";

      const response = await fetch(apiUrl, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`, // Pass the token in the Authorization header
        },
      });

      if (!response.ok) {
        // Handle non-2xx response
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      // Parse the response into a JavaScript object
      const result = await response.json();

      // Set the authenticated data in the component state
      setAuthenticatedData(result);
      // Clear any previous error if authentication is successful
      setError(null);

      // Set success message from the API result
      setSuccessMessage(result.message || "Authentication successful!");

      // Log the parsed result from the authentication API
      console.log(result);

      // Add any additional logic after a successful authentication

    } catch (error) {
      // Handle errors, e.g., token expiration, unauthorized access
      setError(error.message);
      console.error("Authentication failed:", error.message);
    }
  };

  return (
    <div>
      <h2>Authenticate</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
      <button onClick={handleClick}>Authenticate Token</button>
      {authenticatedData && (
        <div>
          <p>Authenticated Data:</p>
          <pre>{JSON.stringify(authenticatedData, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default Authenticate;