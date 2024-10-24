document.addEventListener("DOMContentLoaded", function() {
    const itemsFeed = document.getElementById("itemsFeed");
    const applyFiltersButton = document.getElementById("applyFilters");
    const postItemForm = document.getElementById("postItemForm");
    const postMessage = document.getElementById("postMessage");
    const postError = document.getElementById("postError");

    const apiBaseUrl = "http://localhost:5000/api";  // Your Flask API base URL

    // Function to fetch items from the API
    function fetchItems(filters = {}) {
        let url = `${apiBaseUrl}/items`;

        const queryParams = new URLSearchParams(filters).toString();
        if (queryParams) {
            url += `?${queryParams}`;
        }

        fetch(url)
        .then(response => response.json())
        .then(data => {
            itemsFeed.innerHTML = "";  // Clear current feed
            if (data.length === 0) {
                itemsFeed.innerHTML = "<p class='text-center'>No items found.</p>";
                return;
            }
            data.forEach(item => {
                const itemDiv = document.createElement("div");
                itemDiv.className = "item col-md-4";
                itemDiv.innerHTML = `
                    <div class="card mb-4 shadow-sm">
                        <img src="${item.image_url}" class="card-img-top" alt="${item.title}" style="height: 200px; object-fit: cover;">
                        <div class="card-body">
                            <h5 class="card-title">${item.title}</h5>
                            <p class="card-text">${item.description}</p>
                            <p><strong>Category:</strong> ${item.category}</p>
                            <p><strong>Status:</strong> ${item.status.charAt(0).toUpperCase() + item.status.slice(1)}</p>
                            <p><strong>Location:</strong> ${item.location}</p>
                            <p><small class="text-muted">Posted on: ${new Date(item.created_at).toLocaleString()}</small></p>
                        </div>
                    </div>
                `;
                itemsFeed.appendChild(itemDiv);
            });
        })
        .catch(error => {
            console.error("Error loading items:", error);
            itemsFeed.innerHTML = "<p class='text-danger text-center'>Failed to load items.</p>";
        });
    }

    // Event listener to apply filters
    applyFiltersButton.addEventListener("click", function() {
        const status = document.getElementById("filterStatus").value;
        const category = document.getElementById("filterCategory").value;
        const location = document.getElementById("filterLocation").value;
        const order = document.getElementById("filterOrder").value;

        const filters = {};
        if (status) filters.status = status;
        if (category) filters.category = category;
        if (location) filters.location = location;
        if (order) filters.order = order;

        fetchItems(filters);
    });

    // Handle form submission for posting new items
    postItemForm.addEventListener("submit", function(event) {
        event.preventDefault();

        // Clear previous messages
        postMessage.textContent = "";
        postError.textContent = "";

        const formData = new FormData(postItemForm);

        fetch(`${apiBaseUrl}/items`, {
            method: "POST",
            body: formData
        })
        .then(response => response.json().then(data => ({ status: response.status, body: data })))
        .then(({ status, body }) => {
            if (status === 201) {
                postMessage.textContent = body.message;
                postItemForm.reset();
                fetchItems();  // Refresh the feed
                // Close the modal after a short delay
                setTimeout(() => {
                    $('#postItemModal').modal('hide');
                    postMessage.textContent = "";
                }, 2000);
            } else {
                postError.textContent = body.error || "Failed to post item.";
            }
        })
        .catch(error => {
            console.error("Error posting item:", error);
            postError.textContent = "An error occurred while posting the item.";
        });
    });

    // Initial load of items
    fetchItems();
});
