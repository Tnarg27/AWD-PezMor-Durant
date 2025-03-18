/* JS for Hamburger */
document.addEventListener("DOMContentLoaded", function () {
    const hamburger = document.querySelector(".hamburger");
    const navMenu = document.querySelector("#nav-menu");

    hamburger.addEventListener("click", function () {
        navMenu.classList.toggle("active");
    });
});

/* JS for login popup */
document.addEventListener("DOMContentLoaded", function () {
    //login popup dynamically
    const loginPopup = document.createElement("div");
    loginPopup.id = "login-popup";
    loginPopup.innerHTML = `
        <div class="popup-overlay"></div>
        <div class="popup-content">
            <span class="close-btn">&times;</span>
            <h2>Login</h2>
            <form>
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
    const popupContent = document.querySelector(".popup-content");
    const closeBtn = document.querySelector(".close-btn");
    const loginTrigger = document.querySelector(".login-trigger");

    function togglePopup() {
        loginPopup.style.display = "block";
        overlay.style.display = "block";
    }

    function closePopup() {
        loginPopup.style.display = "none";
        overlay.style.display = "none";
    }

    loginTrigger.addEventListener("click", function (e) {
        e.preventDefault();
        togglePopup();
    });

    closeBtn.addEventListener("click", closePopup);
    overlay.addEventListener("click", closePopup);

    // Fix: Prevent clicks inside the popup from closing it
    popupContent.addEventListener("click", function (e) {
        e.stopPropagation();
    });
});
