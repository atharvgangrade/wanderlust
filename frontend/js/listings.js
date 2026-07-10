// Load all listings
const loadListings = async (search = "") => {
    const container = document.getElementById("listingsContainer");

    try {
        const url = search
            ? `/listings?search=${search}`
            : "/listings";

        const data = await api.get(url);

        if(!data.success) {
            container.innerHTML = `<p>Error loading listings!</p>`;
            return;
        }

        if(data.listings.length === 0) {
            container.innerHTML = `<p>No listings found!</p>`;
            return;
        }

        container.innerHTML = data.listings.map(listing => `
            <div class="col-md-4 mb-4">
                <div class="card h-100 shadow-sm">
                    <img src="${listing.image}" 
                         class="card-img-top listing-img" 
                         alt="${listing.title}"
                         onerror="this.src='https://images.unsplash.com/photo-1552733407-5d5c46c3bb3b'">
                    <div class="card-body">
                        <h5 class="card-title">${listing.title}</h5>
                        <p class="card-text text-muted">
                            📍 ${listing.location}, ${listing.country}
                        </p>
                        <p class="card-text">
                            <strong>₹${listing.price}</strong> / night
                        </p>
                    </div>
                    <div class="card-footer">
                        <a href="show.html?id=${listing._id}" 
                           class="btn btn-dark btn-sm">
                            View Details
                        </a>
                    </div>
                </div>
            </div>
        `).join("");

    } catch(err) {
        container.innerHTML = `<p>Something went wrong!</p>`;
    }
};

// Search listings
const searchListings = () => {
    const search = document.getElementById("searchInput").value;
    loadListings(search);
};

// Search on enter key
document.getElementById("searchInput")
    .addEventListener("keypress", (e) => {
        if(e.key === "Enter") searchListings();
    });

// Load on page start
loadListings();