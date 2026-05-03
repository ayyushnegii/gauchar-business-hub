const GOOGLE_PLACES_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '';
const PLACES_API_BASE = 'https://maps.googleapis.com/maps/api/place';

export type GooglePlace = {
  place_id: string;
  name: string;
  formatted_address: string;
  geometry: {
    location: {
      lat: number;
      lng: number;
    };
  };
  rating?: number;
  user_ratings_total?: number;
  photos?: Array<{
    photo_reference: string;
    height: number;
    width: number;
  }>;
  types?: string[];
  formatted_phone_number?: string;
  opening_hours?: {
    open_now: boolean;
  };
};

export async function searchBusinessesInGauchar(
  category?: string,
  query?: string
): Promise<GooglePlace[]> {
  // Use mock data if no API key is configured
  if (!GOOGLE_PLACES_API_KEY || GOOGLE_PLACES_API_KEY === 'your_google_maps_api_key_here') {
    console.log('No Google API key found, using mock data');
    const { searchMockBusinesses } = await import('./mockGooglePlaces');
    return searchMockBusinesses(category, query) as GooglePlace[];
  }

  const searchQuery = query 
    ? `${query} in Gauchar, Uttarakhand` 
    : `business in Gauchar, Uttarakhand`;
  
  const params = new URLSearchParams({
    query: searchQuery,
    key: GOOGLE_PLACES_API_KEY,
    location: '30.4347,79.3321', // Gauchar coordinates
    radius: '5000', // 5km radius
  });

  if (category) {
    params.append('type', category.toLowerCase());
  }

  try {
    const response = await fetch(
      `${PLACES_API_BASE}/textsearch/json?${params.toString()}`
    );
    const data = await response.json();
    
    if (data.status === 'OK') {
      return data.results as GooglePlace[];
    }
    
    console.error('Places API error:', data.status, data.error_message);
    // Fallback to mock data on API error
    const { searchMockBusinesses } = await import('./mockGooglePlaces');
    return searchMockBusinesses(category, query) as GooglePlace[];
  } catch (error) {
    console.error('Failed to fetch places:', error);
    // Fallback to mock data on network error
    const { searchMockBusinesses } = await import('./mockGooglePlaces');
    return searchMockBusinesses(category, query) as GooglePlace[];
  }
}

export function getPhotoUrl(photoReference: string, maxWidth = 400): string {
  if (!GOOGLE_PLACES_API_KEY || GOOGLE_PLACES_API_KEY === 'your_google_maps_api_key_here') {
    // Use mock photo URLs
    const { getMockPhotoUrl } = require('./mockGooglePlaces');
    return getMockPhotoUrl(photoReference);
  }
  return `${PLACES_API_BASE}/photo?maxwidth=${maxWidth}&photo_reference=${photoReference}&key=${GOOGLE_PLACES_API_KEY}`;
}
