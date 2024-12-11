const BASE_URL = "https://spice.danielherlev.dk/api"; 

const getToken = () => {
  return localStorage.getItem("jwtToken");
};

async function fetchGet(endpoint, authenticated = false) {
  try {
    const headers = {
      "Content-Type": "application/json",
    };
    if (authenticated && getToken()) {
      headers["Authorization"] = `Bearer ${getToken()}`;
    }

    const response = await fetch(`${BASE_URL}${endpoint}`, { method: "GET", headers });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error(`GET request failed for endpoint: ${endpoint}`, error);
  }
}

async function fetchPost(endpoint, data, authenticated = false) {
  try {
    const headers = {
      "Content-Type": "application/json",
    };
    if (authenticated && getToken()) {
      headers["Authorization"] = `Bearer ${getToken()}`;
    }

    const response = await fetch(`${BASE_URL}${endpoint}`, {
      method: "POST",
      headers,
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error(`POST request failed for endpoint: ${endpoint}`, error);
  }
}

async function fetchPut(endpoint, data, authenticated = false) {
    try {
      const headers = {
        "Content-Type": "application/json",
      };
      if (authenticated && getToken()) {
        headers["Authorization"] = `Bearer ${getToken()}`;
      }
  
      const response = await fetch(`${BASE_URL}${endpoint}`, {
        method: "PUT",
        headers,
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error(`PUT request failed for endpoint: ${endpoint}`, error);
    }
  }
  
  async function fetchDelete(endpoint, authenticated = false) {
    try {
      const headers = {};
      if (authenticated && getToken()) {
        headers["Authorization"] = `Bearer ${getToken()}`;
      }
  
      const response = await fetch(`${BASE_URL}${endpoint}`, {
        method: "DELETE",
        headers,
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error(`DELETE request failed for endpoint: ${endpoint}`, error);
    }
  }
  

  export const api = {
    spices: {
      getAll: () => fetchGet("/spices/"),
      getById: (id) => fetchGet(`/spices/spice/${id}`),
      create: (data, authenticated = true) => fetchPost("/spices/spice", data, authenticated),
      update: (id, data, authenticated = true) => fetchPut(`/spices/spice/${id}`, data, authenticated),
      delete: (id, authenticated = true) => fetchDelete(`/spices/spice/${id}`, authenticated),
    },
    cuisines: {
      getAll: () => fetchGet("/cuisines/"),
      getById: (id) => fetchGet(`/cuisines/cuisine/${id}`),
      create: (data, authenticated = true) => fetchPost("/cuisines/cuisine", data, authenticated),
      update: (id, data, authenticated = true) => fetchPut(`/cuisines/cuisine/${id}`, data, authenticated),
      delete: (id, authenticated = true) => fetchDelete(`/cuisines/cuisine/${id}`, authenticated),
    },
    favorites: {
      getAll: (authenticated = true) => fetchGet("/users/", authenticated),
      getByUserId: (userId, authenticated = true) => fetchGet(`/users/${userId}/favorites`, authenticated),
      createFavorite: (username, data, authenticated = true) =>
        fetchPost(`/${username}/favorites`, data, authenticated),
      createSpiceFavorite: (username, spiceId, authenticated = true) =>
        fetchPost(`/${username}/favorites/spices/${spiceId}`, null, authenticated),
      createCuisineFavorite: (username, cuisineId, authenticated = true) =>
        fetchPost(`/${username}/favorites/cuisines/${cuisineId}`, null, authenticated),
      deleteFavorite: (userId, spiceId, authenticated = true) =>
        fetchDelete(`/users/${userId}/favorites/${spiceId}`, authenticated),
    },
  };
  
