document.addEventListener("DOMContentLoaded", function () {
    console.log("✅ Admin script loaded successfully.");
    ensureDefaultAdmin();
    displayUsers();
    displayReviews();

    /* ✅ Handle Add User */
    const addUserForm = document.getElementById("add-user-form");
    if (addUserForm) {
        addUserForm.addEventListener("submit", function (e) {
            e.preventDefault();

            const username = document.getElementById("new-username").value.trim();
            const password = document.getElementById("new-password").value.trim();
            const roleElement = document.querySelector('input[name="new-role"]:checked');

            if (!username || !password || !roleElement) {
                alert("❌ All fields are required!");
                return;
            }

            const role = roleElement.value;

            addUser(username, password, role);
            addUserForm.reset();
        });
    }
});

/* ✅ Ensure Default Admin Exists */
function ensureDefaultAdmin() {
    let users = JSON.parse(localStorage.getItem("users")) || {};

    if (!users["admin"]) {
        users["admin"] = {
            password: btoa("admin"),
            role: "admin"
        };
        localStorage.setItem("users", JSON.stringify(users));
    }
}

/* ✅ Add New User */
function addUser(username, password, role) {
    let users = JSON.parse(localStorage.getItem("users")) || {};

    if (users[username]) {
        alert("❌ Username already exists!");
        return;
    }

    users[username] = { 
        password: btoa(password),  // Encode password
        role: role 
    };

    localStorage.setItem("users", JSON.stringify(users));
    
    alert(`✅ New ${role} added successfully!`);
    displayUsers();
}

/* ✅ Display Users */
function displayUsers() {
    let users = JSON.parse(localStorage.getItem("users")) || {};
    const userList = document.querySelector("#user-list");
    if (!userList) return;

    userList.innerHTML = ""; // Clear previous list
    Object.keys(users).forEach(username => {
        const li = document.createElement("li");
        li.innerHTML = `${username} (${users[username].role}) 
                        <button class="delete-user-btn" data-username="${username}">🗑 Remove</button>`;
        userList.appendChild(li);
    });

    document.querySelectorAll(".delete-user-btn").forEach(button => {
        button.addEventListener("click", function () {
            removeUser(this.dataset.username);
        });
    });
}

/* ✅ Remove User */
function removeUser(username) {
    let users = JSON.parse(localStorage.getItem("users")) || {};

    if (users[username]) {
        delete users[username];
        localStorage.setItem("users", JSON.stringify(users));
        alert(`❌ User "${username}" removed!`);
        displayUsers();
    }
}

/* ✅ Display Reviews */
function displayReviews() {
    let reviews = JSON.parse(localStorage.getItem("reviews")) || [];

    const pendingTable = document.querySelector("#pending-reviews-table tbody");
    const approvedTable = document.querySelector("#approved-reviews-table tbody");

    if (!pendingTable || !approvedTable) return;

    pendingTable.innerHTML = "";
    approvedTable.innerHTML = "";

    reviews.forEach((review, index) => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${review.store}</td>
            <td>${review.dish}</td>
            <td>${review.location}</td>
            <td>${review.rating} Stars</td>
            <td>
                ${review.status === "pending" ? `
                    <button class="approve-btn" data-index="${index}">✔ Approve</button>
                    <button class="remove-btn" data-index="${index}">❌ Remove</button>
                ` : `
                    <button class="delete-approved-btn" data-index="${index}">🗑 Delete</button>
                `}
            </td>
        `;

        if (review.status === "pending") {
            pendingTable.appendChild(row);
        } else {
            approvedTable.appendChild(row);
        }
    });

    document.querySelectorAll(".approve-btn").forEach(button => {
        button.addEventListener("click", function () {
            approveReview(parseInt(this.dataset.index));
        });
    });

    document.querySelectorAll(".remove-btn").forEach(button => {
        button.addEventListener("click", function () {
            removeReview(parseInt(this.dataset.index));
        });
    });

    document.querySelectorAll(".delete-approved-btn").forEach(button => {
        button.addEventListener("click", function () {
            deleteApprovedReview(parseInt(this.dataset.index));
        });
    });
}

/* ✅ Approve Review */
function approveReview(index) {
    let reviews = JSON.parse(localStorage.getItem("reviews")) || [];
    
    if (reviews[index] && reviews[index].status === "pending") {
        reviews[index].status = "approved";
        localStorage.setItem("reviews", JSON.stringify(reviews));
        alert("✅ Review approved!");
        displayReviews();
    } else {
        alert("❌ Review not found or already approved!");
    }
}

/* ✅ Remove Pending Review */
function removeReview(index) {
    let reviews = JSON.parse(localStorage.getItem("reviews")) || [];

    if (reviews[index]) {
        reviews.splice(index, 1);
        localStorage.setItem("reviews", JSON.stringify(reviews));
        alert("❌ Review removed!");
        displayReviews();
    } else {
        alert("❌ Review not found!");
    }
}

/* ✅ Delete Approved Review */
function deleteApprovedReview(index) {
    let reviews = JSON.parse(localStorage.getItem("reviews")) || [];

    if (reviews[index] && reviews[index].status === "approved") {
        reviews.splice(index, 1);
        localStorage.setItem("reviews", JSON.stringify(reviews));
        alert("❌ Approved review deleted!");
        displayReviews();
    } else {
        alert("❌ Review not found or is still pending!");
    }
}
