// Check if logged in
window.addEventListener("load", () => {
    const currentUser = JSON.parse(
        localStorage.getItem("user") || "null"
    );
    if(!currentUser) {
        window.location.href = "login.html";
        return;
    }
});

// Handle form submit
document.getElementById("newListingForm")
    .addEventListener("submit", async (e) => {
        e.preventDefault();

        const currentUser = JSON.parse(
            localStorage.getItem("user") || "null"
        );

        if(!currentUser) {
            window.location.href = "login.html";
            return;
        }

        const formData = new FormData();
        formData.append("title", 
            document.getElementById("title").value);
        formData.append("description", 
            document.getElementById("description").value);
        formData.append("price", 
            document.getElementById("price").value);
        formData.append("location", 
            document.getElementById("location").value);
        formData.append("country", 
            document.getElementById("country").value);

        const imageFile = document.getElementById("image").files[0];
        if(imageFile) {
            formData.append("image", imageFile);
        }

        try {
            const data = await api.postForm("/listings", formData);

            if(data.success) {
                window.location.href = `show.html?id=${data.listing._id}`;
            } else {
                alert(data.message || "Error creating listing!");
            }
        } catch(err) {
            alert("Something went wrong!");
        }
    });