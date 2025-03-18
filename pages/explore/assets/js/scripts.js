function displayApprovedReviews() {
    let reviews = JSON.parse(localStorage.getItem("reviews")) || [];
    const table = document.querySelector("#visitor-view table"); // Select the table

    // Clear existing rows (except the header row)
    table.innerHTML = `
        <tr>
            <th>Store</th>
            <th>Dish</th>
            <th>Location</th>
            <th>Rating</th>
        </tr>
    `;

    reviews.forEach(review => {
        if (review.status === "approved") {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${review.store}</td>
                <td>${review.dish}</td>
                <td>${review.location}</td>
                <td>${review.rating} Stars</td>
            `;
            table.appendChild(row); // Append inside the table instead of a div
        }
    });
}

document.addEventListener("DOMContentLoaded", displayApprovedReviews);
