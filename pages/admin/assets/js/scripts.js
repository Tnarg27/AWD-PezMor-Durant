function displayReviews() {
    let reviews = JSON.parse(localStorage.getItem("reviews")) || [];
    
    // Pending Reviews Table
    const pendingTable = document.querySelector("#pending-reviews-table tbody");
    pendingTable.innerHTML = "";

    // Approved Reviews Table
    const approvedTable = document.querySelector("#approved-reviews-table tbody");
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
        } else if (review.status === "approved") {
            approvedTable.appendChild(row);
        }
    });

    // Add event listeners for Approve, Remove, and Delete buttons
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

// Approve a review
function approveReview(index) {
    let reviews = JSON.parse(localStorage.getItem("reviews")) || [];
    if (reviews[index]) {
        reviews[index].status = "approved";
        localStorage.setItem("reviews", JSON.stringify(reviews));
        displayReviews();
    }
}

// Remove a pending review
function removeReview(index) {
    let reviews = JSON.parse(localStorage.getItem("reviews")) || [];
    reviews.splice(index, 1);
    localStorage.setItem("reviews", JSON.stringify(reviews));
    displayReviews();
}

// Delete an approved review
function deleteApprovedReview(index) {
    let reviews = JSON.parse(localStorage.getItem("reviews")) || [];
    reviews.splice(index, 1);
    localStorage.setItem("reviews", JSON.stringify(reviews));
    displayReviews();
}

// Load reviews on page load
document.addEventListener("DOMContentLoaded", displayReviews);
