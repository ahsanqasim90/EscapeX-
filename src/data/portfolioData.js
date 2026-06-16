import {
  BadgeCheck,
  Bot,
  Braces,
  Camera,
  Captions,
  Car,
  CirclePlay,
  Clapperboard,
  Clock,
  Construction,
  Film,
  Flame,
  Gamepad2,
  Headphones,
  ImagePlus,
  Megaphone,
  Mic2,
  Music2,
  Pizza,
  RefreshCw,
  ScanFace,
  Scissors,
  Sparkles,
  Stars,
  Wand2,
  Zap,
} from "lucide-react";
import siteContent from "./siteContent.json";

export const serviceCategories = [
  { title: "AI Product Ads", icon: Bot, sample: "Skincare launch concept", description: "AI-assisted product spots with premium pacing, reveals, and conversion-focused scenes." },
  { title: "AI UGC Ads", icon: ScanFace, sample: "Founder-style testimonial", description: "Natural UGC-style ad edits shaped for hooks, social proof, and fast scroll appeal." },
  { title: "AI Video Generation", icon: Sparkles, sample: "Lifestyle product world", description: "Generated visuals, motion concepts, and scene builds for modern ad campaigns." },
  { title: "AI Ad Campaigns", icon: Megaphone, sample: "3-variant Meta ad pack", description: "Creative batches with alternate hooks, captions, lengths, and platform-ready structure." },
  { title: "Product Video Editing", icon: Camera, sample: "Amazon product demo", description: "Clean product edits with zooms, callouts, benefits, and polished branded delivery." },
  { title: "Fast-Paced Video Editing", icon: Zap, sample: "15-sec promo reel", description: "High-retention cuts with punchy rhythm, SFX, kinetic text, and beat-matched movement." },
  { title: "Slow-Paced Cinematic Editing", icon: Film, sample: "Luxury service teaser", description: "Elegant cinematic edits with controlled pacing, mood, transitions, and color direction." },
  { title: "UGC & Product Videos", icon: CirclePlay, sample: "TikTok ad creative", description: "Creator-led product edits that combine authenticity with a strong performance structure." },
  { title: "Podcast Trimming", icon: Mic2, sample: "Founder podcast clip", description: "Tight trims that remove dead space and shape long conversations into crisp moments." },
  { title: "Timestamp-Based Podcast Editing", icon: Clock, sample: "Interview highlight batch", description: "Precise edits from timestamps with strong intros, clean cuts, and export-ready clips." },
  { title: "Transcript-Based Captions", icon: Braces, sample: "Educational reels", description: "Captioned edits from transcript references with readable timing and emphasis." },
  { title: "Video Reframing", icon: RefreshCw, sample: "YouTube to Reels", description: "Vertical, square, and platform-specific reframes that keep subjects and products centered." },
  { title: "Stylish Caption Generation", icon: Captions, sample: "Bold caption package", description: "Readable, modern captions with highlights, motion, hierarchy, and brand-aware styling." },
  { title: "Auto Detailing Videos", icon: Car, sample: "Ceramic coating reel", description: "Satisfying automotive edits with before-after pacing, gloss details, and premium reveal shots." },
  { title: "Music DJ Edits", icon: Music2, sample: "Club night recap", description: "Beat-driven edits with energetic transitions, atmosphere, crowd moments, and sound sync." },
  { title: "Restaurant & Food Edits", icon: Pizza, sample: "Menu launch reel", description: "Appetizing food content with close-ups, motion, pacing, and offer-focused storytelling." },
  { title: "Talking Head Video Editing", icon: Headphones, sample: "Coach reel series", description: "Clean talking head edits with jump cuts, captions, b-roll, sound polish, and hooks." },
  { title: "Construction Edits Using Images", icon: Construction, sample: "Project progress story", description: "Static assets turned into moving construction stories with captions, motion, and reveals." },
  { title: "Raw Blocks Videos", icon: Clapperboard, sample: "Raw footage assembly", description: "Unstructured clips transformed into organized, client-ready short-form video assets." },
  { title: "Gaming Videos", icon: Gamepad2, sample: "Gameplay highlight", description: "Engaging gaming shorts with pacing, reactions, captions, SFX, and highlight structure." },
  { title: "Automobile Ads Videos", icon: Flame, sample: "Dealership promo", description: "Vehicle ads with cinematic detail shots, feature callouts, and persuasive offer framing." },
  { title: "Long-Form to Short-Form Videos", icon: Scissors, sample: "Webinar clip pack", description: "Long videos distilled into short clips with strong hooks, captions, and platform exports." },
  { title: "Image to Avatar Videos", icon: ImagePlus, sample: "AI spokesperson sample", description: "Avatar-led videos using image references, voiceover direction, captions, and branded edits." },
];

export const filters = ["All", "AI Ads", "UGC", "Product Ads", "Podcasts", "Auto Detailing", "Food", "Talking Head", "Gaming", "Music", "Construction", "Automobile", "Long to Short"];

export const portfolioItems = siteContent.portfolioItems;
export const testimonials = siteContent.testimonials;
export const tools = siteContent.tools;
export const profile = siteContent.profile;
export const processSteps = siteContent.processSteps;
export const sellingPoints = siteContent.sellingPoints;
export const stats = siteContent.stats;
export const skills = siteContent.skills;
export const certifications = siteContent.certifications;

export const badgeIcon = BadgeCheck;
