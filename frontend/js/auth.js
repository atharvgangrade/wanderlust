const checkAuth = async () => {
    const data = await api.get("/auth/me");

    const loginBtn = document.getElementById("loginBtn");
    const signupBtn = document.getElementById("signupBtn");
    const logoutBtn = document.getElementById("logoutBtn");
    const usernameEl = document.getElementById("username");

    if(data.success) {
        localStorage.setItem("user", JSON.stringify(data.user));
        if(loginBtn) loginBtn.classList.add("d-none");
        if(signupBtn) signupBtn.classList.add("d-none");
        if(logoutBtn) logoutBtn.classList.remove("d-none");
        if(usernameEl) {
            usernameEl.textContent = `👤 ${data.user.username}`;
            usernameEl.classList.remove("d-none");
        }
    } else {
        localStorage.removeItem("user");
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
        localStorage.setItem("user", JSON.stringify(data.user));
        window.location.href = "/pages/index.html";
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
        window.location.href = "/pages/login.html";
    } else {
        errorMsg.textContent = data.message || "Signup failed!";
        errorMsg.classList.remove("d-none");
    }
};

const logout = async () => {
    await api.post("/auth/logout", {});
    localStorage.removeItem("user");
    window.location.href = "/pages/login.html";
};

const logoutBtn = document.getElementById("logoutBtn");
if(logoutBtn) {
    logoutBtn.addEventListener("click", (e) => {
        e.preventDefault();
        logout();
    });
}

checkAuth();