import jwt from "jsonwebtoken";
import mongoose from "mongoose";

const jwtSecret = process.env.JWT_SECRET || "escapex-dev-secret";

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
    videos: [],
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
    images: ["https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1400&q=85"],
    videos: [],
    itinerary: [
      { day: 1, title: "Islamabad to Chilas", details: "Departure via Hazara Motorway and KKH, overnight stay in Chilas." },
      { day: 2, title: "Chilas to Skardu", details: "Drive beside Indus River, hotel check-in, dinner and rest." },
    ],
    included: ["Transport", "Hotels/camps", "Breakfast and dinner", "Guide"],
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
    images: ["https://images.unsplash.com/photo-1433086966358-54859d0ed716?auto=format&fit=crop&w=1400&q=85"],
    videos: [],
    itinerary: [
      { day: 1, title: "Departure to Swat", details: "Pickup, breakfast stop, Malam Jabba optional visit, Kalam hotel check-in." },
      { day: 2, title: "Mahodand Lake", details: "Jeep transfer to Mahodand, waterfalls, and bonfire at night." },
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
];

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

const Trip =
  mongoose.models.Trip ||
  mongoose.model(
    "Trip",
    new mongoose.Schema(
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
    ),
  );

const Booking =
  mongoose.models.Booking ||
  mongoose.model(
    "Booking",
    new mongoose.Schema(
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
    ),
  );

const Testimonial =
  mongoose.models.Testimonial ||
  mongoose.model(
    "Testimonial",
    new mongoose.Schema(
      {
        name: String,
        location: String,
        text: String,
        rating: { type: Number, default: 5 },
      },
      { timestamps: true },
    ),
  );

const Gallery =
  mongoose.models.Gallery ||
  mongoose.model(
    "Gallery",
    new mongoose.Schema(
      {
        type: { type: String, enum: ["image", "video"], default: "image" },
        url: String,
        title: String,
      },
      { timestamps: true },
    ),
  );

let memoryTrips = [...seedTrips];
let memoryBookings = [];
let memoryTestimonials = [...seedTestimonials];
let memoryGallery = [...seedGallery];

async function connectDatabase() {
  if (!process.env.MONGODB_URI) return false;
  if (mongoose.connection.readyState === 1) return true;
  try {
    await mongoose.connect(process.env.MONGODB_URI, { serverSelectionTimeoutMS: 8000 });
    return true;
  } catch (error) {
    console.error("MongoDB connection failed", error.message);
    return false;
  }
}

function send(response, status, payload) {
  response.status(status).setHeader("Content-Type", "application/json");
  response.end(JSON.stringify(payload));
}

async function readBody(request) {
  const chunks = [];
  for await (const chunk of request) chunks.push(chunk);
  if (!chunks.length) return {};
  return JSON.parse(Buffer.concat(chunks).toString("utf8"));
}

function requireAdmin(request, response) {
  const token = request.headers.authorization?.replace("Bearer ", "");
  if (!token) {
    send(response, 401, { message: "Missing admin token" });
    return null;
  }
  try {
    return jwt.verify(token, jwtSecret);
  } catch {
    send(response, 401, { message: "Invalid admin token" });
    return null;
  }
}

function getPathParts(request) {
  const path = new URL(request.url, `https://${request.headers.host || "escapex.vercel.app"}`).pathname;
  return path.replace(/^\/api\/?/, "").split("/").filter(Boolean);
}

async function handleTrips(request, response, parts, dbReady) {
  const body = ["POST", "PUT", "PATCH"].includes(request.method) ? await readBody(request) : {};
  const id = parts[1];

  if (request.method === "GET" && !id) {
    if (!dbReady) return send(response, 200, memoryTrips);
    const trips = await Trip.find().sort({ date: 1 });
    return send(response, 200, trips.length ? trips : seedTrips);
  }

  if (!requireAdmin(request, response)) return undefined;

  if (request.method === "POST" && !id) {
    if (!dbReady) {
      memoryTrips.unshift(body);
      return send(response, 201, body);
    }
    const trip = await Trip.create(body);
    return send(response, 201, trip);
  }

  if (request.method === "PUT" && id) {
    if (!dbReady) {
      memoryTrips = [body, ...memoryTrips.filter((trip) => trip.id !== id)];
      return send(response, 200, body);
    }
    const trip = await Trip.findOneAndUpdate({ id }, body, { new: true, upsert: true, setDefaultsOnInsert: true });
    return send(response, 200, trip);
  }

  if (request.method === "DELETE" && id) {
    if (!dbReady) {
      memoryTrips = memoryTrips.filter((trip) => trip.id !== id);
      return send(response, 200, { ok: true });
    }
    await Trip.deleteOne({ id });
    return send(response, 200, { ok: true });
  }

  return send(response, 405, { message: "Method not allowed" });
}

async function handleBookings(request, response, parts, dbReady) {
  const id = parts[1];
  const isStatusRoute = parts[2] === "status";

  if (request.method === "POST" && !id) {
    const body = await readBody(request);
    if (!body.agreed) return send(response, 400, { message: "Terms agreement is required" });
    if (!dbReady) {
      const booking = { ...body, _id: String(Date.now()), status: "pending", createdAt: new Date().toISOString() };
      memoryBookings.unshift(booking);
      return send(response, 201, booking);
    }
    const booking = await Booking.create(body);
    await Trip.updateOne({ id: booking.tripId }, { $inc: { seatsBooked: Number(booking.seats) || 1 } });
    return send(response, 201, booking);
  }

  if (!requireAdmin(request, response)) return undefined;

  if (request.method === "GET" && !id) {
    if (!dbReady) return send(response, 200, memoryBookings);
    const bookings = await Booking.find().sort({ createdAt: -1 });
    return send(response, 200, bookings);
  }

  if (request.method === "PATCH" && id && isStatusRoute) {
    const body = await readBody(request);
    if (!dbReady) {
      memoryBookings = memoryBookings.map((booking) => (booking._id === id ? { ...booking, status: body.status } : booking));
      return send(response, 200, memoryBookings.find((booking) => booking._id === id));
    }
    const booking = await Booking.findByIdAndUpdate(id, { status: body.status }, { new: true });
    return send(response, 200, booking);
  }

  return send(response, 405, { message: "Method not allowed" });
}

async function handleCollection(request, response, parts, dbReady, model, memory, setMemory, seeds) {
  const id = parts[1];
  const body = ["POST", "PUT", "PATCH"].includes(request.method) ? await readBody(request) : {};

  if (request.method === "GET" && !id) {
    if (!dbReady) return send(response, 200, memory);
    const items = await model.find().sort({ createdAt: -1 });
    return send(response, 200, items.length ? items : seeds);
  }

  if (!requireAdmin(request, response)) return undefined;

  if (request.method === "POST" && !id) {
    if (!dbReady) {
      const item = { ...body, _id: String(Date.now()) };
      setMemory([item, ...memory]);
      return send(response, 201, item);
    }
    return send(response, 201, await model.create(body));
  }

  if (request.method === "PUT" && id) {
    if (!dbReady) {
      const next = memory.map((item) => (item._id === id ? { ...item, ...body } : item));
      setMemory(next);
      return send(response, 200, next.find((item) => item._id === id));
    }
    return send(response, 200, await model.findByIdAndUpdate(id, body, { new: true }));
  }

  if (request.method === "DELETE" && id) {
    if (!dbReady) {
      setMemory(memory.filter((item) => item._id !== id));
      return send(response, 200, { ok: true });
    }
    await model.findByIdAndDelete(id);
    return send(response, 200, { ok: true });
  }

  return send(response, 405, { message: "Method not allowed" });
}

export default async function handler(request, response) {
  try {
    const parts = getPathParts(request);
    const resource = parts[0] || "health";
    const dbReady = await connectDatabase();

    if (resource === "health") return send(response, 200, { ok: true, service: "EscapeX API", database: dbReady ? "mongodb" : "memory" });

    if (resource === "auth" && parts[1] === "login" && request.method === "POST") {
      const body = await readBody(request);
      const adminEmail = process.env.ADMIN_EMAIL || "admin@escapex.pk";
      const adminPassword = process.env.ADMIN_PASSWORD || "admin12345";
      if (body.email !== adminEmail || body.password !== adminPassword) return send(response, 401, { message: "Invalid credentials" });
      const token = jwt.sign({ email: body.email, role: "admin" }, jwtSecret, { expiresIn: "8h" });
      return send(response, 200, { token });
    }

    if (resource === "trips") return handleTrips(request, response, parts, dbReady);
    if (resource === "bookings") return handleBookings(request, response, parts, dbReady);
    if (resource === "testimonials") {
      return handleCollection(
        request,
        response,
        parts,
        dbReady,
        Testimonial,
        memoryTestimonials,
        (items) => {
          memoryTestimonials = items;
        },
        seedTestimonials,
      );
    }
    if (resource === "gallery") {
      return handleCollection(
        request,
        response,
        parts,
        dbReady,
        Gallery,
        memoryGallery,
        (items) => {
          memoryGallery = items;
        },
        seedGallery,
      );
    }

    if (resource === "uploads") return send(response, 410, { message: "Direct image upload is now handled inside the admin form." });

    return send(response, 404, { message: "Not found" });
  } catch (error) {
    console.error("EscapeX API error", error);
    return send(response, 500, { message: "Server error" });
  }
}
