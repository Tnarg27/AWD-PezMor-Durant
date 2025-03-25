document.addEventListener("DOMContentLoaded", function () {
    console.log("✅ Script loaded successfully.");

    /* ✅ JS for Hamburger Menu */
    const hamburger = document.querySelector(".hamburger");
    const navMenu = document.querySelector("#nav-menu");

    if (hamburger && navMenu) {
        hamburger.addEventListener("click", function () {
            navMenu.classList.toggle("active");
        });
    }

    /* ✅ JS for Login Popup */
    const loginTrigger = document.querySelector(".login-trigger");
    const loginPopup = document.createElement("div");
    loginPopup.id = "login-popup";
    loginPopup.innerHTML = `
        <div class="popup-overlay"></div>
        <div class="popup-content">
            <span class="close-btn">&times;</span>
            <h2>Login</h2>
            <form id="login-form">
                <div class="input-group">
                    <label for="username">Username:</label>
                    <input type="text" id="username" required>
                </div>
                <div class="input-group">
                    <label for="password">Password:</label>
                    <input type="password" id="password" required>
                </div>
                <div class="role-selection">
                    <label><input type="radio" name="role" value="admin" required> Admin</label>
                    <label><input type="radio" name="role" value="reviewer" required> Food Reviewer</label>
                </div>
                <button type="submit" class="login-btn">Login</button>
            </form>
        </div>
    `;
    document.body.appendChild(loginPopup);

    const overlay = loginPopup.querySelector(".popup-overlay");
    const closeBtn = loginPopup.querySelector(".close-btn");
    const loginForm = document.getElementById("login-form");

    if (loginTrigger) {
        loginTrigger.addEventListener("click", function (e) {
            e.preventDefault();
            loginPopup.style.display = "block";
            overlay.style.display = "block";
        });
    }

    if (closeBtn && overlay) {
        closeBtn.addEventListener("click", function () {
            loginPopup.style.display = "none";
            overlay.style.display = "none";
        });

        overlay.addEventListener("click", function () {
            loginPopup.style.display = "none";
            overlay.style.display = "none";
        });
    }

    /* ✅ Secure User Login Handling */
    function getUsers() {
        return JSON.parse(localStorage.getItem("users")) || {};
    }

    if (loginForm) {
        loginForm.addEventListener("submit", function (e) {
            e.preventDefault();
            const username = document.getElementById("username").value.trim();
            const password = document.getElementById("password").value.trim();
            const role = document.querySelector("input[name='role']:checked");

            if (!role) {
                alert("❌ Please select a role!");
                return;
            }

            let users = getUsers();
            if (users[username] && atob(users[username].password) === password && users[username].role === role.value) {
                const authToken = btoa(username + ":" + role.value + ":" + Date.now());
                sessionStorage.setItem("authToken", authToken);
                alert(`✅ ${role.value} login successful!`);
                window.location.href = `../../pages/${role.value}/index.html`;
            } else {
                alert("❌ Invalid credentials! Try again.");
            }
        });
    }

    /* ✅ Secure Logout Handling */
    const logoutTrigger = document.querySelector(".logout-trigger");

    if (logoutTrigger) {
        console.log("✅ Logout button found! Adding event listener...");
        logoutTrigger.addEventListener("click", function (e) {
            e.preventDefault();
            sessionStorage.clear();
            alert("✅ You have been logged out.");
            window.location.href = "../../index.html";
        });
    } else {
        console.warn("⚠️ Logout button NOT found. Make sure it exists in the HTML.");
    }
});
