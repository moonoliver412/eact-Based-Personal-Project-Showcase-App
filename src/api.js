// Thin wrapper around the json-server REST API (the simulated backend).
// Every CRUD action the app performs goes through one of these functions.
const BASE_URL = "http://localhost:3001/products";

// Throws on a failed response so callers can handle errors in one place.
async function handle(response) {
  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`);
  }
  return response.json();
}

// READ — fetch the whole catalog.
export function getProducts() {
  return fetch(BASE_URL).then(handle);
}

// READ — fetch a single product by id.
export function getProduct(id) {
  return fetch(`${BASE_URL}/${id}`).then(handle);
}

// CREATE — add a new product (POST).
export function createProduct(product) {
  return fetch(BASE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(product),
  }).then(handle);
}

// UPDATE — change one or more fields of an existing product (PATCH).
export function updateProduct(id, updates) {
  return fetch(`${BASE_URL}/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updates),
  }).then(handle);
}

// DELETE — remove a product from the catalog.
export function deleteProduct(id) {
  return fetch(`${BASE_URL}/${id}`, { method: "DELETE" }).then((response) => {
    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`);
    }
    return true;
  });
}
