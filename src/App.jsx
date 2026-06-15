import React, { useEffect, useMemo, useState } from "react";
import {
  BadgeCheck,
  CalendarDays,
  Camera,
  CheckCircle2,
  ChevronRight,
  Clock3,
  Edit3,
  Filter,
  Flame,
  ImagePlus,
  Instagram,
  LogOut,
  MapPin,
  Menu,
  MessageCircle,
  Mountain,
  Play,
  Plus,
  Search,
  ShieldCheck,
  Star,
  TentTree,
  Trash2,
  Users,
  X,
} from "lucide-react";

const apiBase = import.meta.env.VITE_API_URL || "http://127.0.0.1:4000/api";
const contact = {
  whatsappDisplay: "0324 4378226",
  whatsappUrl: "https://wa.me/923244378226",
  instagramHandle: "excapex_5",
  instagramUrl: "https://www.instagram.com/excapex_5/",
};

const media = {
  hero: [
    "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=2200&q=88",
    "https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=2200&q=88",
    "https://images.unsplash.com/photo-1433086966358-54859d0ed716?auto=format&fit=crop&w=2200&q=88",
  ],
  gallery: [
    { type: "image", url: "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=1100&q=85", title: "Forest trail" },
    { type: "image", url: "https://images.unsplash.com/photo-1445307806294-bff7f67ff225?auto=format&fit=crop&w=1100&q=85", title: "Bonfire camp" },
    { type: "video", url: "https://videos.pexels.com/video-files/1793334/1793334-hd_1280_720_30fps.mp4", title: "Mountain road" },
    { type: "image", url: "https://images.unsplash.com/photo-1519904981063-b0cf448d479e?auto=format&fit=crop&w=1100&q=85", title: "Cabin stay" },
    { type: "video", url: "https://videos.pexels.com/video-files/854150/854150-hd_1280_720_25fps.mp4", title: "Lake view" },
    { type: "image", url: "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=1100&q=85", title: "Jeep adventure" },
  ],
};

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
    images: [
      "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1400&q=85",
      "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=1100&q=85",
      "https://images.unsplash.com/photo-1519904981063-b0cf448d479e?auto=format&fit=crop&w=1100&q=85",
    ],
    videos: ["https://videos.pexels.com/video-files/1793334/1793334-hd_1280_720_30fps.mp4"],
    itinerary: [
      { day: 1, title: "Departure and Besham stay", details: "Night departure, breakfast en route, scenic drive along Karakoram Highway, hotel check-in." },
      { day: 2, title: "Hunza arrival", details: "Rakaposhi viewpoint, Karimabad bazaar, Baltit Fort optional visit, dinner at hotel." },
      { day: 3, title: "Attabad and Passu", details: "Boating at Attabad Lake, Hussaini bridge, Passu Cones sunset photography." },
      { day: 4, title: "Khunjerab adventure", details: "Full-day jeep/coach ride toward Khunjerab Pass subject to weather and road conditions." },
      { day: 5, title: "Return journey", details: "Breakfast, checkout, drive back with short stops for tea and photography." },
    ],
    included: ["Luxury transport", "Hotel rooms on sharing basis", "Breakfast and dinner", "Tour guide", "Basic first aid", "Bonfire where available"],
    notIncluded: ["Lunch", "Entry tickets", "Boating/rafting", "Personal shopping", "Jeep charges where road requires local jeeps"],
    stay: "Family hotels in Hunza and Besham. Twin/triple sharing rooms with clean washrooms; camps arranged on request.",
    terms: {
      bookingPolicy: "Seats are reserved after advance payment and CNIC/WhatsApp confirmation.",
      paymentPolicy: "50% advance is required at booking. Remaining amount is payable before departure.",
      cancellationPolicy: "Cancellation within 72 hours of departure is non-refundable. Earlier cancellations may be adjusted in future trips.",
      travelRules: "Follow guide instructions, respect local communities, and keep the vehicle schedule.",
      safetyGuidelines: "Weather, road closures, and landslides can change the itinerary. Safety decisions by tour lead are final.",
      bring: "Warm jacket, comfortable shoes, CNIC, personal medication, power bank, and reusable water bottle.",
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
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=85",
    ],
    videos: ["https://videos.pexels.com/video-files/854150/854150-hd_1280_720_25fps.mp4"],
    itinerary: [
      { day: 1, title: "Islamabad to Chilas", details: "Departure via Hazara Motorway and KKH, overnight stay in Chilas." },
      { day: 2, title: "Chilas to Skardu", details: "Drive beside Indus River, hotel check-in, dinner and rest." },
      { day: 3, title: "Shangrila and Upper Kachura", details: "Lake visits, photography, optional boating, evening bazaar time." },
      { day: 4, title: "Deosai plains", details: "Jeep safari to Deosai National Park with packed meal and wildlife viewpoints." },
      { day: 5, title: "Shigar and Katpana", details: "Visit Shigar Fort, cold desert, camping/bonfire experience." },
      { day: 6, title: "Return", details: "Checkout and return journey with overnight continuation as needed." },
    ],
    included: ["Transport", "Hotels/camps", "Breakfast and dinner", "Jeep for Deosai if included in final plan", "Tour photography", "Guide"],
    notIncluded: ["Lunch", "Personal porter", "Extra heater charges", "Tickets", "Rescue/medical evacuation costs"],
    stay: "Skardu hotel rooms plus one optional camp night near Katpana or Shigar, depending on weather.",
    terms: {
      bookingPolicy: "Booking requires verified contact number and advance payment receipt.",
      paymentPolicy: "Bank transfer, Easypaisa, or JazzCash accepted. Balance must be cleared before trip starts.",
      cancellationPolicy: "Refunds are subject to hotel and transport deductions already paid to vendors.",
      travelRules: "No littering, no disruptive behavior, and no unscheduled solo movement during jeep segments.",
      safetyGuidelines: "High altitude areas require hydration, warm layers, and cooperation with tour lead.",
      bring: "Thermals, sunscreen, sunglasses, CNIC, trekking shoes, medication, and small backpack.",
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
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=85",
    ],
    videos: [],
    itinerary: [
      { day: 1, title: "Departure to Swat", details: "Pickup, breakfast stop, Malam Jabba chairlift optional, Kalam hotel check-in." },
      { day: 2, title: "Mahodand Lake", details: "Jeep transfer to Mahodand, waterfalls, trout lunch optional, bonfire at night." },
      { day: 3, title: "Return via Bahrain", details: "Breakfast, Bahrain market stop, return to pickup cities." },
    ],
    included: ["Transport", "Hotel stay", "Breakfast and dinner", "Tour coordinator", "Bonfire", "Basic first aid"],
    notIncluded: ["Lunch", "Jeep charges to lake", "Chairlift tickets", "Personal expenses"],
    stay: "Kalam hotel on 3/4 sharing basis. Couple room upgrades available with prior booking.",
    terms: {
      bookingPolicy: "Booking confirmation is shared on WhatsApp after seat advance.",
      paymentPolicy: "Advance payment is mandatory because weekend hotel inventory is limited.",
      cancellationPolicy: "No-show and same-day cancellation are non-refundable.",
      travelRules: "Timely departure from stops is required so the group can complete the itinerary.",
      safetyGuidelines: "Lake access depends on road condition and weather clearance.",
      bring: "Rain jacket, warm clothes, joggers, CNIC, medication, and cash for areas with weak network.",
    },
  },
];

const seedTestimonials = [
  { id: "t1", name: "Areeba Khan", location: "Lahore", text: "EscapeX managed our Hunza trip beautifully. Hotels were clean, timings were clear, and the views felt unreal.", rating: 5 },
  { id: "t2", name: "Saad Malik", location: "Islamabad", text: "Loved the Skardu jeep day and bonfire. The team kept everyone updated and handled road changes professionally.", rating: 5 },
  { id: "t3", name: "Maham Raza", location: "Peshawar", text: "A safe, friendly, and very scenic Kalam weekend. The booking process was simple and WhatsApp support was quick.", rating: 5 },
];

const whyChoose = [
  ["Northern Areas specialists", "Routes, hotels, jeep tracks, weather windows, and local vendors are planned before every departure."],
  ["Adventure with structure", "You get the thrill of mountains, forests, lakes, waterfalls, camping, and bonfires with clear operations."],
  ["Transparent pricing", "Per-head cost, couple charges, inclusions, exclusions, and trip terms are visible before booking."],
  ["Responsive support", "Bookings, pickup details, and special requests are handled through admin and WhatsApp follow-up."],
];

function money(value) {
  return `PKR ${Number(value).toLocaleString("en-PK")}`;
}

function dateLabel(value) {
  return new Intl.DateTimeFormat("en-GB", { day: "2-digit", month: "short", year: "numeric" }).format(new Date(value));
}

async function api(path, options = {}) {
  const token = localStorage.getItem("escapex_token");
  const headers = { "Content-Type": "application/json", ...(options.headers || {}) };
  if (token) headers.Authorization = `Bearer ${token}`;
  const response = await fetch(`${apiBase}${path}`, { ...options, headers });
  if (!response.ok) throw new Error((await response.json().catch(() => ({}))).message || "Request failed");
  return response.json();
}

function Logo() {
  return (
    <span className="flex items-center gap-3">
      <span className="grid h-10 w-10 place-items-center rounded-md bg-sun text-forest shadow-sun">
        <Mountain className="h-6 w-6" aria-hidden="true" />
      </span>
      <span className="leading-none">
        <span className="block text-lg font-black tracking-wide text-white">EscapeX</span>
        <span className="block text-[10px] font-bold uppercase tracking-[0.28em] text-sun">Escape the Ordinary</span>
      </span>
    </span>
  );
}

function Button({ children, href, onClick, variant = "primary", icon: Icon = ChevronRight, type = "button", disabled = false }) {
  const classes =
    variant === "primary"
      ? "bg-sun text-forest hover:bg-white"
      : variant === "ghost"
        ? "border border-white/15 bg-white/8 text-white hover:border-sun hover:text-sun"
        : "bg-forest text-white hover:bg-moss";
  const content = (
    <>
      {children}
      {Icon && <Icon className="h-4 w-4" aria-hidden="true" />}
    </>
  );
  const className = `inline-flex min-h-11 items-center justify-center gap-2 rounded-md px-5 text-sm font-black transition disabled:cursor-not-allowed disabled:opacity-50 ${classes}`;
  if (href) return <a className={className} href={href}>{content}</a>;
  return <button className={className} onClick={onClick} type={type} disabled={disabled}>{content}</button>;
}

function App() {
  const [page, setPage] = useState(() => window.location.pathname);
  const [trips, setTrips] = useState(seedTrips);
  const [testimonials, setTestimonials] = useState(seedTestimonials);
  const [gallery, setGallery] = useState(media.gallery);
  const [bookings, setBookings] = useState([]);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    Promise.allSettled([api("/trips"), api("/testimonials"), api("/gallery")]).then(([tripData, testimonialData, galleryData]) => {
      if (tripData.status === "fulfilled" && tripData.value.length >= seedTrips.length) setTrips(tripData.value);
      if (testimonialData.status === "fulfilled" && testimonialData.value.length >= seedTestimonials.length) setTestimonials(testimonialData.value);
      if (galleryData.status === "fulfilled" && galleryData.value.length >= media.gallery.length) setGallery(galleryData.value);
    });
  }, []);

  const navigate = (path) => {
    window.history.pushState({}, "", path);
    setPage(path);
    setMenuOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    const onPop = () => setPage(window.location.pathname);
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);

  const selectedTrip = trips.find((trip) => page === `/trips/${trip.id}` || page === `/trips/${trip._id}`);
  const isAdmin = page.startsWith("/admin");

  return (
    <main className="min-h-screen overflow-x-hidden bg-ink text-white">
      {!isAdmin && <Nav navigate={navigate} menuOpen={menuOpen} setMenuOpen={setMenuOpen} />}
      {page === "/" && <Home trips={trips} testimonials={testimonials} gallery={gallery} navigate={navigate} />}
      {page === "/trips" && <TripsPage trips={trips} navigate={navigate} />}
      {selectedTrip && <TripDetail trip={selectedTrip} navigate={navigate} />}
      {isAdmin && (
        <AdminPanel
          trips={trips}
          setTrips={setTrips}
          testimonials={testimonials}
          setTestimonials={setTestimonials}
          gallery={gallery}
          setGallery={setGallery}
          bookings={bookings}
          setBookings={setBookings}
          navigate={navigate}
        />
      )}
      {!isAdmin && <Footer navigate={navigate} />}
    </main>
  );
}

function Nav({ navigate, menuOpen, setMenuOpen }) {
  const links = [
    ["Home", "/"],
    ["Trips", "/trips"],
    ["Gallery", "/#gallery"],
    ["Testimonials", "/#testimonials"],
    ["Admin", "/admin"],
  ];
  const click = (path) => {
    if (path.includes("#")) {
      navigate("/");
      setTimeout(() => document.querySelector(path.slice(path.indexOf("#")))?.scrollIntoView({ behavior: "smooth" }), 60);
      return;
    }
    navigate(path);
  };
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-black/70 backdrop-blur-xl">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:h-18 sm:px-6 lg:px-8">
        <button type="button" onClick={() => click("/")} className="text-left"><Logo /></button>
        <div className="hidden items-center gap-7 text-sm font-bold text-white/70 md:flex">
          {links.map(([label, path]) => (
            <button key={label} type="button" onClick={() => click(path)} className="transition hover:text-sun">{label}</button>
          ))}
        </div>
        <div className="hidden items-center gap-3 md:flex">
          <Button onClick={() => click("/trips")} variant="ghost" icon={CalendarDays}>Upcoming Trips</Button>
          <Button onClick={() => click("/trips")} icon={Users}>Book Your Seat</Button>
        </div>
        <button type="button" className="grid h-10 w-10 place-items-center rounded-md border border-white/15 text-white md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X /> : <Menu />}
        </button>
      </nav>
      {menuOpen && (
        <div className="border-t border-white/10 bg-black px-4 py-4 md:hidden">
          {links.map(([label, path]) => (
            <button key={label} type="button" onClick={() => click(path)} className="block w-full py-3 text-left font-bold text-white/75">{label}</button>
          ))}
        </div>
      )}
    </header>
  );
}

function Home({ trips, testimonials, gallery, navigate }) {
  return (
    <>
      <Hero navigate={navigate} />
      <section id="trips" className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
        <SectionTitle eyebrow="Upcoming Trips" title="Northern Pakistan adventures ready for booking" />
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {trips.slice(0, 3).map((trip) => <TripCard key={trip.id || trip._id} trip={trip} navigate={navigate} />)}
        </div>
      </section>
      <section className="bg-white/[0.035] py-12 sm:py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionTitle eyebrow="Why Choose Us" title="Designed for travelers who want wild views and dependable planning" />
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {whyChoose.map(([title, text], index) => (
              <div key={title} className="rounded-lg border border-white/10 bg-black/30 p-6">
                <span className="grid h-11 w-11 place-items-center rounded-md bg-sun text-forest">{[<TentTree />, <Flame />, <BadgeCheck />, <ShieldCheck />][index]}</span>
                <h3 className="mt-5 text-xl font-black">{title}</h3>
                <p className="mt-3 leading-7 text-white/64">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <Gallery gallery={gallery} />
      <Testimonials testimonials={testimonials} />
      <ContactCta navigate={navigate} />
    </>
  );
}

function Hero({ navigate }) {
  const [active, setActive] = useState(0);
  useEffect(() => {
    const timer = setInterval(() => setActive((value) => (value + 1) % media.hero.length), 4200);
    return () => clearInterval(timer);
  }, []);
  return (
    <section className="relative min-h-[640px] overflow-hidden pt-16 sm:min-h-[700px] lg:min-h-[760px] xl:min-h-[820px]">
      {media.hero.map((image, index) => (
        <img key={image} src={image} alt="" className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ${index === active ? "opacity-100" : "opacity-0"}`} />
      ))}
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(0,0,0,.9),rgba(3,40,28,.62),rgba(0,0,0,.25)),linear-gradient(0deg,rgba(0,0,0,.9),transparent_55%)]" />
      <div className="relative mx-auto flex min-h-[calc(640px-4rem)] max-w-7xl items-center px-4 py-12 sm:min-h-[calc(700px-4rem)] sm:px-6 lg:min-h-[calc(760px-4rem)] lg:px-8 xl:min-h-[calc(820px-4rem)]">
        <div className="max-w-3xl text-left drop-shadow-[0_4px_24px_rgba(0,0,0,0.85)]">
          <div className="mb-7 inline-flex items-center gap-3 rounded-md border border-white/15 bg-white/10 px-4 py-3 backdrop-blur">
            <Logo />
          </div>
          <p className="text-xs font-black uppercase tracking-[0.28em] text-sun sm:text-sm">Pakistan tourism | mountains | forests | lakes</p>
          <h1 className="mt-5 max-w-4xl text-5xl font-black leading-[0.98] text-white sm:text-6xl lg:text-7xl xl:text-8xl">Escape the Ordinary</h1>
          <p className="mt-6 max-w-2xl text-base leading-7 text-white/78 sm:text-lg sm:leading-8 lg:text-xl">Modern group tours across Hunza, Skardu, Swat, Kashmir, and Pakistan's Northern Areas with adventure routes, hotel/camp stays, jeep experiences, bonfires, and responsive booking support.</p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Button onClick={() => navigate("/trips")} variant="ghost" icon={CalendarDays}>View Upcoming Trips</Button>
            <Button onClick={() => navigate("/trips")} icon={Users}>Book Your Seat</Button>
          </div>
        </div>
      </div>
    </section>
  );
}

function SectionTitle({ eyebrow, title }) {
  return (
    <div className="mb-10 max-w-4xl">
      <p className="text-sm font-black uppercase tracking-[0.28em] text-sun">{eyebrow}</p>
      <h2 className="mt-3 text-3xl font-black leading-tight text-white sm:text-4xl lg:text-5xl">{title}</h2>
    </div>
  );
}

function TripCard({ trip, navigate }) {
  const tripId = trip.id || trip._id;
  const available = Math.max(0, Number(trip.seats) - Number(trip.seatsBooked || 0));
  return (
    <article className="overflow-hidden rounded-lg border border-white/10 bg-white/[0.045] shadow-soft">
      <div className="relative aspect-[16/10] overflow-hidden">
        <img src={trip.cover || trip.images?.[0]} alt={trip.destination} className="h-full w-full object-cover transition duration-500 hover:scale-105" />
        <span className="absolute left-4 top-4 rounded-md bg-black/70 px-3 py-2 text-xs font-black uppercase tracking-[0.16em] text-sun">{dateLabel(trip.date)}</span>
      </div>
      <div className="p-5">
        <h3 className="text-2xl font-black">{trip.destination}</h3>
        <p className="mt-2 flex items-center gap-2 text-sm text-white/62"><MapPin className="h-4 w-4 text-sun" />{trip.location}</p>
        <div className="mt-5 grid grid-cols-2 gap-3 text-sm">
          <Info icon={Clock3} label={`${trip.duration} days`} />
          <Info icon={Users} label={`${available} seats left`} />
          <Info icon={CalendarDays} label={dateLabel(trip.date)} />
          <Info icon={BadgeCheck} label={money(trip.price)} />
        </div>
        <Button onClick={() => navigate(`/trips/${tripId}`)} icon={ChevronRight}>Book Now</Button>
      </div>
    </article>
  );
}

function Info({ icon: Icon, label }) {
  return <span className="flex items-center gap-2 rounded-md bg-black/28 px-3 py-2 text-white/72"><Icon className="h-4 w-4 text-sun" />{label}</span>;
}

function TripsPage({ trips, navigate }) {
  const [destination, setDestination] = useState("All");
  const [maxPrice, setMaxPrice] = useState(60000);
  const [duration, setDuration] = useState("All");
  const destinations = ["All", ...new Set(trips.map((trip) => trip.destination))];
  const filteredTrips = trips.filter((trip) => {
    const destinationMatch = destination === "All" || trip.destination === destination;
    const priceMatch = Number(trip.price) <= Number(maxPrice);
    const durationMatch = duration === "All" || Number(trip.duration) === Number(duration);
    return destinationMatch && priceMatch && durationMatch;
  });
  return (
    <section className="mx-auto max-w-7xl px-4 pb-16 pt-24 sm:px-6 sm:pb-20 sm:pt-28 lg:px-8">
      <SectionTitle eyebrow="Trips" title="Choose your next mountain escape" />
      <div className="mb-8 grid gap-3 rounded-lg border border-white/10 bg-white/[0.045] p-4 md:grid-cols-[1fr_1fr_1fr_auto]">
        <Select label="Destination" value={destination} onChange={setDestination} options={destinations} />
        <label className="grid gap-2 text-sm font-bold text-white/72">
          Price up to {money(maxPrice)}
          <input type="range" min="20000" max="70000" step="2500" value={maxPrice} onChange={(event) => setMaxPrice(event.target.value)} className="accent-[#f7b733]" />
        </label>
        <Select label="Duration" value={duration} onChange={setDuration} options={["All", "3", "5", "6"]} />
        <div className="flex items-end"><Button variant="ghost" icon={Filter}>Filters</Button></div>
      </div>
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {filteredTrips.map((trip) => <TripCard key={trip.id || trip._id} trip={trip} navigate={navigate} />)}
      </div>
    </section>
  );
}

function Select({ label, value, onChange, options }) {
  return (
    <label className="grid gap-2 text-sm font-bold text-white/72">
      {label}
      <select value={value} onChange={(event) => onChange(event.target.value)} className="h-11 rounded-md border border-white/10 bg-black/35 px-3 text-white outline-none focus:border-sun">
        {options.map((option) => <option key={option} value={option}>{option === "All" ? "All" : option}</option>)}
      </select>
    </label>
  );
}

function TripDetail({ trip, navigate }) {
  const [selectedImage, setSelectedImage] = useState(trip.images?.[0] || trip.cover);
  const termRows = Object.entries(trip.terms || {});
  return (
    <section className="pb-20 pt-20">
      <div className="relative min-h-[58vh] overflow-hidden">
        <img src={selectedImage} alt={trip.destination} className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(0,0,0,.88),rgba(2,43,28,.56),rgba(0,0,0,.22)),linear-gradient(0deg,rgba(0,0,0,.9),transparent)]" />
        <div className="relative mx-auto flex min-h-[520px] max-w-7xl items-end px-4 pb-10 sm:px-6 lg:px-8">
          <div>
            <button type="button" onClick={() => navigate("/trips")} className="mb-5 text-sm font-bold text-sun">Back to trips</button>
            <h1 className="text-4xl font-black sm:text-6xl lg:text-7xl">{trip.destination}</h1>
            <p className="mt-4 max-w-2xl text-lg text-white/74">{trip.location}</p>
          </div>
        </div>
      </div>
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[1.1fr_.9fr] lg:px-8">
        <div>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            <Info icon={CalendarDays} label={dateLabel(trip.date)} />
            <Info icon={Clock3} label={`${trip.duration} days`} />
            <Info icon={BadgeCheck} label={money(trip.price)} />
            <Info icon={Users} label={`${Number(trip.seats) - Number(trip.seatsBooked || 0)} seats left`} />
          </div>
          <div className="mt-6 grid grid-cols-4 gap-3">
            {trip.images?.map((image) => (
              <button key={image} type="button" onClick={() => setSelectedImage(image)} className="aspect-square overflow-hidden rounded-md border border-white/10">
                <img src={image} alt="" className="h-full w-full object-cover" />
              </button>
            ))}
          </div>
          {trip.videos?.length > 0 && (
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {trip.videos.map((video) => <video key={video} src={video} controls muted className="aspect-video w-full rounded-lg border border-white/10 object-cover" />)}
            </div>
          )}
          <DetailBlock title="Day-wise itinerary">
            <div className="space-y-4">
              {trip.itinerary?.map((item) => (
                <div key={item.day} className="rounded-lg border border-white/10 bg-white/[0.04] p-5">
                  <p className="text-sm font-black uppercase tracking-[0.2em] text-sun">Day {item.day}</p>
                  <h3 className="mt-2 text-xl font-black">{item.title}</h3>
                  <p className="mt-2 leading-7 text-white/65">{item.details}</p>
                </div>
              ))}
            </div>
          </DetailBlock>
          <div className="grid gap-6 md:grid-cols-2">
            <DetailBlock title="Services included"><CheckList items={trip.included} /></DetailBlock>
            <DetailBlock title="Not included"><CheckList items={trip.notIncluded} negative /></DetailBlock>
          </div>
          <DetailBlock title="Hotel and camp details"><p className="leading-8 text-white/68">{trip.stay}</p></DetailBlock>
          <DetailBlock title="Terms & Conditions">
            <div className="grid gap-3">
              {termRows.map(([key, value]) => (
                <div key={key} className="rounded-md bg-black/24 p-4">
                  <h4 className="font-black capitalize text-sun">{key.replace(/([A-Z])/g, " $1")}</h4>
                  <p className="mt-1 leading-7 text-white/66">{value}</p>
                </div>
              ))}
            </div>
          </DetailBlock>
        </div>
        <aside className="lg:sticky lg:top-24 lg:self-start">
          <div className="rounded-lg border border-white/10 bg-white/[0.055] p-6 shadow-soft">
            <h2 className="text-2xl font-black">Book this trip</h2>
            <p className="mt-2 text-white/64">Per head: {money(trip.price)} | Couple: {money(trip.coupleCharges)}</p>
            <BookingForm trip={trip} />
          </div>
        </aside>
      </div>
    </section>
  );
}

function DetailBlock({ title, children }) {
  return <section className="mt-9"><h2 className="mb-4 text-2xl font-black">{title}</h2>{children}</section>;
}

function CheckList({ items = [], negative = false }) {
  return (
    <ul className="space-y-3">
      {items.map((item) => (
        <li key={item} className="flex gap-3 text-white/68">
          {negative ? <X className="mt-1 h-4 w-4 shrink-0 text-red-300" /> : <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-sun" />}
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

function BookingForm({ trip }) {
  const [form, setForm] = useState({ name: "", phone: "", email: "", cnic: "", seats: 1, pickupCity: trip.pickupCities?.[0] || "", request: "", agreed: false });
  const [status, setStatus] = useState("");
  const submit = async (event) => {
    event.preventDefault();
    if (!form.agreed) return setStatus("Please agree to the Terms & Conditions before booking.");
    const payload = { ...form, tripId: trip.id || trip._id, tripSelected: trip.destination };
    try {
      await api("/bookings", { method: "POST", body: JSON.stringify(payload) });
      setStatus("Booking submitted. EscapeX admin will confirm your seat on WhatsApp.");
      setForm({ ...form, name: "", phone: "", email: "", cnic: "", request: "", seats: 1, agreed: false });
    } catch {
      const local = JSON.parse(localStorage.getItem("escapex_bookings") || "[]");
      localStorage.setItem("escapex_bookings", JSON.stringify([{ ...payload, status: "pending", createdAt: new Date().toISOString() }, ...local]));
      setStatus("Booking saved locally for demo. Connect backend to submit directly to admin panel.");
    }
  };
  return (
    <form className="mt-5 grid gap-4" onSubmit={submit}>
      <Input label="Name" required value={form.name} onChange={(name) => setForm({ ...form, name })} />
      <Input label="Phone/WhatsApp" required value={form.phone} onChange={(phone) => setForm({ ...form, phone })} />
      <Input label="Email optional" type="email" value={form.email} onChange={(email) => setForm({ ...form, email })} />
      <Input label="CNIC optional" value={form.cnic} onChange={(cnic) => setForm({ ...form, cnic })} />
      <Input label="Number of seats" type="number" min="1" required value={form.seats} onChange={(seats) => setForm({ ...form, seats })} />
      <label className="grid gap-2 text-sm font-bold text-white/72">
        Trip selected
        <input className="h-11 rounded-md border border-white/10 bg-black/35 px-3 text-white" value={trip.destination} readOnly />
      </label>
      <Select label="Pickup city" value={form.pickupCity} onChange={(pickupCity) => setForm({ ...form, pickupCity })} options={trip.pickupCities || ["Islamabad"]} />
      <label className="grid gap-2 text-sm font-bold text-white/72">
        Special request
        <textarea className="min-h-24 rounded-md border border-white/10 bg-black/35 px-3 py-3 text-white outline-none focus:border-sun" value={form.request} onChange={(event) => setForm({ ...form, request: event.target.value })} />
      </label>
      <label className="flex items-start gap-3 text-sm leading-6 text-white/72">
        <input type="checkbox" checked={form.agreed} onChange={(event) => setForm({ ...form, agreed: event.target.checked })} className="mt-1 accent-[#f7b733]" required />
        I have read and agree to the Terms & Conditions.
      </label>
      <Button type="submit" icon={MessageCircle}>Submit booking</Button>
      {status && <p className="rounded-md bg-black/30 p-3 text-sm text-sun">{status}</p>}
    </form>
  );
}

function Input({ label, value, onChange, type = "text", required = false, min }) {
  return (
    <label className="grid gap-2 text-sm font-bold text-white/72">
      {label}
      <input type={type} min={min} required={required} value={value} onChange={(event) => onChange(event.target.value)} className="h-11 rounded-md border border-white/10 bg-black/35 px-3 text-white outline-none focus:border-sun" />
    </label>
  );
}

function Gallery({ gallery }) {
  return (
    <section id="gallery" className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
      <SectionTitle eyebrow="Gallery" title="Mountains, forests, lakes, jeeps, camps, and cabin stays" />
      <div className="grid auto-rows-[190px] gap-4 sm:auto-rows-[220px] md:grid-cols-3 lg:auto-rows-[240px]">
        {gallery.map((item, index) => (
          <div key={`${item.url}-${index}`} className={`group relative overflow-hidden rounded-lg border border-white/10 bg-white/[0.04] ${index === 0 ? "md:col-span-2 md:row-span-2" : ""}`}>
            {item.type === "video" ? <video src={item.url} muted loop autoPlay playsInline className="h-full w-full object-cover" /> : <img src={item.url} alt={item.title} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />}
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black to-transparent p-5">
              <p className="flex items-center gap-2 font-black"><Camera className="h-4 w-4 text-sun" />{item.title}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function Testimonials({ testimonials }) {
  return (
    <section id="testimonials" className="bg-white/[0.035] py-12 sm:py-16 lg:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionTitle eyebrow="Testimonials" title="Travelers who escaped the ordinary with us" />
        <div className="grid gap-4 md:grid-cols-3">
          {testimonials.map((item) => (
            <article key={item.id || item.name} className="rounded-lg border border-white/10 bg-black/28 p-6">
              <div className="flex gap-1 text-sun">{Array.from({ length: item.rating || 5 }).map((_, index) => <Star key={index} className="h-4 w-4 fill-current" />)}</div>
              <p className="mt-5 leading-8 text-white/72">"{item.text}"</p>
              <p className="mt-5 font-black">{item.name}</p>
              <p className="text-sm text-white/48">{item.location}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function ContactCta({ navigate }) {
  return (
    <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
      <div className="relative overflow-hidden rounded-lg border border-white/10 bg-forest p-8 sm:p-12">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=1800&q=80')] bg-cover bg-center opacity-20" />
        <div className="relative grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.28em] text-sun">Contact / WhatsApp</p>
            <h2 className="mt-3 text-3xl font-black sm:text-5xl">Ready for your next Pakistan adventure?</h2>
            <p className="mt-4 max-w-2xl text-white/72">Choose a trip, submit your booking, and EscapeX will confirm pickup, payment, and seat status through WhatsApp at {contact.whatsappDisplay}.</p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button onClick={() => navigate("/trips")} icon={Search}>Find trips</Button>
            <Button href={contact.whatsappUrl} variant="ghost" icon={MessageCircle}>WhatsApp us</Button>
            <Button href={contact.instagramUrl} variant="ghost" icon={Instagram}>Instagram</Button>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer({ navigate }) {
  return (
    <footer className="border-t border-white/10 bg-black px-4 py-10">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <Logo />
        <div className="text-sm leading-7 text-white/54">
          <p>EscapeX is owned by Innovex Resource Group Limited.</p>
          <p>
            WhatsApp: <a href={contact.whatsappUrl} className="font-bold text-sun">{contact.whatsappDisplay}</a>
            <span className="mx-2 text-white/25">|</span>
            Instagram: <a href={contact.instagramUrl} className="font-bold text-sun">@{contact.instagramHandle}</a>
          </p>
          <button type="button" onClick={() => navigate("/admin")} className="font-bold text-sun">Admin dashboard</button>
        </div>
      </div>
    </footer>
  );
}

function AdminPanel({ trips, setTrips, testimonials, setTestimonials, gallery, setGallery, bookings, setBookings, navigate }) {
  const [token, setToken] = useState(localStorage.getItem("escapex_token") || "");
  const [login, setLogin] = useState({ email: "admin@escapex.pk", password: "admin12345" });
  const [active, setActive] = useState("dashboard");
  const [tripDraft, setTripDraft] = useState(seedTrips[0]);
  const [notice, setNotice] = useState("");

  useEffect(() => {
    if (!token) return;
    api("/bookings").then(setBookings).catch(() => setBookings(JSON.parse(localStorage.getItem("escapex_bookings") || "[]")));
  }, [token, setBookings]);

  const doLogin = async (event) => {
    event.preventDefault();
    try {
      const result = await api("/auth/login", { method: "POST", body: JSON.stringify(login) });
      localStorage.setItem("escapex_token", result.token);
      setToken(result.token);
    } catch {
      localStorage.setItem("escapex_token", "demo-token");
      setToken("demo-token");
      setNotice("Demo login active. Start backend for JWT-secured admin authentication.");
    }
  };

  const saveTrip = async () => {
    const id = tripDraft.id || tripDraft._id || tripDraft.destination.toLowerCase().replaceAll(" ", "-");
    const next = { ...tripDraft, id };
    setTrips((items) => [next, ...items.filter((item) => (item.id || item._id) !== id)]);
    setNotice("Trip saved. Backend API will persist it when connected.");
    try { await api(`/trips/${id}`, { method: "PUT", body: JSON.stringify(next) }); } catch { /* demo mode */ }
  };

  const deleteTrip = (id) => {
    setTrips((items) => items.filter((item) => (item.id || item._id) !== id));
    api(`/trips/${id}`, { method: "DELETE" }).catch(() => {});
  };

  const updateBookingStatus = (index, status) => {
    setBookings((items) => items.map((item, itemIndex) => itemIndex === index ? { ...item, status } : item));
  };

  if (!token) {
    return (
      <section className="grid min-h-screen place-items-center bg-[url('https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=1800&q=85')] bg-cover bg-center px-4">
        <form onSubmit={doLogin} className="w-full max-w-md rounded-lg border border-white/10 bg-black/75 p-6 backdrop-blur">
          <Logo />
          <h1 className="mt-8 text-3xl font-black">Secure admin login</h1>
          <div className="mt-6 grid gap-4">
            <Input label="Email" type="email" value={login.email} onChange={(email) => setLogin({ ...login, email })} required />
            <Input label="Password" type="password" value={login.password} onChange={(password) => setLogin({ ...login, password })} required />
            <Button type="submit" icon={ShieldCheck}>Login</Button>
          </div>
        </form>
      </section>
    );
  }

  const tabs = ["dashboard", "trips", "bookings", "testimonials", "gallery", "terms"];
  return (
    <section className="min-h-screen bg-ink">
      <header className="border-b border-white/10 bg-black/80 px-4 py-4">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <Logo />
          <div className="flex gap-2 overflow-x-auto">
            {tabs.map((tab) => <button key={tab} type="button" onClick={() => setActive(tab)} className={`rounded-md px-3 py-2 text-sm font-black capitalize ${active === tab ? "bg-sun text-forest" : "bg-white/8 text-white/70"}`}>{tab}</button>)}
          </div>
          <Button variant="ghost" icon={LogOut} onClick={() => { localStorage.removeItem("escapex_token"); setToken(""); navigate("/"); }}>Logout</Button>
        </div>
      </header>
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {notice && <p className="mb-5 rounded-md border border-sun/30 bg-sun/10 p-3 text-sm text-sun">{notice}</p>}
        {active === "dashboard" && <Dashboard trips={trips} bookings={bookings} />}
        {(active === "trips" || active === "terms") && (
          <TripManager trips={trips} tripDraft={tripDraft} setTripDraft={setTripDraft} saveTrip={saveTrip} deleteTrip={deleteTrip} focusTerms={active === "terms"} />
        )}
        {active === "bookings" && <BookingsTable bookings={bookings} updateBookingStatus={updateBookingStatus} />}
        {active === "testimonials" && <SimpleList title="Testimonials" items={testimonials} setItems={setTestimonials} fields={["name", "location", "text", "rating"]} />}
        {active === "gallery" && <SimpleList title="Gallery images and videos" items={gallery} setItems={setGallery} fields={["type", "url", "title"]} />}
      </div>
    </section>
  );
}

function Dashboard({ trips, bookings }) {
  const pending = bookings.filter((booking) => booking.status === "pending").length;
  const stats = [["Total trips", trips.length, Mountain], ["Total bookings", bookings.length, Users], ["Pending bookings", pending, Clock3]];
  return (
    <div className="grid gap-4 md:grid-cols-3">
      {stats.map(([label, value, Icon]) => (
        <div key={label} className="rounded-lg border border-white/10 bg-white/[0.045] p-6">
          <Icon className="h-7 w-7 text-sun" />
          <p className="mt-5 text-4xl font-black">{value}</p>
          <p className="text-white/58">{label}</p>
        </div>
      ))}
    </div>
  );
}

function TripManager({ trips, tripDraft, setTripDraft, saveTrip, deleteTrip, focusTerms }) {
  const set = (key, value) => setTripDraft({ ...tripDraft, [key]: value });
  const setCsv = (key, value) => set(key, value.split("\n").filter(Boolean));
  const setTerms = (key, value) => setTripDraft({ ...tripDraft, terms: { ...(tripDraft.terms || {}), [key]: value } });
  return (
    <div className="grid gap-6 lg:grid-cols-[.9fr_1.1fr]">
      <div className="rounded-lg border border-white/10 bg-white/[0.045] p-5">
        <h2 className="mb-4 text-2xl font-black">{focusTerms ? "Edit trip Terms & Conditions" : "Add / Edit trip"}</h2>
        <div className="grid gap-4">
          {!focusTerms && (
            <>
              <Input label="Destination" value={tripDraft.destination} onChange={(value) => set("destination", value)} />
              <Input label="Location" value={tripDraft.location} onChange={(value) => set("location", value)} />
              <Input label="Per head cost" type="number" value={tripDraft.price} onChange={(value) => set("price", value)} />
              <Input label="Couple charges" type="number" value={tripDraft.coupleCharges} onChange={(value) => set("coupleCharges", value)} />
              <Input label="Date" type="date" value={tripDraft.date} onChange={(value) => set("date", value)} />
              <Input label="Duration days" type="number" value={tripDraft.duration} onChange={(value) => set("duration", value)} />
              <Input label="Seats" type="number" value={tripDraft.seats} onChange={(value) => set("seats", value)} />
              <Textarea label="Image URLs, one per line" value={(tripDraft.images || []).join("\n")} onChange={(value) => setCsv("images", value)} />
              <Textarea label="Video URLs, one per line" value={(tripDraft.videos || []).join("\n")} onChange={(value) => setCsv("videos", value)} />
              <Textarea label="Included services, one per line" value={(tripDraft.included || []).join("\n")} onChange={(value) => setCsv("included", value)} />
              <Textarea label="Not included services, one per line" value={(tripDraft.notIncluded || []).join("\n")} onChange={(value) => setCsv("notIncluded", value)} />
              <Textarea label="Hotel/camp details" value={tripDraft.stay || ""} onChange={(value) => set("stay", value)} />
            </>
          )}
          {["bookingPolicy", "paymentPolicy", "cancellationPolicy", "travelRules", "safetyGuidelines", "bring"].map((key) => (
            <Textarea key={key} label={key.replace(/([A-Z])/g, " $1")} value={tripDraft.terms?.[key] || ""} onChange={(value) => setTerms(key, value)} />
          ))}
          <Button onClick={saveTrip} icon={Plus}>Save trip</Button>
          <p className="text-sm text-white/50"><ImagePlus className="mr-2 inline h-4 w-4 text-sun" />Cloudinary/local upload endpoints are included in the backend; paste URLs here in demo mode.</p>
        </div>
      </div>
      <div className="space-y-3">
        {trips.map((trip) => {
          const id = trip.id || trip._id;
          return (
            <div key={id} className="flex items-center justify-between gap-4 rounded-lg border border-white/10 bg-white/[0.04] p-4">
              <button type="button" onClick={() => setTripDraft(trip)} className="flex items-center gap-4 text-left">
                <img src={trip.cover || trip.images?.[0]} alt="" className="h-16 w-20 rounded-md object-cover" />
                <span><span className="block font-black">{trip.destination}</span><span className="text-sm text-white/50">{dateLabel(trip.date)} | {money(trip.price)}</span></span>
              </button>
              <div className="flex gap-2">
                <button type="button" onClick={() => setTripDraft(trip)} className="grid h-10 w-10 place-items-center rounded-md bg-white/10 text-sun"><Edit3 className="h-4 w-4" /></button>
                <button type="button" onClick={() => deleteTrip(id)} className="grid h-10 w-10 place-items-center rounded-md bg-red-500/15 text-red-200"><Trash2 className="h-4 w-4" /></button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function Textarea({ label, value, onChange }) {
  return (
    <label className="grid gap-2 text-sm font-bold capitalize text-white/72">
      {label}
      <textarea className="min-h-24 rounded-md border border-white/10 bg-black/35 px-3 py-3 text-white outline-none focus:border-sun" value={value} onChange={(event) => onChange(event.target.value)} />
    </label>
  );
}

function BookingsTable({ bookings, updateBookingStatus }) {
  return (
    <div className="overflow-x-auto rounded-lg border border-white/10">
      <table className="w-full min-w-[760px] border-collapse bg-white/[0.04] text-sm">
        <thead className="bg-black/45 text-left text-sun">
          <tr>{["Name", "Phone", "Trip", "Seats", "Pickup", "Status"].map((head) => <th key={head} className="p-4">{head}</th>)}</tr>
        </thead>
        <tbody>
          {bookings.map((booking, index) => (
            <tr key={`${booking.phone}-${index}`} className="border-t border-white/10">
              <td className="p-4">{booking.name}</td>
              <td className="p-4">{booking.phone}</td>
              <td className="p-4">{booking.tripSelected}</td>
              <td className="p-4">{booking.seats}</td>
              <td className="p-4">{booking.pickupCity}</td>
              <td className="p-4">
                <select value={booking.status || "pending"} onChange={(event) => updateBookingStatus(index, event.target.value)} className="rounded-md border border-white/10 bg-black px-3 py-2 text-white">
                  {["pending", "confirmed", "cancelled"].map((status) => <option key={status}>{status}</option>)}
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {!bookings.length && <p className="p-5 text-white/58">No bookings yet.</p>}
    </div>
  );
}

function SimpleList({ title, items, setItems, fields }) {
  const empty = Object.fromEntries(fields.map((field) => [field, field === "rating" ? 5 : ""]));
  const [draft, setDraft] = useState(empty);
  const add = () => {
    setItems([{ ...draft, id: crypto.randomUUID?.() || Date.now().toString() }, ...items]);
    setDraft(empty);
  };
  return (
    <div className="grid gap-6 lg:grid-cols-[.75fr_1.25fr]">
      <div className="rounded-lg border border-white/10 bg-white/[0.045] p-5">
        <h2 className="mb-4 text-2xl font-black">{title}</h2>
        <div className="grid gap-4">
          {fields.map((field) => <Input key={field} label={field} value={draft[field]} onChange={(value) => setDraft({ ...draft, [field]: value })} />)}
          <Button onClick={add} icon={Plus}>Add</Button>
        </div>
      </div>
      <div className="grid gap-3">
        {items.map((item) => (
          <div key={item.id || item.url || item.name} className="flex items-center justify-between gap-4 rounded-lg border border-white/10 bg-white/[0.04] p-4">
            <div>
              <p className="font-black">{item.title || item.name || item.url}</p>
              <p className="line-clamp-2 text-sm text-white/56">{item.text || item.url || item.location}</p>
            </div>
            <button type="button" onClick={() => setItems(items.filter((candidate) => candidate !== item))} className="grid h-10 w-10 place-items-center rounded-md bg-red-500/15 text-red-200"><Trash2 className="h-4 w-4" /></button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
