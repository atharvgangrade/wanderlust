const BASE_URL = "/api";

const api = {
    get: async (url) => {
        const response = await fetch(`${BASE_URL}${url}`, {
            credentials: "include",
        });
        return response.json();
    },

    post: async (url, data) => {
        const response = await fetch(`${BASE_URL}${url}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify(data),
        });
        return response.json();
    },

    postForm: async (url, formData) => {
        const response = await fetch(`${BASE_URL}${url}`, {
            method: "POST",
            credentials: "include",
            body: formData,
        });
        return response.json();
    },

    put: async (url, data) => {
        const response = await fetch(`${BASE_URL}${url}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify(data),
        });
        return response.json();
    },

    putForm: async (url, formData) => {
        const response = await fetch(`${BASE_URL}${url}`, {
            method: "PUT",
            credentials: "include",
            body: formData,
        });
        return response.json();
    },

    delete: async (url) => {
        const response = await fetch(`${BASE_URL}${url}`, {
            method: "DELETE",
            credentials: "include",
        });
        return response.json();
    },
};