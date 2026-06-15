import React, { useEffect, useState } from "react";
import { LogOut, Plus, Save, Trash2, Upload } from "lucide-react";
import fallbackContent from "../data/siteContent.json";
import { hasSupabaseConfig, supabase } from "../lib/supabase";
import { getVideoEmbed } from "../lib/media";

function makeProject() {
  return {
    id: typeof crypto !== "undefined" && crypto.randomUUID ? crypto.randomUUID() : `${Date.now()}-${Math.random()}`,
    title: "",
    category: "AI Ads",
    niche: "",
    description: "",
    tools: ["CapCut"],
    result: "",
    thumbnailUrl: "",
    videoUrl: "",
  };
}

function withProjectIds(content) {
  return {
    ...content,
    portfolioItems: (content.portfolioItems || []).map((item, index) => ({
      ...item,
      id: item.id || `project-${index}-${item.title || "untitled"}`,
    })),
  };
}

const categories = ["AI Ads", "UGC", "Product Ads", "Podcasts", "Auto Detailing", "Food", "Talking Head", "Gaming", "Music", "Construction", "Automobile", "Long to Short"];

function Field({ label, value, onChange, textarea = false }) {
  const Input = textarea ? "textarea" : "input";
  return (
    <label className="grid gap-2 text-sm font-semibold text-white/70">
      {label}
      <Input
        value={value || ""}
        onChange={(event) => onChange(event.target.value)}
        className="rounded-md border border-white/10 bg-black/30 px-4 py-3 text-white outline-none transition focus:border-cyan"
      />
    </label>
  );
}

export function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  async function login(event) {
    event.preventDefault();
    if (!hasSupabaseConfig) {
      setMessage("Supabase env keys missing. Add them in Netlify first.");
      return;
    }

    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      setMessage(error.message);
      return;
    }

    window.location.href = "/admin-dashboard";
  }

  return (
    <main className="grid min-h-screen place-items-center bg-ink px-5 text-white">
      <form onSubmit={login} className="w-full max-w-md rounded-lg border border-white/10 bg-white/[0.055] p-7 shadow-premium">
        <p className="text-sm font-bold uppercase tracking-[0.24em] text-cyan">Portfolio Admin</p>
        <h1 className="mt-3 text-3xl font-semibold">Login</h1>
        <div className="mt-7 grid gap-4">
          <Field label="Email" value={email} onChange={setEmail} />
          <label className="grid gap-2 text-sm font-semibold text-white/70">
            Password
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="rounded-md border border-white/10 bg-black/30 px-4 py-3 text-white outline-none transition focus:border-cyan"
            />
          </label>
        </div>
        {message ? <p className="mt-4 rounded-md border border-coral/30 bg-coral/10 p-3 text-sm text-coral">{message}</p> : null}
        <button className="mt-6 min-h-12 w-full rounded-full bg-cyan px-5 text-sm font-bold text-ink transition hover:bg-white">
          Login
        </button>
      </form>
    </main>
  );
}

export function AdminDashboard() {
  const [sessionReady, setSessionReady] = useState(false);
  const [content, setContent] = useState(() => withProjectIds(fallbackContent));
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    async function boot() {
      if (!hasSupabaseConfig) {
        setMessage("Supabase env keys missing. Add them in Netlify first.");
        setSessionReady(true);
        return;
      }

      const { data: sessionData } = await supabase.auth.getSession();
      if (!sessionData.session) {
        window.location.href = "/admin-login";
        return;
      }

      const { data } = await supabase.from("site_content").select("content").eq("id", "main").single();
      if (data?.content?.portfolioItems?.length) setContent(withProjectIds(data.content));
      setSessionReady(true);
    }

    boot();
  }, []);

  function updateProfile(key, value) {
    setContent((current) => ({ ...current, profile: { ...current.profile, [key]: value } }));
  }

  function updateProject(index, key, value) {
    setContent((current) => ({
      ...current,
      portfolioItems: current.portfolioItems.map((item, itemIndex) => (itemIndex === index ? { ...item, [key]: value } : item)),
    }));
  }

  async function uploadThumbnail(index, file) {
    if (!file || !hasSupabaseConfig) return;
    const cleanName = file.name.replace(/[^a-z0-9.\-_]/gi, "-").toLowerCase();
    const path = `${Date.now()}-${cleanName}`;
    const { error } = await supabase.storage.from("portfolio-media").upload(path, file, { upsert: true });
    if (error) {
      setMessage(error.message);
      return;
    }
    const { data } = supabase.storage.from("portfolio-media").getPublicUrl(path);
    updateProject(index, "thumbnailUrl", data.publicUrl);
  }

  async function save() {
    setSaving(true);
    setMessage("");
    const { error } = await supabase.from("site_content").upsert({ id: "main", content, updated_at: new Date().toISOString() });
    setSaving(false);
    setMessage(error ? error.message : "Saved. Website content updated.");
  }

  async function logout() {
    await supabase.auth.signOut();
    window.location.href = "/admin-login";
  }

  if (!sessionReady) {
    return <main className="grid min-h-screen place-items-center bg-ink text-white">Loading admin...</main>;
  }

  return (
    <main className="min-h-screen bg-ink px-5 py-8 text-white">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-6">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.24em] text-cyan">Custom Admin</p>
            <h1 className="mt-2 text-3xl font-semibold">Portfolio Dashboard</h1>
          </div>
          <div className="flex gap-3">
            <button onClick={save} disabled={saving} className="inline-flex min-h-11 items-center gap-2 rounded-full bg-cyan px-5 text-sm font-bold text-ink transition hover:bg-white">
              <Save className="h-4 w-4" />
              {saving ? "Saving..." : "Save"}
            </button>
            <button onClick={logout} className="inline-flex min-h-11 items-center gap-2 rounded-full border border-white/10 px-5 text-sm font-bold text-white/70 transition hover:border-cyan hover:text-white">
              <LogOut className="h-4 w-4" />
              Logout
            </button>
          </div>
        </div>

        {message ? <p className="mt-5 rounded-md border border-cyan/20 bg-cyan/10 p-4 text-sm text-cyan">{message}</p> : null}

        <section className="mt-8 rounded-lg border border-white/10 bg-white/[0.04] p-5">
          <h2 className="text-xl font-semibold">Profile</h2>
          <div className="mt-5 grid gap-4 md:grid-cols-2">
            {["name", "title", "email", "phone", "upworkUrl", "rate", "success", "jobs", "hours"].map((key) => (
              <Field key={key} label={key} value={content.profile?.[key]} onChange={(value) => updateProfile(key, value)} />
            ))}
            <div className="md:col-span-2">
              <Field label="overview" value={content.profile?.overview} onChange={(value) => updateProfile("overview", value)} textarea />
            </div>
          </div>
        </section>

        <section className="mt-8 rounded-lg border border-white/10 bg-white/[0.04] p-5">
          <div className="flex items-center justify-between gap-4">
            <h2 className="text-xl font-semibold">Portfolio Items</h2>
            <button
              onClick={() => setContent((current) => ({ ...current, portfolioItems: [makeProject(), ...current.portfolioItems] }))}
              className="inline-flex min-h-10 items-center gap-2 rounded-full bg-white px-4 text-sm font-bold text-ink transition hover:bg-cyan"
            >
              <Plus className="h-4 w-4" />
              Add Project
            </button>
          </div>
          <div className="mt-5 grid gap-5">
            {content.portfolioItems.map((item, index) => {
              const videoEmbed = getVideoEmbed(item.videoUrl);

              return (
              <article key={item.id || index} className="rounded-lg border border-white/10 bg-black/20 p-5">
                <div className="grid gap-4 md:grid-cols-2">
                  <Field label="Title" value={item.title} onChange={(value) => updateProject(index, "title", value)} />
                  <label className="grid gap-2 text-sm font-semibold text-white/70">
                    Category
                    <select value={item.category} onChange={(event) => updateProject(index, "category", event.target.value)} className="rounded-md border border-white/10 bg-black/30 px-4 py-3 text-white outline-none transition focus:border-cyan">
                      {categories.map((category) => (
                        <option key={category}>{category}</option>
                      ))}
                    </select>
                  </label>
                  <Field label="Niche" value={item.niche} onChange={(value) => updateProject(index, "niche", value)} />
                  <Field label="Video URL" value={item.videoUrl} onChange={(value) => updateProject(index, "videoUrl", value)} />
                  <Field label="Tools comma separated" value={(item.tools || []).join(", ")} onChange={(value) => updateProject(index, "tools", value.split(",").map((tool) => tool.trim()).filter(Boolean))} />
                  <label className="grid gap-2 text-sm font-semibold text-white/70">
                    Upload Thumbnail
                    <span className="inline-flex min-h-12 cursor-pointer items-center justify-center gap-2 rounded-md border border-white/10 bg-black/30 px-4 text-white/70 transition hover:border-cyan hover:text-white">
                      <Upload className="h-4 w-4" />
                      Choose file
                      <input type="file" accept="image/*" onChange={(event) => uploadThumbnail(index, event.target.files?.[0])} className="hidden" />
                    </span>
                  </label>
                  <div className="md:col-span-2">
                    <Field label="Description" value={item.description} onChange={(value) => updateProject(index, "description", value)} textarea />
                  </div>
                  <div className="md:col-span-2">
                    <Field label="Result" value={item.result} onChange={(value) => updateProject(index, "result", value)} textarea />
                  </div>
                </div>
                {videoEmbed?.type === "iframe" ? (
                  <iframe
                    src={videoEmbed.src}
                    title={`${item.title || "Portfolio video"} preview`}
                    allow="autoplay; fullscreen"
                    allowFullScreen
                    className="mt-4 aspect-video w-full rounded-md border border-white/10 bg-black"
                  />
                ) : null}
                {videoEmbed?.type === "video" ? (
                  <video src={videoEmbed.src} controls className="mt-4 aspect-video w-full rounded-md border border-white/10 bg-black object-contain" />
                ) : null}
                {item.thumbnailUrl ? <img src={item.thumbnailUrl} alt="" className="mt-4 h-32 rounded-md object-cover" /> : null}
                <button
                  onClick={() => setContent((current) => ({ ...current, portfolioItems: current.portfolioItems.filter((_, itemIndex) => itemIndex !== index) }))}
                  className="mt-4 inline-flex min-h-10 items-center gap-2 rounded-full border border-coral/30 px-4 text-sm font-bold text-coral transition hover:bg-coral hover:text-white"
                >
                  <Trash2 className="h-4 w-4" />
                  Delete
                </button>
              </article>
              );
            })}
          </div>
        </section>
      </div>
    </main>
  );
}
