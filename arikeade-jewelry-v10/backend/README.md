# Arikeade Jewelry API — V13

V13 introduces the real shared catalog foundation: Node.js + Express + MongoDB + JWT admin authentication.

## Features
- `GET /api/health`
- Public product listing/search/category filtering
- Public product lookup by SKU
- Admin login with JWT
- Admin identity verification
- Protected create/update/delete product endpoints
- Protected product visibility status endpoint
- Helmet, CORS, request logging and login rate limiting
- MongoDB/Mongoose persistence

## Local setup
1. Install Node.js 20+.
2. Copy `.env.example` to `.env`.
3. Set `MONGODB_URI` and a strong `JWT_SECRET`.
4. Set `FRONTEND_ORIGIN` to the URL serving the frontend.
5. Run `npm install`.
6. Run `npm run seed` once to create the admin and demo products.
7. Run `npm run dev`.

Default demo credentials come from `.env`:
- Email: `ADMIN_EMAIL`
- Password: `ADMIN_PASSWORD`

Change the password before any production use.

## API examples
Public:
- `GET /api/products`
- `GET /api/products?category=Rings`
- `GET /api/products?search=gold`

Admin:
- `POST /api/auth/login`
- `GET /api/auth/me`
- `POST /api/products`
- `PUT /api/products/:sku`
- `PATCH /api/products/:sku/status`
- `DELETE /api/products/:sku`

Send `Authorization: Bearer <token>` for protected endpoints.

## V14 note
V13 stores image URLs in MongoDB. The browser image picker remains available in the local prototype, but production image upload should be moved to Cloudinary/S3 in V14 rather than storing base64 image data in MongoDB.
