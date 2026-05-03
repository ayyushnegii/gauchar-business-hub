'use client';

type Business = {
  id: string;
  name: string;
  lat: number;
  lng: number;
  category: string;
};

type GoogleMapComponentProps = {
  businesses: Business[];
  center?: { lat: number; lng: number };
  zoom?: number;
};

export default function GoogleMapComponent({ businesses }: GoogleMapComponentProps) {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

  if (!apiKey || apiKey === 'your_google_maps_api_key_here') {
    return (
      <div className="w-full h-64 rounded-2xl overflow-hidden shadow-lg bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col items-center justify-center gap-3 border border-blue-200">
        <span className="text-5xl">🗺️</span>
        <div className="text-center px-4">
          <p className="font-semibold text-gray-700">Map Preview</p>
          <p className="text-sm text-gray-500">Gauchar, Uttarakhand · {businesses.length} location{businesses.length !== 1 ? 's' : ''}</p>
          <a
            href={`https://www.google.com/maps/search/businesses+in+Gauchar+Uttarakhand`}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 inline-block text-xs text-blue-600 hover:underline"
          >
            View on Google Maps →
          </a>
        </div>
      </div>
    );
  }

  // Lazy-load the real map only when API key is present
  const { APIProvider, Map, Marker } = require('@vis.gl/react-google-maps');
  return (
    <div className="w-full h-96 rounded-2xl overflow-hidden shadow-lg">
      <APIProvider apiKey={apiKey}>
        <Map defaultCenter={{ lat: 30.4347, lng: 79.3321 }} defaultZoom={13} mapId="gauchar-business-map" className="w-full h-full">
          {businesses.map(b => (
            <Marker key={b.id} position={{ lat: b.lat, lng: b.lng }} title={b.name} />
          ))}
        </Map>
      </APIProvider>
    </div>
  );
}
