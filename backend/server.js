import "dotenv/config";
import cors from "cors";
import express from "express";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import multer from "multer";
import path from "node:path";
import { fileURLToPath } from "node:url";

const app = express();
const port = process.env.PORT || 4000;
const jwtSecret = process.env.JWT_SECRET || "escapex-dev-secret";
const __dirname = path.dirname(fileURLToPath(import.meta.url));

app.use(cors({ origin: process.env.CLIENT_URL || "http://127.0.0.1:5173" }));
app.use(express.json({ limit: "10mb" }));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

const upload = multer({
  storage: multer.diskStorage({
    destination: path.join(__dirname, "uploads"),
    filename: (_request, file, done) => {
      const safeName = file.originalname.toLowerCase().replace(/[^a-z0-9.]+/g, "-");
      done(null, `${Date.now()}-${safeName}`);
    },
  }),
});

const termsSchema = new mongoose.Schema(
  {
    bookingPolicy: String,
    paymentPolicy: String,
    cancellationPolicy: String,
    travelRules: String,
    safetyGuidelines: String,
    bring: String,
  },
  { _id: false },
);

const tripSchema = new mongoose.Schema(
  {
    id: { type: String, required: true, unique: true },
    destination: { type: String, required: true },
    location: String,
    duration: Number,
    price: Number,
    coupleCharges: Number,
    date: String,
    seats: Number,
    seatsBooked: { type: Number, default: 0 },
    pickupCities: [String],
    cover: String,
    images: [String],
    videos: [String],
    itinerary: [{ day: Number, title: String, details: String }],
    included: [String],
    notIncluded: [String],
    stay: String,
    terms: termsSchema,
  },
  { timestamps: true },
);

const bookingSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    phone: { type: String, required: true },
    email: String,
    cnic: String,
    seats: { type: Number, required: true },
    tripId: { type: String, required: true },
    tripSelected: String,
    pickupCity: String,
    request: String,
    agreed: { type: Boolean, required: true },
    status: { type: String, enum: ["pending", "confirmed", "cancelled"], default: "pending" },
  },
  { timestamps: true },
);

const testimonialSchema = new mongoose.Schema(
  {
    name: String,
    location: String,
    text: String,
    rating: { type: Number, default: 5 },
  },
  { timestamps: true },
);

const gallerySchema = new mongoose.Schema(
  {
    type: { type: String, enum: ["image", "video"], default: "image" },
    url: String,
    title: String,
  },
  { timestamps: true },
);

const Trip = mongoose.model("Trip", tripSchema);
const Booking = mongoose.model("Booking", bookingSchema);
const Testimonial = mongoose.model("Testimonial", testimonialSchema);
const Gallery = mongoose.model("Gallery", gallerySchema);
let dbReady = false;

const seedTrips = [
  {
    id: "hunza-autumn-escape",
    destination: "Hunza Valley",
    location: "Hunza, Attabad Lake, Passu Cones",
    duration: 5,
    price: 38500,
    coupleCharges: 76000,
    date: "2026-07-18",
    seats: 18,
    seatsBooked: 7,
    pickupCities: ["Islamabad", "Lahore", "Peshawar"],
    cover: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1400&q=85",
    images: ["https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1400&q=85"],
    videos: ["https://videos.pexels.com/video-files/1793334/1793334-hd_1280_720_30fps.mp4"],
    itinerary: [
      { day: 1, title: "Departure and Besham stay", details: "Night departure, scenic drive, and hotel check-in." },
      { day: 2, title: "Hunza arrival", details: "Rakaposhi viewpoint, Karimabad bazaar, and dinner." },
    ],
    included: ["Luxury transport", "Hotel rooms", "Breakfast and dinner", "Tour guide"],
    notIncluded: ["Lunch", "Entry tickets", "Boating", "Personal shopping"],
    stay: "Family hotels in Hunza and Besham. Camps available on request.",
    terms: {
      bookingPolicy: "Seats are reserved after advance payment and WhatsApp confirmation.",
      paymentPolicy: "50% advance is required at booking.",
      cancellationPolicy: "Cancellation within 72 hours is non-refundable.",
      travelRules: "Follow guide instructions and respect local communities.",
      safetyGuidelines: "Weather and road conditions can change the itinerary.",
      bring: "Warm jacket, shoes, CNIC, medication, and power bank.",
    },
  },
  {
    id: "skardu-jeep-camping",
    destination: "Skardu",
    location: "Shangrila, Deosai, Shigar, Katpana",
    duration: 6,
    price: 46500,
    coupleCharges: 92000,
    date: "2026-08-02",
    seats: 20,
    seatsBooked: 11,
    pickupCities: ["Islamabad", "Rawalpindi", "Lahore"],
    cover: "https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1400&q=85",
    images: [
      "https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1400&q=85",
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=1200&q=85",
    ],
    videos: ["https://videos.pexels.com/video-files/854150/854150-hd_1280_720_25fps.mp4"],
    itinerary: [
      { day: 1, title: "Islamabad to Chilas", details: "Departure via Hazara Motorway and KKH, overnight stay in Chilas." },
      { day: 2, title: "Chilas to Skardu", details: "Drive beside Indus River, hotel check-in, dinner and rest." },
      { day: 3, title: "Deosai plains", details: "Jeep safari to Deosai National Park with packed meal and viewpoints." },
    ],
    included: ["Transport", "Hotels/camps", "Breakfast and dinner", "Guide", "Tour photography"],
    notIncluded: ["Lunch", "Tickets", "Personal porter", "Extra heater charges"],
    stay: "Skardu hotel rooms plus one optional camp night near Katpana or Shigar.",
    terms: {
      bookingPolicy: "Booking requires verified contact number and advance payment receipt.",
      paymentPolicy: "Bank transfer, Easypaisa, or JazzCash accepted.",
      cancellationPolicy: "Refunds are subject to vendor deductions already paid.",
      travelRules: "No littering, no disruptive behavior, and no unscheduled solo movement.",
      safetyGuidelines: "High altitude areas require hydration and warm layers.",
      bring: "Thermals, sunscreen, sunglasses, CNIC, trekking shoes, and medication.",
    },
  },
  {
    id: "swat-kalam-waterfalls",
    destination: "Swat Kalam",
    location: "Malam Jabba, Kalam, Mahodand Lake",
    duration: 3,
    price: 22500,
    coupleCharges: 44000,
    date: "2026-07-05",
    seats: 16,
    seatsBooked: 5,
    pickupCities: ["Islamabad", "Peshawar", "Mardan"],
    cover: "https://images.unsplash.com/photo-1433086966358-54859d0ed716?auto=format&fit=crop&w=1400&q=85",
    images: [
      "https://images.unsplash.com/photo-1433086966358-54859d0ed716?auto=format&fit=crop&w=1400&q=85",
      "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=1200&q=85",
    ],
    videos: [],
    itinerary: [
      { day: 1, title: "Departure to Swat", details: "Pickup, breakfast stop, Malam Jabba optional visit, Kalam hotel check-in." },
      { day: 2, title: "Mahodand Lake", details: "Jeep transfer to Mahodand, waterfalls, trout lunch optional, bonfire at night." },
      { day: 3, title: "Return via Bahrain", details: "Breakfast, Bahrain market stop, return to pickup cities." },
    ],
    included: ["Transport", "Hotel stay", "Breakfast and dinner", "Coordinator", "Bonfire"],
    notIncluded: ["Lunch", "Jeep charges", "Chairlift tickets", "Personal expenses"],
    stay: "Kalam hotel on sharing basis. Couple room upgrades available with prior booking.",
    terms: {
      bookingPolicy: "Booking confirmation is shared on WhatsApp after seat advance.",
      paymentPolicy: "Advance payment is mandatory because weekend hotel inventory is limited.",
      cancellationPolicy: "No-show and same-day cancellation are non-refundable.",
      travelRules: "Timely departure from stops is required so the group can complete the itinerary.",
      safetyGuidelines: "Lake access depends on road condition and weather clearance.",
      bring: "Rain jacket, warm clothes, joggers, CNIC, medication, and cash.",
    },
  },
];

const seedTestimonials = [
  { name: "Areeba Khan", location: "Lahore", text: "EscapeX managed our Hunza trip beautifully.", rating: 5 },
  { name: "Saad Malik", location: "Islamabad", text: "Loved the Skardu jeep day and bonfire.", rating: 5 },
  { name: "Maham Raza", location: "Peshawar", text: "A safe, friendly, and very scenic Kalam weekend.", rating: 5 },
];

const seedGallery = [
  { type: "image", url: "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=1100&q=85", title: "Forest trail" },
  { type: "image", url: "https://images.unsplash.com/photo-1445307806294-bff7f67ff225?auto=format&fit=crop&w=1100&q=85", title: "Bonfire camp" },
  { type: "video", url: "https://videos.pexels.com/video-files/1793334/1793334-hd_1280_720_30fps.mp4", title: "Mountain road" },
  { type: "image", url: "https://images.unsplash.com/photo-1519904981063-b0cf448d479e?auto=format&fit=crop&w=1100&q=85", title: "Cabin stay" },
  { type: "video", url: "https://videos.pexels.com/video-files/854150/854150-hd_1280_720_25fps.mp4", title: "Lake view" },
  { type: "image", url: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1100&q=85", title: "Jeep adventure" },
];

let memoryTrips = [...seedTrips];
let memoryBookings = [];
let memoryTestimonials = [...seedTestimonials];
let memoryGallery = [...seedGallery];

function requireAdmin(request, response, next) {
  const token = request.headers.authorization?.replace("Bearer ", "");
  if (!token) return response.status(401).json({ message: "Missing admin token" });
  try {
    request.admin = jwt.verify(token, jwtSecret);
    return next();
  } catch {
    return response.status(401).json({ message: "Invalid admin token" });
  }
}

app.get("/api/health", (_request, response) => {
  response.json({ ok: true, service: "EscapeX API" });
});

app.post("/api/auth/login", (request, response) => {
  const { email, password } = request.body;
  const adminEmail = process.env.ADMIN_EMAIL || "admin@escapex.pk";
  const adminPassword = process.env.ADMIN_PASSWORD || "admin12345";
  if (email !== adminEmail || password !== adminPassword) return response.status(401).json({ message: "Invalid credentials" });
  const token = jwt.sign({ email, role: "admin" }, jwtSecret, { expiresIn: "8h" });
  response.json({ token });
});

app.get("/api/trips", async (_request, response) => {
  if (!dbReady) return response.json(memoryTrips);
  const trips = await Trip.find().sort({ date: 1 });
  response.json(trips.length ? trips : seedTrips);
});

app.post("/api/trips", requireAdmin, async (request, response) => {
  if (!dbReady) {
    memoryTrips.unshift(request.body);
    return response.status(201).json(request.body);
  }
  const trip = await Trip.create(request.body);
  response.status(201).json(trip);
});

app.put("/api/trips/:id", requireAdmin, async (request, response) => {
  if (!dbReady) {
    memoryTrips = [request.body, ...memoryTrips.filter((trip) => trip.id !== request.params.id)];
    return response.json(request.body);
  }
  const trip = await Trip.findOneAndUpdate({ id: request.params.id }, request.body, { new: true, upsert: true, setDefaultsOnInsert: true });
  response.json(trip);
});

app.delete("/api/trips/:id", requireAdmin, async (request, response) => {
  if (!dbReady) {
    memoryTrips = memoryTrips.filter((trip) => trip.id !== request.params.id);
    return response.json({ ok: true });
  }
  await Trip.deleteOne({ id: request.params.id });
  response.json({ ok: true });
});

app.post("/api/bookings", async (request, response) => {
  if (!request.body.agreed) return response.status(400).json({ message: "Terms agreement is required" });
  if (!dbReady) {
    const booking = { ...request.body, _id: String(Date.now()), status: "pending", createdAt: new Date().toISOString() };
    memoryBookings.unshift(booking);
    memoryTrips = memoryTrips.map((trip) => trip.id === booking.tripId ? { ...trip, seatsBooked: Number(trip.seatsBooked || 0) + Number(booking.seats || 1) } : trip);
    return response.status(201).json(booking);
  }
  const booking = await Booking.create(request.body);
  await Trip.updateOne({ id: booking.tripId }, { $inc: { seatsBooked: Number(booking.seats) || 1 } });
  response.status(201).json(booking);
});

app.get("/api/bookings", requireAdmin, async (_request, response) => {
  if (!dbReady) return response.json(memoryBookings);
  response.json(await Booking.find().sort({ createdAt: -1 }));
});

app.patch("/api/bookings/:id/status", requireAdmin, async (request, response) => {
  if (!dbReady) {
    memoryBookings = memoryBookings.map((booking) => booking._id === request.params.id ? { ...booking, status: request.body.status } : booking);
    return response.json(memoryBookings.find((booking) => booking._id === request.params.id));
  }
  const booking = await Booking.findByIdAndUpdate(request.params.id, { status: request.body.status }, { new: true });
  response.json(booking);
});

app.get("/api/testimonials", async (_request, response) => {
  if (!dbReady) return response.json(memoryTestimonials);
  const items = await Testimonial.find().sort({ createdAt: -1 });
  response.json(items.length ? items : seedTestimonials);
});

app.post("/api/testimonials", requireAdmin, async (request, response) => {
  if (!dbReady) {
    const item = { ...request.body, _id: String(Date.now()) };
    memoryTestimonials.unshift(item);
    return response.status(201).json(item);
  }
  response.status(201).json(await Testimonial.create(request.body));
});

app.put("/api/testimonials/:id", requireAdmin, async (request, response) => {
  if (!dbReady) {
    memoryTestimonials = memoryTestimonials.map((item) => item._id === request.params.id ? { ...item, ...request.body } : item);
    return response.json(memoryTestimonials.find((item) => item._id === request.params.id));
  }
  response.json(await Testimonial.findByIdAndUpdate(request.params.id, request.body, { new: true }));
});

app.delete("/api/testimonials/:id", requireAdmin, async (request, response) => {
  if (!dbReady) {
    memoryTestimonials = memoryTestimonials.filter((item) => item._id !== request.params.id);
    return response.json({ ok: true });
  }
  await Testimonial.findByIdAndDelete(request.params.id);
  response.json({ ok: true });
});

app.get("/api/gallery", async (_request, response) => {
  if (!dbReady) return response.json(memoryGallery);
  const items = await Gallery.find().sort({ createdAt: -1 });
  response.json(items.length ? items : seedGallery);
});

app.post("/api/gallery", requireAdmin, async (request, response) => {
  if (!dbReady) {
    const item = { ...request.body, _id: String(Date.now()) };
    memoryGallery.unshift(item);
    return response.status(201).json(item);
  }
  response.status(201).json(await Gallery.create(request.body));
});

app.put("/api/gallery/:id", requireAdmin, async (request, response) => {
  if (!dbReady) {
    memoryGallery = memoryGallery.map((item) => item._id === request.params.id ? { ...item, ...request.body } : item);
    return response.json(memoryGallery.find((item) => item._id === request.params.id));
  }
  response.json(await Gallery.findByIdAndUpdate(request.params.id, request.body, { new: true }));
});

app.delete("/api/gallery/:id", requireAdmin, async (request, response) => {
  if (!dbReady) {
    memoryGallery = memoryGallery.filter((item) => item._id !== request.params.id);
    return response.json({ ok: true });
  }
  await Gallery.findByIdAndDelete(request.params.id);
  response.json({ ok: true });
});

app.post("/api/uploads", requireAdmin, upload.array("media", 12), (request, response) => {
  const files = request.files.map((file) => ({
    url: `${request.protocol}://${request.get("host")}/uploads/${file.filename}`,
    type: file.mimetype.startsWith("video/") ? "video" : "image",
    title: file.originalname,
  }));
  response.status(201).json(files);
});

async function start() {
  try {
    if (process.env.MONGODB_URI) {
      await mongoose.connect(process.env.MONGODB_URI);
      dbReady = true;
      console.log("MongoDB connected");
    } else {
      console.log("MONGODB_URI not set; using in-memory demo data");
    }
    app.listen(port, () => console.log(`EscapeX API running on http://127.0.0.1:${port}`));
  } catch (error) {
    console.error("Failed to start EscapeX API", error);
    process.exit(1);
  }
}

start();
