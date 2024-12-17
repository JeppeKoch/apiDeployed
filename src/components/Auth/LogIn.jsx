/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import facade from "../util/ApiFacade";

function LogIn() {
  const init = { username: "", password: "" };
  const [loginCredentials, setLoginCredentials] = useState(init);

  const performLogin = async (evt) => {
    evt.preventDefault();
    await facade.login(loginCredentials.username, loginCredentials.password);
  };

  const onChange = (evt) => {
    setLoginCredentials({
      ...loginCredentials,
      [evt.target.id]: evt.target.value,
    });
  };

  return (
    <form onSubmit={performLogin}>
      <input
        id="username"
        onChange={onChange}
        value={loginCredentials.username}
        placeholder="Username"
      />
      <input
        id="password"
        onChange={onChange}
        value={loginCredentials.password}
        placeholder="Password"
        type="password"
      />
      <button type="submit">Login</button>
    </form>
  );
}

export default LogIn;

