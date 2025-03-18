document.addEventListener("DOMContentLoaded", function () {
    console.log("Script loaded successfully.");

    /* JS for Hamburger */
    const hamburger = document.querySelector(".hamburger");
    const navMenu = document.querySelector("#nav-menu");

    if (hamburger && navMenu) {
        hamburger.addEventListener("click", function () {
            navMenu.classList.toggle("active");
        });
    }

    /* JS for login popup */
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

    const overlay = document.querySelector(".popup-overlay");
    const closeBtn = document.querySelector(".close-btn");
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

    /* Handle login form submission */
    if (loginForm) {
        loginForm.addEventListener("submit", function (e) {
            e.preventDefault();
            const username = document.getElementById("username").value;
            const password = document.getElementById("password").value;
            const role = document.querySelector("input[name='role']:checked");

            if (!role) {
                alert("Please select a role!");
                return;
            }

            if (username === "admin" && password === "admin" && role.value === "admin") {
                window.location.href = "../../pages/admin/index.html";
            } else if (username === "reviewer" && password === "reviewer" && role.value === "reviewer") {
                window.location.href = "../../pages/reviewer/index.html";
            } else {
                alert("Invalid credentials! Try again.");
            }
        });
    }

    /* JS for logout button */
    const logoutTrigger = document.querySelector(".logout-trigger");

    if (logoutTrigger) {
        console.log("✅ Logout button found! Adding event listener...");
        logoutTrigger.addEventListener("click", function (e) {
            e.preventDefault();
            localStorage.removeItem("user");
            sessionStorage.removeItem("user");
            alert("You have been logged out.");
            window.location.href = "../../index.html";
        });
    } else {
        console.warn("⚠️ Logout button NOT found. Make sure it exists in the HTML.");
    }
});
