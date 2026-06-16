import { useEffect, useState } from "react";
import fallbackContent from "../data/siteContent.json";
import { hasSupabaseConfig, supabase } from "../lib/supabase";

export function useSiteContent() {
  const [content, setContent] = useState(fallbackContent);
  const [loading, setLoading] = useState(hasSupabaseConfig);

  useEffect(() => {
    let isMounted = true;

    async function loadContent() {
      if (!hasSupabaseConfig) return;

      const { data, error } = await supabase.from("site_content").select("content").eq("id", "main").single();

      if (isMounted) {
        if (!error && data?.content?.portfolioItems?.length) setContent(data.content);
        setLoading(false);
      }
    }

    loadContent();

    return () => {
      isMounted = false;
    };
  }, []);

  return { content, loading };
}
