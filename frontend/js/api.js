const BASE_URL = "http://localhost:8080/api";

const api = {
    // GET request
    get: async (url) => {
        const response = await fetch(`${BASE_URL}${url}`, {
            credentials: "include",
        });
        return response.json();
    },

    // POST request
    post: async (url, data) => {
        const response = await fetch(`${BASE_URL}${url}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify(data),
        });
        return response.json();
    },

    // POST with form data (for image upload)
    postForm: async (url, formData) => {
        const response = await fetch(`${BASE_URL}${url}`, {
            method: "POST",
            credentials: "include",
            body: formData,
        });
        return response.json();
    },

    // PUT request
    put: async (url, data) => {
        const response = await fetch(`${BASE_URL}${url}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify(data),
        });
        return response.json();
    },

    // PUT with form data
    putForm: async (url, formData) => {
        const response = await fetch(`${BASE_URL}${url}`, {
            method: "PUT",
            credentials: "include",
            body: formData,
        });
        return response.json();
    },

    // DELETE request
    delete: async (url) => {
        const response = await fetch(`${BASE_URL}${url}`, {
            method: "DELETE",
            credentials: "include",
        });
        return response.json();
    },
};