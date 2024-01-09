// SignUpForm.jsx

import React, { useState } from 'react';

const SignUpForm = ({ setToken }) => {
  // State variables for form inputs
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Actual API endpoint
      const apiUrl = "https://fsa-jwt-practice.herokuapp.com/signup";

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: username,
          password: password,
        }),
      });

      if (!response.ok) {
        // Handle non-2xx response
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      // Parse the response into a JavaScript object
      const result = await response.json();

      // Set the token using the setToken function from props
      setToken(result.token);

      // Reset the form and clear any previous error
      setUsername("");
      setPassword("");
      setError(null);

      console.log("Form submitted successfully!");

      // Log the parsed result from the API
      console.log(result);

      // Add any additional logic after a successful form submission

    } catch (error) {
      // Handle errors and set the error state
      setError(error.message);
    }
  };

  return (
    <div>
      <h2>Sign Up</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Username:
            <input
              type="text"
              value={username}
              onChange={handleUsernameChange}
            />
          </label>
        </div>
        <div>
          <label>
            Password:
            <input
              type="password"
              value={password}
              onChange={handlePasswordChange}
            />
          </label>
        </div>
        <div>
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default SignUpForm;