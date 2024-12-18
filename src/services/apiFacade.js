
const BASE_URL = "https://spice.danielherlev.dk/api";

function handleHttpErrors(res) {
  if (!res.ok) {
    if (res.status === 204) { // No Content
      return null;
    }
    return res.json().then((err) => {
      throw { status: res.status, ...err };
    });
  }
  return res.status === 204 ? null : res.json();
}

const apiFacade = () => {
 
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
    const response = await fetch(`${BASE_URL}/auth/login`, options);


    if (!response.ok){
      const errorData = await response.json();
      throw {
        status: response.status, message:errorData.msg || "Login failed"}
    };

    const data = await response.json();
    setToken(data.token);
    
  };


  

  const register = async (username, password) => {
    const options = makeOptions("POST", false, { username, password });
    const response = await fetch(`${BASE_URL}/auth/register`, options);
  
    if (!response.ok) {
      const error = await response.json();
      throw { status: response.status, message: error.warning || "Registration failed" };
    }
  
    return await response.json();
  };

  const fetchData = async (endpoint, method = "GET", body = null, authenticated = true) => {
    const options = makeOptions(method, authenticated, body);
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
    setToken,
    getToken,
    loggedIn,
    login,
    logout,
    register,
    fetchData, // Can handle GET, POST, PUT, DELETE with options

  };
}

const facade = apiFacade();
export default facade;
