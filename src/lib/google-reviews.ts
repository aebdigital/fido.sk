import "server-only";

import { unstable_cache } from "next/cache";

export type GoogleReview = {
  authorName: string;
  authorUrl?: string;
  profilePhotoUrl?: string;
  rating: number;
  relativeTimeDescription: string;
  text: string;
  time?: number;
};

export type GoogleReviewsData = {
  name: string;
  rating: number | null;
  reviews: GoogleReview[];
  url: string;
  userRatingsTotal: number | null;
};

type PlacesReview = {
  author_name?: string;
  author_url?: string;
  profile_photo_url?: string;
  rating?: number;
  relative_time_description?: string;
  text?: string;
  time?: number;
};

type PlacesResponse = {
  status: string;
  error_message?: string;
  result?: {
    name?: string;
    rating?: number;
    reviews?: PlacesReview[];
    url?: string;
    user_ratings_total?: number;
  };
};

const placeId = process.env.GOOGLE_PLACE_ID || "ChIJR_1vn2rtPkcRtjEK8N4ChU8";
const googleProfileUrl = `https://search.google.com/local/reviews?placeid=${placeId}`;

async function fetchGoogleReviews(): Promise<GoogleReviewsData | null> {
  const apiKey = process.env.GOOGLE_PLACES_API_KEY;
  if (!apiKey) return null;

  const url = new URL("https://maps.googleapis.com/maps/api/place/details/json");
  url.searchParams.set("place_id", placeId);
  url.searchParams.set("fields", "name,rating,user_ratings_total,reviews,url");
  url.searchParams.set("reviews_sort", "newest");
  url.searchParams.set("reviews_no_translations", "true");
  url.searchParams.set("language", "sk");
  url.searchParams.set("key", apiKey);

  try {
    const response = await fetch(url, { next: { revalidate: 60 * 60 } });
    if (!response.ok) return null;

    const data = (await response.json()) as PlacesResponse;
    if (data.status !== "OK" || !data.result) {
      console.error(`Google Places reviews returned ${data.status}: ${data.error_message ?? "No details"}`);
      return null;
    }

    const reviews = (data.result.reviews ?? [])
      .filter((review) => review.author_name && typeof review.rating === "number")
      .map((review) => ({
        authorName: review.author_name ?? "Google používateľ",
        authorUrl: review.author_url,
        profilePhotoUrl: review.profile_photo_url,
        rating: review.rating ?? 0,
        relativeTimeDescription: review.relative_time_description ?? "",
        text: review.text ?? "",
        time: review.time,
      }))
      .sort((a, b) => (b.time ?? 0) - (a.time ?? 0));

    if (!reviews.length) return null;

    return {
      name: data.result.name ?? "Fido s.r.o.",
      rating: data.result.rating ?? null,
      userRatingsTotal: data.result.user_ratings_total ?? null,
      url: data.result.url ?? googleProfileUrl,
      reviews,
    };
  } catch (error) {
    console.error("Unable to load Google reviews", error);
    return null;
  }
}

export const getGoogleReviews = unstable_cache(
  fetchGoogleReviews,
  ["fido-google-reviews", placeId],
  { revalidate: 60 * 60 },
);

