const BASE_URL = "http://localhost:8080/api";

const getToken = () => localStorage.getItem("token");

const api = {
    get: async (url) => {
        const response = await fetch(`${BASE_URL}${url}`, {
            headers: {
                "Authorization": `Bearer ${getToken()}`,
            },
        });
        return response.json();
    },

    post: async (url, data) => {
        const response = await fetch(`${BASE_URL}${url}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${getToken()}`,
            },
            body: JSON.stringify(data),
        });
        return response.json();
    },

    postForm: async (url, formData) => {
        const response = await fetch(`${BASE_URL}${url}`, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${getToken()}`,
            },
            body: formData,
        });
        return response.json();
    },

    put: async (url, data) => {
        const response = await fetch(`${BASE_URL}${url}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${getToken()}`,
            },
            body: JSON.stringify(data),
        });
        return response.json();
    },

    putForm: async (url, formData) => {
        const response = await fetch(`${BASE_URL}${url}`, {
            method: "PUT",
            headers: {
                "Authorization": `Bearer ${getToken()}`,
            },
            body: formData,
        });
        return response.json();
    },

    delete: async (url) => {
        const response = await fetch(`${BASE_URL}${url}`, {
            method: "DELETE",
            headers: {
                "Authorization": `Bearer ${getToken()}`,
            },
        });
        return response.json();
    },
};