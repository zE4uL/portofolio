import type { MetadataRoute } from "next";

const SITE_URL = "https://ziaulislam.me";

const routes = [
  "",
  "/about",
  "/resume",
  "/6labs-ai",
  "/ai-native-workflow",
  "/bluestacks",
  "/float",
  "/gamification",
  "/nowstudio",
  "/amway-india",
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return routes.map((path) => ({
    url: `${SITE_URL}${path}`,
    lastModified,
    changeFrequency: path === "" ? "weekly" : "monthly",
    priority: path === "" ? 1 : path === "/about" || path === "/resume" ? 0.8 : 0.7,
  }));
}
