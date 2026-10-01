export async function getGoogleReviews() {
  const apiKey = process.env.GOOGLE_PLACES_API_KEY;
  const placeId = process.env.GOOGLE_PLACE_ID;

  const mockData = {
    rating: 5.0,
    user_ratings_total: 1,
    reviews: [
      { author_name: "Jesper Hansen", rating: 5, text: "Väldigt trevlig kille som kom förbi på mindre än en timme en lördag. Toastoppet var borta på två minuter. Rekommenderar verkligen!", time: Math.floor(Date.now() / 1000) - 86400 * 3 }
    ]
  };

  if (!apiKey || !placeId) {
    return mockData;
  }

  try {
    const res = await fetch(`https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=name,rating,user_ratings_total,reviews&reviews_sort=newest&language=sv&key=${apiKey}`, { next: { revalidate: 3600 } });
    if (!res.ok) throw new Error("Failed to fetch google reviews");
    const data = await res.json();
    
    if (data.status !== 'OK') {
      console.error("Google Places API Error:", data.status, data.error_message);
      return mockData;
    }

    // Google API returns undefined for rating/reviews on very new profiles.
    if (data.result.user_ratings_total === undefined || data.result.user_ratings_total === 0) {
      return mockData;
    }

    return {
      rating: data.result.rating || 5.0,
      user_ratings_total: data.result.user_ratings_total || 1,
      reviews: (data.result.reviews || []).filter((r: any) => r.rating >= 4)
    };
  } catch (error) {
    console.error("Error fetching google reviews:", error);
    return mockData;
  }
}