const BASE_URL = "https://spice.danielherlev.dk/api";

function handleHttpErrors(res) {
  if (!res.ok) {
    return res.json().then((err) => {
      throw { status: res.status, ...err };
    });
  }
  return res.json();
}

function apiFacade() {
  const setToken = (token) => {
    localStorage.setItem("jwtToken", token);
  };

  const getToken = () => {
    return localStorage.getItem("jwtToken");
  };

  const loggedIn = () => {
    return getToken() != null;
  };

  const logout = () => {
    localStorage.removeItem("jwtToken");
  };

  const login = async (username, password) => {
    const options = makeOptions("POST", false, { username, password });
    try {
      const res = await fetch(`${BASE_URL}/auth/login`, options).then(handleHttpErrors);
      setToken(res.token);
    } catch (error) {
      console.error("Login failed", error);
    }
  };

  const fetchData = async (endpoint) => {
    const options = makeOptions("GET", true); // Add token
    return fetch(`${BASE_URL}${endpoint}`, options).then(handleHttpErrors);
  };

  const makeOptions = (method, addToken, body) => {
    const opts = {
      method,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    };
    if (addToken && loggedIn()) {
      opts.headers["Authorization"] = `Bearer ${getToken()}`;
    }
    if (body) {
      opts.body = JSON.stringify(body);
    }
    return opts;
  };

  return {
    makeOptions,
    setToken,
    getToken,
    loggedIn,
    login,
    logout,
    fetchData,
  };
}

const facade = apiFacade();
export default facade;
