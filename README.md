# Admin Product Portal

A single-page administrator portal for an e-commerce store, built with React.
An administrator can browse the catalog, add new products, search the
inventory, and update or delete existing products. Product data is stored in a
simulated backend so changes persist between page loads.

---

## Task 1 — Define the Problem

The portal needs to let an administrator:

- See a landing page that explains what the site does.
- Add a new product through a form.
- View an individual product on its own page.
- Change product values such as price and stock.
- Search the catalog dynamically as they type.
- Use a responsive layout that works on phones and desktops.

**Components identified from the design:**

```
App
├── NavBar              persistent navigation
└── Routes
    ├── Home            landing page
    ├── ProductList     catalog grid
    │   ├── SearchBar
    │   └── ProductCard (one per product)
    ├── ProductForm     add a new product
    ├── ProductDetail   view / edit / delete a product
    └── NotFound        404 fallback
```

**Routes:**

| Path             | Page          | Purpose                          |
| ---------------- | ------------- | -------------------------------- |
| `/`              | Home          | Landing page                     |
| `/products`      | ProductList   | Browse and search the catalog    |
| `/products/new`  | ProductForm   | Add a new product                |
| `/products/:id`  | ProductDetail | View, edit, or delete a product  |
| `*`              | NotFound      | Any unmatched route              |

**Simulated backend:** `db.json` holds a `products` collection that is served
as a REST API by `json-server`.

## Task 2 — Determine the Design

- **State management** is centralized in a custom `useProducts` hook, shared
  across the app through `ProductsContext`. This means the catalog is fetched
  once and every page reads and writes the same data.
- **Routing** uses React Router with four routes plus a 404 fallback.
- **Styling** uses a single responsive stylesheet (CSS grid + a media query).

## Task 3 — Develop the Code

### Hooks

- **Standard hooks:** `useState`, `useEffect`, `useCallback`, `useContext`,
  plus the React Router hooks `useParams` and `useNavigate`.
- **Custom hooks:**
  - `useProducts` — loads the catalog and exposes the CRUD actions.
  - `useDebounce` — delays the search term so filtering does not run on every
    keystroke.

### CRUD (against the simulated backend)

| Action | Method   | Where it is used         |
| ------ | -------- | ------------------------ |
| Read   | `GET`    | Catalog loads on startup |
| Create | `POST`   | Add Product form         |
| Update | `PATCH`  | Edit form on the detail page |
| Delete | `DELETE` | Delete button on the detail page |

## Task 4 — Test and Debug

The project uses **Vitest** with **React Testing Library**. There is a test
file for each feature:

- `NavBar` / `SearchBar` / `ProductCard` / `Home` — component rendering
- `useDebounce` — debounce timing
- `useProducts` — all four CRUD operations
- `ProductList` — loading, rendering, and live search
- `ProductForm` — form submission
- `ProductDetail` — display and editing
- `App` — client-side routing

Run the suite with `npm test`.

## Task 5 — Document and Maintain

This README documents the project. The Git history uses a feature-branch
workflow (see below).

---

## Getting Started

```bash
# 1. Install dependencies
npm install

# 2. Start the simulated backend (keep this terminal open)
npm run server      # serves db.json at http://localhost:3001

# 3. In a second terminal, start the app
npm run dev         # opens http://localhost:5173
```

## Available Scripts

| Script             | Description                                  |
| ------------------ | -------------------------------------------- |
| `npm run dev`      | Start the Vite development server            |
| `npm run server`   | Start the json-server backend (port 3001)    |
| `npm test`         | Run the full test suite once                 |
| `npm run test:watch` | Run tests in watch mode                    |
| `npm run build`    | Create a production build                    |

## Project Structure

```
.
├── db.json                 simulated backend data
├── index.html
├── vite.config.js
└── src
    ├── api.js              fetch helpers for every CRUD request
    ├── App.jsx             routes
    ├── main.jsx            entry point
    ├── components/         NavBar, SearchBar, ProductCard
    ├── context/            ProductsContext
    ├── hooks/              useProducts, useDebounce
    └── pages/              Home, ProductList, ProductForm, ProductDetail, NotFound
```

## Git Workflow

Each feature was developed on its own branch and merged back into `main`:

- `feature/api-and-hooks` — API layer, custom hooks, and context
- `feature/catalog-pages` — product list, form, and detail pages
- `feature/app-routing` — routing and the app shell

Branches were merged with `--no-ff` (so each merge is recorded as a unit of
work, the same as a merged pull request) and deleted afterwards.
