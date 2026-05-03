'use client';

import { APIProvider, Map, Marker } from '@vis.gl/react-google-maps';

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

const defaultCenter = { lat: 30.4347, lng: 79.3321 }; // Gauchar, Uttarakhand coordinates
const defaultZoom = 13;

export default function GoogleMapComponent({
  businesses,
  center = defaultCenter,
  zoom = defaultZoom,
}: GoogleMapComponentProps) {
  return (
    <div className="w-full h-96 rounded-2xl overflow-hidden shadow-lg">
      <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ''}>
        <Map
          defaultCenter={center}
          defaultZoom={zoom}
          mapId="gauchar-business-map"
          className="w-full h-full"
        >
          {businesses.map((business) => (
            <Marker
              key={business.id}
              position={{ lat: business.lat, lng: business.lng }}
              title={business.name}
            />
          ))}
        </Map>
      </APIProvider>
    </div>
  );
}
