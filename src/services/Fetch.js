const BASE_URL = "https://spice.danielherlev.dk/api";

async function fetchGet(endpoint) {
    try {
        const response = await fetch(`${BASE_URL}${endpoint}`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error(`GET request failed for endpoint: ${endpoint}`, error);
    }
}

async function fetchPost(endpoint, data) {
    try {
        const response = await fetch(`${BASE_URL}${endpoint}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error(`POST request failed for endpoint: ${endpoint}`, error);
    }
}

async function fetchPut(endpoint, data) {
    try {
        const response = await fetch(`${BASE_URL}${endpoint}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error(`PUT request failed for endpoint: ${endpoint}`, error);
    }
}

async function fetchDelete(endpoint) {
    try {
        const response = await fetch(`${BASE_URL}${endpoint}`, {
            method: 'DELETE',
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error(`DELETE request failed for endpoint: ${endpoint}`, error);
    }
}

const api = {
    spices: {
        getAll: () => fetchGet("/spices/"),
        getById: (id) => fetchGet(`/spices/spice/${id}`),
        create: (data) => fetchPost("/spices/spice", data),
        update: (id, data) => fetchPut(`/spices/spice/${id}`, data),
        delete: (id) => fetchDelete(`/spices/spice/${id}`),
    },
    cuisines: {
        getAll: () => fetchGet("/cuisines/"),
        getById: (id) => fetchGet(`/cuisines/cuisine/${id}`),
        create: (data) => fetchPost("/cuisines/cuisine", data),
        update: (id, data) => fetchPut(`/cuisines/cuisine/${id}`, data),
        delete: (id) => fetchDelete(`/cuisines/cuisine/${id}`),
    },
    favorites: {
        getAll: () => fetchGet("/users/"),
        getByUserId: (userId) => fetchGet(`/users/${userId}/favorites`),
        createFavorite: (username, data) => fetchPost(`/${username}/favorites`, data),
        createSpiceFavorite: (username, spiceId) => fetchPost(`/${username}/favorites/spices/${spiceId}`),
        createCuisineFavorite: (username, cuisineId) => fetchPost(`/${username}/favorites/cuisines/${cuisineId}`),
        deleteFavorite: (userId, spiceId) => fetchDelete(`/users/${userId}/favorites/${spiceId}`),
    },
};
