import { MapContainer, TileLayer, ZoomControl } from 'react-leaflet';

const NY_CENTER: [number, number] = [42.9538, -75.5268];
const NY_ZOOM = 7;

export default function MapView() {
  return (
    <div className="flex flex-col h-full">
      <div className="mb-4">
        <h1 className="text-2xl font-bold text-gray-900">District Map</h1>
        <p className="text-gray-500 text-sm mt-1">Explore New York's political districts.</p>
      </div>

      <div className="flex-1 rounded-lg overflow-hidden border border-gray-200" style={{ minHeight: '600px' }}>
        <MapContainer
          center={NY_CENTER}
          zoom={NY_ZOOM}
          style={{ height: '100%', width: '100%' }}
          zoomControl={false}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <ZoomControl position="bottomright" />
          {/* District GeoJSON layers go here */}
        </MapContainer>
      </div>
    </div>
  );
}
