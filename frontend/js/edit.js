const urlParams = new URLSearchParams(window.location.search);
const listingId = urlParams.get("id");

// Check if logged in
const currentUser = JSON.parse(localStorage.getItem("user") || "null");
if(!currentUser) {
    window.location.href = "login.html";
}

// Load listing data
const loadListing = async () => {
    const data = await api.get(`/listings/${listingId}`);

    if(data.success) {
        const listing = data.listing;
        document.getElementById("title").value = listing.title;
        document.getElementById("description").value = listing.description;
        document.getElementById("price").value = listing.price;
        document.getElementById("location").value = listing.location;
        document.getElementById("country").value = listing.country;
        document.getElementById("currentImage").src = listing.image;
    }
};

// Handle form submit
document.getElementById("editListingForm")
    .addEventListener("submit", async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("title", document.getElementById("title").value);
        formData.append("description", document.getElementById("description").value);
        formData.append("price", document.getElementById("price").value);
        formData.append("location", document.getElementById("location").value);
        formData.append("country", document.getElementById("country").value);

        const imageFile = document.getElementById("image").files[0];
        if(imageFile) {
            formData.append("image", imageFile);
        }

        const data = await api.putForm(`/listings/${listingId}`, formData);

        if(data.success) {
            window.location.href = `show.html?id=${listingId}`;
        } else {
            alert(data.message || "Error updating listing!");
        }
    });

loadListing();