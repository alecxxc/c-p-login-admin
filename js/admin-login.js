const loginForm = document.getElementById("loginForm");
const loginButton = document.getElementById("loginButton");
const loginMessage = document.getElementById("loginMessage");

loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    loginMessage.textContent = "";
    loginButton.disabled = true;

    const username = loginForm.username.value;
    const password = loginForm.password.value;

    try {
        const res = await fetch('https://c-p-backend.onrender.com/api/admin/login', {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, password })
        });

        const result = await res.json();
        if (res.ok && result.token) {
            console.log(result.token);
            localStorage.setItem("jwtToken", result.token);
            window.location.href = "panel.html";
        } else {
            loginMessage.textContent = result.message || "Credenciales inválidas";
        }
    } catch (err) {
        loginError.textContent = "Error de conexión con el servidor";
    } finally {
        loginButton.disabled = false;
    }
});