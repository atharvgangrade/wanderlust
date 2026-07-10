// Get listing ID from URL
const urlParams = new URLSearchParams(window.location.search);
const listingId = urlParams.get("id");

// Load listing details
const loadListing = async () => {
    const container = document.getElementById("listingContainer");

    try {
        const data = await api.get(`/listings/${listingId}`);

        if(!data.success) {
            container.innerHTML = `<p>Listing not found!</p>`;
            return;
        }

        const listing = data.listing;
        const currentUser = JSON.parse(
            localStorage.getItem("user") || "null"
        );
        const isOwner = currentUser && 
            currentUser._id === listing.owner;

        container.innerHTML = `
            <div class="row">
                <div class="col-md-8">
                    <img src="${listing.image}" 
                         class="img-fluid rounded mb-3" 
                         alt="${listing.title}">
                </div>
                <div class="col-md-4">
                    <h2>${listing.title}</h2>
                    <p class="text-muted">
                        📍 ${listing.location}, ${listing.country}
                    </p>
                    <h4>₹${listing.price} / night</h4>
                    <p>${listing.description}</p>
                    ${isOwner ? `
                        <a href="edit.html?id=${listing._id}" 
                           class="btn btn-warning me-2">
                            Edit
                        </a>
                        <button onclick="deleteListing('${listing._id}')" 
                                class="btn btn-danger">
                            Delete
                        </button>
                    ` : ""}
                    <a href="index.html" class="btn btn-outline-dark mt-2 d-block">
                        ← Back to listings
                    </a>
                </div>
            </div>
        `;

        // Show review form if logged in
        if(currentUser) {
            document.getElementById("addReviewForm")
                .classList.remove("d-none");
        }

    } catch(err) {
        container.innerHTML = `<p>Something went wrong!</p>`;
    }
};

// Load reviews
const loadReviews = async () => {
    const container = document.getElementById("reviewsList");

    try {
        const data = await api.get(`/listings/${listingId}/reviews`);

        if(!data.reviews || data.reviews.length === 0) {
            container.innerHTML = `<p>No reviews yet!</p>`;
            return;
        }

        const currentUser = JSON.parse(
            localStorage.getItem("user") || "null"
        );

        container.innerHTML = data.reviews.map(review => `
            <div class="card mb-3">
                <div class="card-body">
                    <div class="d-flex justify-content-between">
                        <h6>${review.author?.username || "Anonymous"}</h6>
                        <span>${"⭐".repeat(review.rating)}</span>
                    </div>
                    <p>${review.comment}</p>
                    ${currentUser && 
                      currentUser._id === review.author?._id ? `
                        <button onclick="deleteReview('${review._id}')"
                                class="btn btn-danger btn-sm">
                            Delete
                        </button>
                    ` : ""}
                </div>
            </div>
        `).join("");

    } catch(err) {
        container.innerHTML = `<p>Error loading reviews!</p>`;
    }
};

// Add review
const addReview = async () => {
    const comment = document.getElementById("comment").value;
    const rating = document.getElementById("rating").value;

    if(!comment) {
        alert("Please write a comment!");
        return;
    }

    const data = await api.post(
        `/listings/${listingId}/reviews`,
        { comment, rating: Number(rating) }
    );

    if(data.success) {
        document.getElementById("comment").value = "";
        loadReviews();
    } else {
        alert(data.message || "Error adding review!");
    }
};

// Delete review
const deleteReview = async (reviewId) => {
    if(!confirm("Delete this review?")) return;

    const data = await api.delete(
        `/listings/${listingId}/reviews/${reviewId}`
    );

    if(data.success) {
        loadReviews();
    } else {
        alert(data.message || "Error deleting review!");
    }
};

// Delete listing
const deleteListing = async (id) => {
    if(!confirm("Delete this listing?")) return;

    const data = await api.delete(`/listings/${id}`);

    if(data.success) {
        window.location.href = "index.html";
    } else {
        alert(data.message || "Error deleting listing!");
    }
};

// Load everything
loadListing();
loadReviews();