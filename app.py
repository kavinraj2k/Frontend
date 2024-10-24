from flask import Flask, render_template, jsonify, request
import requests
import os
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Enable CORS if necessary

# Route to render the centralized page
@app.route('/')
def centralized_page():
    return render_template('centralized.html')

# Route to fetch filtered items from the API
@app.route('/fetch_items', methods=['GET'])
def fetch_items():
    api_url = 'http://localhost:5000/api/items'  # The API running on port 5000

    # Extract filter parameters from the query
    status = request.args.get('status')
    category = request.args.get('category')
    location = request.args.get('location')
    order = request.args.get('order')

    # Construct the API request with filters
    params = {}
    if status:
        params['status'] = status
    if category:
        params['category'] = category
    if location:
        params['location'] = location
    if order:
        params['order'] = order

    try:
        response = requests.get(api_url, params=params)
        response.raise_for_status()
        return jsonify(response.json())
    except requests.exceptions.RequestException as e:
        print(f"Error fetching items: {e}")
        return jsonify({'error': 'Failed to fetch items.'}), 500

if __name__ == '__main__':
    app.run(port=5001, debug=True)  # Run Flask UI on port 5001
