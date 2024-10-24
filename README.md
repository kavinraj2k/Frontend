# Frontend
centralized.html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Lost and Found - Centralized Page</title>
    <link rel="stylesheet" href="{{ url_for('static', filename='styles.css') }}">
    <!-- Optional: Include a CSS framework like Bootstrap for better styling -->
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">
</head>
<body>

    <div class="container">
        <h1 class="text-center my-4">Lost and Found - Centralized Feed</h1>

        <!-- Button to Open the Modal -->
        <div class="text-center mb-4">
            <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#postItemModal">
                Post Lost or Found Item
            </button>
        </div>

        <!-- Filter Section -->
        <section class="filters mb-4">
            <div class="row">
                <div class="col-md-3">
                    <label for="filterStatus">Status:</label>
                    <select id="filterStatus" class="form-control">
                        <option value="">All</option>
                        <option value="lost">Lost</option>
                        <option value="found">Found</option>
                    </select>
                </div>
                <div class="col-md-3">
                    <label for="filterCategory">Category:</label>
                    <select id="filterCategory" class="form-control">
                        <option value="">All</option>
                        <option value="electronics">Electronics</option>
                        <option value="clothing">Clothing</option>
                        <option value="pets">Pets</option>
                        <option value="accessories">Accessories</option>
                        <!-- Add more categories as needed -->
                    </select>
                </div>
                <div class="col-md-3">
                    <label for="filterOrder">Order:</label>
                    <select id="filterOrder" class="form-control">
                        <option value="recent">Recently Posted</option>
                        <!-- Add more ordering options if needed -->
                    </select>
                </div>
                <div class="col-md-3">
                    <label for="filterLocation">Location:</label>
                    <input type="text" id="filterLocation" class="form-control" placeholder="Enter location">
                </div>
            </div>
            <div class="text-center mt-3">
                <button id="applyFilters" class="btn btn-success">Apply Filters</button>
            </div>
        </section>

        <!-- Scrollable Feed Section -->
        <section class="feed">
            <h2 class="mb-3">Item Feed</h2>
            <div id="itemsFeed" class="row">
                <!-- Items will be dynamically loaded here -->
            </div>
        </section>
    </div>

    <!-- The Modal -->
    <div class="modal fade" id="postItemModal">
        <div class="modal-dialog">
            <div class="modal-content">

                <!-- Modal Header -->
                <div class="modal-header">
                    <h4 class="modal-title">Post Lost or Found Item</h4>
                    <button type="button" class="close" data-dismiss="modal">&times;</button>
                </div>

                <!-- Modal body -->
                <div class="modal-body">
                    <form id="postItemForm" enctype="multipart/form-data">
                        <div class="form-group">
                            <label for="title">Title:</label>
                            <input type="text" id="title" name="title" class="form-control" required>
                        </div>

                        <div class="form-group">
                            <label for="description">Description:</label>
                            <textarea id="description" name="description" class="form-control" required></textarea>
                        </div>

                        <div class="form-group">
                            <label for="category">Category:</label>
                            <select id="category" name="category" class="form-control" required>
                                <option value="electronics">Electronics</option>
                                <option value="clothing">Clothing</option>
                                <option value="pets">Pets</option>
                                <option value="accessories">Accessories</option>
                                <!-- Add more categories as needed -->
                            </select>
                        </div>

                        <div class="form-group">
                            <label for="status">Status:</label>
                            <select id="status" name="status" class="form-control" required>
                                <option value="lost">Lost</option>
                                <option value="found">Found</option>
                            </select>
                        </div>

                        <div class="form-group">
                            <label for="location">Location:</label>
                            <input type="text" id="location" name="location" class="form-control" required>
                        </div>

                        <div class="form-group">
                            <label for="image">Upload Image:</label>
                            <input type="file" id="image" name="image" class="form-control-file" accept="image/*" required>
                        </div>

                        <div id="postMessage" class="text-success mb-2"></div>
                        <div id="postError" class="text-danger mb-2"></div>

                        <button type="submit" class="btn btn-primary">Submit</button>
                    </form>
                </div>

                <!-- Modal footer -->
                <div class="modal-footer">
                    <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
                </div>

            </div>
        </div>
    </div>

    <!-- Include jQuery and Bootstrap JS for modal functionality -->
    <script src="https://code.jquery.com/jquery-3.5.1.slim.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.1/dist/umd/popper.min.js"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"></script>
    <script src="{{ url_for('static', filename='script.js') }}"></script>
</body>
</html>


styles.css
body {
    font-family: Arial, sans-serif;
    margin: 20px;
}

h1, h2 {
    text-align: center;
}

.filters, .feed {
    margin-bottom: 20px;
    padding: 20px;
    border: 1px solid #ddd;
    border-radius: 5px;
}

label {
    display: block;
    margin-bottom: 5px;
    font-weight: bold;
}

input, select, button {
    width: 100%;
    padding: 8px;
    margin-bottom: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
}

button {
    background-color: #4CAF50;
    color: white;
    cursor: pointer;
}

button:hover {
    background-color: #45a049;
}

#itemsFeed {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    max-height: 600px;
    overflow-y: auto;
}

.item {
    border: 1px solid #ccc;
    padding: 15px;
    border-radius: 10px;
    width: calc(33% - 20px);
    box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.1);
}

.item img {
    width: 100%;
    height: 150px;
    object-fit: cover;
}

.item h3 {
    margin-top: 10px;
}
body {
    font-family: Arial, sans-serif;
    background-color: #f8f9fa;
    padding-top: 20px;
}

h1, h2 {
    color: #343a40;
}

.filters label {
    font-weight: bold;
}

.feed .card {
    height: 100%;
}

#itemsFeed {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
}

.item {
    flex: 1 1 calc(33% - 20px);
    box-sizing: border-box;
}

@media (max-width: 768px) {
    .item {
        flex: 1 1 calc(50% - 20px);
    }
}

@media (max-width: 576px) {
    .item {
        flex: 1 1 100%;
    }
}

script.js
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




