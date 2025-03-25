function displayApprovedReviews(sortedReviews = null) {
    let reviews = JSON.parse(localStorage.getItem("reviews")) || [];
    const table = document.querySelector("#visitor-view table");

    // Clear existing rows (except the header row)
    table.innerHTML = `
        <tr>
            <th>Store</th>
            <th>Dish</th>
            <th>Location</th>
            <th>Rating</th>
        </tr>
    `;

    const reviewsToDisplay = sortedReviews || reviews.filter(review => review.status === "approved");

    reviewsToDisplay.forEach(review => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${review.store}</td>
            <td>${review.dish}</td>
            <td>${review.location}</td>
            <td>${review.rating} Stars</td>
        `;
        table.appendChild(row);
    });
}

document.getElementById('sort-by').addEventListener('change', function() {
    const sortBy = this.value;
    let reviews = JSON.parse(localStorage.getItem("reviews")) || [];
    const approvedReviews = reviews.filter(review => review.status === "approved");

    // Create a copy of the approved reviews array for sorting
    const sortedReviews = [...approvedReviews];

    sortedReviews.sort((a, b) => {
        const [key, order] = sortBy.split('-');
        if (key === 'rating') {
            return order === 'asc' ? a[key] - b[key] : b[key] - a[key];
        } else {
            return order === 'asc' ? a[key].localeCompare(b[key]) : b[key].localeCompare(a[key]);
        }
    });

    displayApprovedReviews(sortedReviews);
});

document.addEventListener("DOMContentLoaded", () => displayApprovedReviews());

// Search button function
function searchReviews() {
    const searchInput = document.getElementById("searchInput").value.toLowerCase();
    const tableRows = document.querySelectorAll("#visitor-view table tr");

    tableRows.forEach((row, index) => {
        if (index === 0) return; // Skip header row
        const rowText = row.textContent.toLowerCase();
        row.style.display = rowText.includes(searchInput) ? "" : "none";
    });

    toggleClearButton(); // Show/hide "X" button
}

// Show/Hide "❌" button
function toggleClearButton() {
    const searchInput = document.getElementById("searchInput");
    const clearBtn = document.getElementById("clearBtn");
    clearBtn.style.display = searchInput.value ? "block" : "none";
}

// Clear search input & reset table
function clearSearch() {
    document.getElementById("searchInput").value = "";
    searchReviews(); // Resets the table
}

// Trigger search when clicking the button
document.querySelector(".example button").addEventListener("click", searchReviews);

// Trigger search when pressing "Enter"
document.getElementById("searchInput").addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        event.preventDefault();
        searchReviews();
    }
});
