document.getElementById("review-form").addEventListener("submit", function(event) {
    event.preventDefault();

    const ratingInput = document.getElementById("rating").value;
    const rating = parseFloat(ratingInput).toFixed(1); // Convert to float and fix to 1 decimal place

    if (isNaN(rating) || rating < 1 || rating > 5) {
        alert("Please enter a valid rating between 1 and 5.");
        return;
    }

    const review = {
        store: document.getElementById("store").value,
        dish: document.getElementById("dish").value,
        location: document.getElementById("location").value,
        rating: rating, // Store the formatted rating
        status: "pending"
    };

    let reviews = JSON.parse(localStorage.getItem("reviews")) || [];
    reviews.push(review);
    localStorage.setItem("reviews", JSON.stringify(reviews));

    alert("✅ Review submitted for approval!");
    document.getElementById("review-form").reset();
});
