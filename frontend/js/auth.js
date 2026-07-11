const checkAuth = () => {
    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user") || "null");

    const loginBtn = document.getElementById("loginBtn");
    const signupBtn = document.getElementById("signupBtn");
    const logoutBtn = document.getElementById("logoutBtn");
    const usernameEl = document.getElementById("username");

    if(token && user) {
        if(loginBtn) loginBtn.classList.add("d-none");
        if(signupBtn) signupBtn.classList.add("d-none");
        if(logoutBtn) logoutBtn.classList.remove("d-none");
        if(usernameEl) {
            usernameEl.textContent = `👤 ${user.username}`;
            usernameEl.classList.remove("d-none");
        }
    } else {
        if(loginBtn) loginBtn.classList.remove("d-none");
        if(signupBtn) signupBtn.classList.remove("d-none");
        if(logoutBtn) logoutBtn.classList.add("d-none");
        if(usernameEl) usernameEl.classList.add("d-none");
    }
};

const login = async () => {
    const identifier = document.getElementById("loginIdentifier").value;
    const password = document.getElementById("loginPassword").value;
    const errorMsg = document.getElementById("errorMsg");

    if(!identifier || !password) {
        errorMsg.textContent = "Please fill all fields!";
        errorMsg.classList.remove("d-none");
        return;
    }

    const data = await api.post("/auth/login", {
        username: identifier,
        email: identifier,
        password,
    });

    if(data.success) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        window.location.href = "index.html";
    } else {
        errorMsg.textContent = data.message || "Login failed!";
        errorMsg.classList.remove("d-none");
    }
};

const signup = async () => {
    const username = document.getElementById("signupUsername").value;
    const email = document.getElementById("signupEmail").value;
    const password = document.getElementById("signupPassword").value;
    const errorMsg = document.getElementById("errorMsg");

    if(!username || !email || !password) {
        errorMsg.textContent = "Please fill all fields!";
        errorMsg.classList.remove("d-none");
        return;
    }

    const data = await api.post("/auth/register", {
        username,
        email,
        password,
    });

    if(data.success) {
        window.location.href = "login.html";
    } else {
        errorMsg.textContent = data.message || "Signup failed!";
        errorMsg.classList.remove("d-none");
    }
};

const logout = async () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "login.html";
};

const logoutBtn = document.getElementById("logoutBtn");
if(logoutBtn) {
    logoutBtn.addEventListener("click", (e) => {
        e.preventDefault();
        logout();
    });
}

checkAuth();