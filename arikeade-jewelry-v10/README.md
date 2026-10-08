# Arikeade Jewelry Storefront — V10

V7 continues the existing V6 storefront and focuses on the homepage/brand experience using the new Arikeade woman-profile + flower logo.

## V7 changes
- Luxury black/gold hero treatment built around the supplied Arikeade logo.
- New headline and brand messaging focused on confidence and personal style.
- Four-point brand/value strip below the hero.
- Refined category cards with descriptions and directional affordances.
- Dark premium promotional banner.
- Responsive layouts for desktop, tablet and mobile.
- Existing catalogue, search, filtering, wishlist, product detail, cart and checkout behavior preserved.

## Brand assets
- `assets/arikeade-logo-header.png` — transparent primary web lockup.
- `assets/arikeade-logo-full.png` — full brand lockup for footer/brand areas.
- `assets/arikeade-logo.svg` — legacy fallback asset retained for compatibility.

## Run
Open `index.html` directly or serve the folder with a static web server.

No build step is required.

## V8 — Product Experience & Conversion UX

This release continues from V7 and focuses on the shopping journey rather than changing the project architecture.

- Enhanced product cards with rating, stock/curated badges, hover quick view and dedicated detail CTA.
- Product detail pages now include quantity controls, stock status, delivery/quality benefits and related products.
- Quick view now exposes rating, material, stock, wishlist and full-detail navigation.
- Cart drawer now shows line totals and progress toward complimentary delivery at ₦100,000.
- Existing cart, wishlist, search, filtering, sorting, checkout and LocalStorage persistence are retained.
- The newly selected woman-profile + flower Arikeade logo remains the primary brand identity.


## V9 — Commerce hardening
- Checkout form validation and browser-native validation feedback.
- Demo checkout clearly identified as frontend-only; no payment is processed.
- Last order metadata is stored locally for frontend demonstration.
- Safer localStorage hydration and stock-bound cart quantities.
- Keyboard Escape handling for cart, quick-view modal and mobile menu.
- Focus-visible accessibility treatment and reduced-motion support.
- Responsive checkout summary and mobile form layout.
- Added skip navigation and noscript notice.

## Deployment readiness
V9 is feature-complete for a frontend demo/storefront. Production deployment still requires final browser/device QA and, if real orders are required, a backend/API plus payment and order-management integration.


## V10 — Final QA & deployment hardening
- Added theme metadata and Open Graph metadata for deployment-ready page sharing.
- Preloaded the primary Arikeade logo.
- Added robust HTML escaping for customer-controlled checkout confirmation values and search state.
- Hardened LocalStorage writes against storage exceptions.
- Fixed mobile-menu close behavior when navigation links are selected.
- Added explicit mobile menu expanded state handling.
- Added modal backdrop click-to-close.
- Added body scroll locking while cart/modal overlays are open.
- Added final small-screen spacing, product-grid and checkout refinements.
- Verified all local HTML asset references resolve.
- Verified `node --check js/app.js` passes.

### Browser QA note
A Chromium headless render was attempted at desktop, tablet and mobile sizes. The runtime Chromium process timed out before producing screenshots, so browser-rendered visual QA is not marked as passed in this environment. Source-level QA and asset validation pass.

## V11 — Production Deployment Package

This package is static-hosting ready for Vercel, Netlify, or any standard web server.

- `vercel.json` — Vercel deployment metadata.
- `netlify.toml` — Netlify publish configuration.
- `robots.txt` — basic crawler policy.
- `404.html` — production fallback page.

### Deployment

Upload the contents of this directory as the site root. No build command is required.

### Important

The checkout remains a frontend demonstration. Real payment processing, persistent orders, customer accounts, inventory synchronization, and transactional email require a backend/payment integration before accepting live orders.

## V12 — Admin Product Manager

V12 adds `admin.html`, `css/admin.css`, and `js/admin.js` for an easy product-management workflow. The dashboard supports product photo upload/preview (up to 4 images), price and sale-price entry, stock, category, material, description, visibility flags, editing, deletion, JSON export/import, and catalog search/filtering.

**V12 limitation:** the catalog is stored in browser `localStorage`, so changes are local to the current browser/device. This is intentionally a frontend management prototype. For shared production catalog management, V13 should connect the dashboard and storefront to the Node/Express API, MongoDB, and cloud image storage (e.g. Cloudinary/S3).

## V13 — Shared Catalog API
V13 adds a production-oriented backend under `backend/` using Node.js, Express, MongoDB/Mongoose and JWT admin authentication. The storefront can read the shared catalog when `js/config.js` has `API_BASE_URL` set; otherwise it keeps the V12 local/demo behavior so the existing Vercel deployment is not broken before the API is deployed.

### V13 workflow
1. Create a MongoDB Atlas database.
2. Deploy `backend/` to Render (a `render.yaml` is included) or another Node host.
3. Configure `MONGODB_URI`, `JWT_SECRET`, `ADMIN_EMAIL`, `ADMIN_PASSWORD`, and `FRONTEND_ORIGIN`.
4. Run `npm run seed` once against the production database.
5. Put the resulting API URL in `js/config.js`, for example `https://arikeade-jewelry-api.onrender.com/api`.
6. Commit/push and let Vercel redeploy the storefront.
7. Open `admin.html`, sign in, and manage the shared MongoDB catalog.

### V13 image note
The API intentionally stores image URLs, not base64 files. V12 browser uploads remain available in local/demo mode. V14 should connect the image picker to Cloudinary/S3 so an admin can upload a phone photo directly into the shared catalog without copying an image URL.
