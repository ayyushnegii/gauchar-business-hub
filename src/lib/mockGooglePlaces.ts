// Mock Google Places API service for Gauchar businesses
// This allows the app to work without a real API key

export type MockBusiness = {
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

// Realistic mock data for Gauchar businesses
const MOCK_GAUCHAR_BUSINESSES: MockBusiness[] = [
  {
    place_id: 'mock_1',
    name: 'Hotel Snow View',
    formatted_address: 'Main Market, Gauchar, Uttarakhand 246429',
    geometry: { location: { lat: 30.4370, lng: 79.3340 } },
    rating: 4.5,
    user_ratings_total: 127,
    types: ['lodging', 'hotel'],
    formatted_phone_number: '+91 12345 67890',
    opening_hours: { open_now: true },
  },
  {
    place_id: 'mock_2',
    name: 'Sharma Dhaba',
    formatted_address: 'Badrinath Road, Gauchar, Uttarakhand 246429',
    geometry: { location: { lat: 30.4350, lng: 79.3325 } },
    rating: 4.2,
    user_ratings_total: 89,
    types: ['restaurant', 'food'],
    formatted_phone_number: '+91 98765 43210',
    opening_hours: { open_now: true },
  },
  {
    place_id: 'mock_3',
    name: 'Gupta Phone Repair',
    formatted_address: 'Near Bus Stand, Gauchar, Uttarakhand 246429',
    geometry: { location: { lat: 30.4340, lng: 79.3310 } },
    rating: 3.8,
    user_ratings_total: 45,
    types: ['electronics_repair', 'store'],
    formatted_phone_number: '+91 87654 32109',
    opening_hours: { open_now: false },
  },
  {
    place_id: 'mock_4',
    name: 'Gauchar Medical Store',
    formatted_address: 'Hospital Road, Gauchar, Uttarakhand 246429',
    geometry: { location: { lat: 30.4360, lng: 79.3335 } },
    rating: 4.0,
    user_ratings_total: 63,
    types: ['pharmacy', 'health'],
    formatted_phone_number: '+91 76543 21098',
    opening_hours: { open_now: true },
  },
  {
    place_id: 'mock_5',
    name: 'Kumar Grocery',
    formatted_address: 'Main Bazaar, Gauchar, Uttarakhand 246429',
    geometry: { location: { lat: 30.4355, lng: 79.3320 } },
    rating: 4.3,
    user_ratings_total: 98,
    types: ['grocery_store', 'store'],
    formatted_phone_number: '+91 65432 10987',
    opening_hours: { open_now: true },
  },
  {
    place_id: 'mock_6',
    name: 'Sagar Transport',
    formatted_address: 'Bus Stand, Gauchar, Uttarakhand 246429',
    geometry: { location: { lat: 30.4345, lng: 79.3315 } },
    rating: 3.5,
    user_ratings_total: 34,
    types: ['travel_agency', 'transit_station'],
    formatted_phone_number: '+91 54321 09876',
    opening_hours: { open_now: true },
  },
  {
    place_id: 'mock_7',
    name: 'Himalayan Cafe',
    formatted_address: 'Badrinath Road, Gauchar, Uttarakhand 246429',
    geometry: { location: { lat: 30.4365, lng: 79.3345 } },
    rating: 4.7,
    user_ratings_total: 156,
    types: ['cafe', 'restaurant', 'food'],
    formatted_phone_number: '+91 43210 98765',
    opening_hours: { open_now: true },
  },
  {
    place_id: 'mock_8',
    name: 'Dr. Sharma Clinic',
    formatted_address: 'Hospital Road, Gauchar, Uttarakhand 246429',
    geometry: { location: { lat: 30.4358, lng: 79.3330 } },
    rating: 4.6,
    user_ratings_total: 112,
    types: ['doctor', 'health'],
    formatted_phone_number: '+91 32109 87654',
    opening_hours: { open_now: false },
  },
];

export function searchMockBusinesses(
  category?: string,
  query?: string
): MockBusiness[] {
  let results = [...MOCK_GAUCHAR_BUSINESSES];

  // Filter by category
  if (category) {
    const categoryMap: Record<string, string[]> = {
      'hotels': ['lodging', 'hotel'],
      'restaurants': ['restaurant', 'cafe', 'food'],
      'repair': ['electronics_repair'],
      'medical': ['pharmacy', 'health', 'doctor'],
      'grocery': ['grocery_store', 'store'],
      'transport': ['travel_agency', 'transit_station'],
    };

    const types = categoryMap[category] || [];
    if (types.length > 0) {
      results = results.filter(b => 
        b.types?.some(t => types.includes(t))
      );
    }
  }

  // Filter by search query
  if (query) {
    const lowerQuery = query.toLowerCase();
    results = results.filter(b => 
      b.name.toLowerCase().includes(lowerQuery) ||
      b.formatted_address.toLowerCase().includes(lowerQuery)
    );
  }

  return results;
}

export function getMockPhotoUrl(photoReference: string): string {
  // Return placeholder image URLs
  const placeholders = [
    'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400',
    'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400',
    'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=400',
    'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=400',
  ];
  const index = parseInt(photoReference.slice(-1)) || 0;
  return placeholders[index % placeholders.length];
}
