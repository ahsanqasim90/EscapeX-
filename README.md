# EscapeX Tourism Platform

Modern full-stack tourism website for EscapeX, a Pakistan travel company with the tagline "Escape the Ordinary."

EscapeX is a responsive adventure travel platform for Pakistan Northern Areas tourism. It includes public trip discovery, trip detail pages, booking forms, image/video galleries, testimonials, WhatsApp/Instagram contact links, and a JWT-protected admin dashboard for managing trips, bookings, gallery items, testimonials, and trip-specific Terms & Conditions.

## Stack

- Frontend: React, Vite, Tailwind CSS
- Backend: Node.js, Express
- Database: MongoDB via Mongoose
- Auth: JWT admin login
- Uploads: local Multer upload endpoint, ready to replace with Cloudinary

## Run Locally

```bash
npm install
npm --prefix backend install
npm start --prefix backend
npm run dev
```

Open:

- Website: http://127.0.0.1:5173
- API health: http://127.0.0.1:4000/api/health
- Admin panel: http://127.0.0.1:5173/admin

Default demo admin:

- Email: `admin@escapex.pk`
- Password: `admin12345`

## Contact

- WhatsApp: `0324 4378226`
- Instagram: `@excapex_5`

## MongoDB

Copy `backend/.env.example` to `backend/.env` and set:

```env
MONGODB_URI=mongodb://127.0.0.1:27017/escapex
JWT_SECRET=replace-with-a-long-random-secret
ADMIN_EMAIL=admin@escapex.pk
ADMIN_PASSWORD=admin12345
CLIENT_URL=http://127.0.0.1:5173
```

If `MONGODB_URI` is not set, the API runs with in-memory demo data so the site can still be tested.

## Features

- Home page with EscapeX hero, background image slider, CTAs, upcoming trips, gallery, testimonials, and WhatsApp CTA
- Trips page with destination, price, and duration filters
- Trip detail pages with day-wise itinerary, image/video media, pricing, hotel/camp details, included/not-included services, and trip-specific Terms & Conditions
- Booking form with name, WhatsApp phone, optional email/CNIC, seats, selected trip, pickup city, special request, and required Terms & Conditions checkbox
- Admin dashboard with stats, JWT login, trip CRUD, media URL management, itinerary/service/terms editing, booking status management, testimonials, and gallery items
- Footer ownership note: "EscapeX is owned by Innovex Resource Group Limited."

## Media

The frontend uses replaceable dummy Northern Areas-style images and short videos from remote URLs. The backend also exposes `POST /api/uploads` for local image/video upload with an admin JWT. For Cloudinary, replace the Multer storage in `backend/server.js` with Cloudinary storage and keep returning `{ url, type, title }`.
