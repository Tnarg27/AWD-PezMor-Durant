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