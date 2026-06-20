import type { MetadataRoute } from "next";
import { allNativePaths } from "@/lib/native-page";

export const revalidate = 3600; // Cache sitemap for 1 hour

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://fido.sk";
  const paths = allNativePaths();

  return paths.map((path) => {
    // Determine priority
    let priority = 0.8;
    if (path === "/") {
      priority = 1.0;
    } else if (path === "/kontakt/" || path === "/sluzby/" || path === "/realizacie/") {
      priority = 0.9;
    }

    return {
      url: `${baseUrl}${path}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority,
    };
  });
}
