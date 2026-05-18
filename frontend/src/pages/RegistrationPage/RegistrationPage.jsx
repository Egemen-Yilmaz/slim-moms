import React from "react";

const RegistrationPage = () => {
  return (
    <div>
      <h1>Registration Page</h1>

      <form>
        <label>
          Name:
          <input type="text" placeholder="name" />
        </label>

        <br />

        <label>
          Email:
          <input type="email" placeholder="email" />
        </label>

        <br />

        <label>
          Password:
          <input type="password" placeholder="password" />
        </label>

        <br />

        <button type="button">Register</button>
      </form>
    </div>
  );
};

export default RegistrationPage;
