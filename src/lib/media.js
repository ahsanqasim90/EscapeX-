export function getGoogleDriveFileId(url) {
  if (!url) return "";

  const trimmedUrl = url.trim();
  const filePathMatch = trimmedUrl.match(/drive\.google\.com\/file\/d\/([^/]+)/i);
  if (filePathMatch?.[1]) return filePathMatch[1];

  try {
    const parsedUrl = new URL(trimmedUrl);
    return parsedUrl.searchParams.get("id") || "";
  } catch {
    return "";
  }
}

export function getVideoEmbed(url) {
  if (!url || url === "#") return null;

  const cleanUrl = url.trim();
  const driveFileId = getGoogleDriveFileId(cleanUrl);
  if (driveFileId) {
    return {
      type: "iframe",
      src: `https://drive.google.com/file/d/${driveFileId}/preview`,
    };
  }

  if (/\.(mp4|webm|ogg)(\?.*)?$/i.test(cleanUrl)) {
    return {
      type: "video",
      src: cleanUrl,
    };
  }

  return {
    type: "link",
    src: cleanUrl,
  };
}
