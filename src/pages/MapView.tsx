import { useState, useEffect } from 'react';
import { MapContainer, TileLayer, ZoomControl, WMSTileLayer, Marker, Popup, useMap } from 'react-leaflet';
import { useMutation } from '@tanstack/react-query';
import L from 'leaflet';
import { geocodeAddress, lookupByAddress } from '../lib/api';
import type { OfficialGroup } from '../lib/api';
import SearchBar from '../components/ui/SearchBar';
import Spinner from '../components/ui/Spinner';
import Badge from '../components/ui/Badge';
import { usePageTitle } from '../hooks/usePageTitle';

import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: markerIcon,
  iconRetinaUrl: markerIcon2x,
  shadowUrl: markerShadow,
});

const NY_CENTER: [number, number] = [42.9538, -75.5268];
const NY_ZOOM = 7;

const LAYERS = [
  { label: 'Congressional', id: '12' },
  { label: 'State Senate',  id: '14' },
  { label: 'Assembly',      id: '16' },
] as const;

function FlyTo({ coords }: { coords: [number, number] }) {
  const map = useMap();
  useEffect(() => { map.flyTo(coords, 12); }, [coords]);
  return null;
}

export default function MapView() {
  usePageTitle('District Map');
  const [coords, setCoords] = useState<[number, number] | null>(null);
  const [groups, setGroups] = useState<OfficialGroup[]>([]);
  const [activeLayer, setActiveLayer] = useState<string>('12');

  const { mutate: search, isPending, error } = useMutation({
    mutationFn: async (address: string) => {
      const [geo, reps] = await Promise.all([
        geocodeAddress(address),
        lookupByAddress(address),
      ]);
      return { geo, reps };
    },
    onSuccess: ({ geo, reps }) => {
      setCoords([geo.lat, geo.lng]);
      setGroups(reps);
    },
  });

  return (
    <div className="flex flex-col flex-1">
      <div className="mb-4">
        <h1 className="text-2xl font-bold text-gray-900">District Map</h1>
        <p className="text-gray-500 text-sm mt-1">Enter your address to see your representatives.</p>
      </div>

      <div className="mb-4 flex flex-wrap gap-4 items-center">
        <div className="flex-1 max-w-sm">
          <SearchBar onSearch={search} placeholder="Enter your NY address..." />
        </div>
        <div className="flex gap-1">
          {LAYERS.map((layer) => (
            <button
              key={layer.id}
              onClick={() => setActiveLayer(layer.id)}
              className={`px-3 py-1.5 rounded text-xs font-medium transition-colors ${
                activeLayer === layer.id
                  ? 'bg-gray-900 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {layer.label}
            </button>
          ))}
        </div>
        {isPending && <Spinner />}
        {error && <p className="text-red-500 text-sm">{(error as Error).message}</p>}
      </div>

      <div className="flex flex-col md:flex-row gap-4 flex-1" style={{ minHeight: '540px' }}>
        <div className="flex-1 rounded-lg overflow-hidden border border-gray-200" style={{ minHeight: '400px' }}>
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
            <WMSTileLayer
              key={activeLayer}
              url="https://tigerweb.geo.census.gov/arcgis/services/TIGERweb/Legislative/MapServer/WMSServer"
              layers={activeLayer}
              format="image/png"
              transparent={true}
              opacity={0.6}
              attribution="US Census Bureau"
            />
            <ZoomControl position="bottomright" />
            {coords && (
              <>
                <FlyTo coords={coords} />
                <Marker position={coords}>
                  <Popup>Your address</Popup>
                </Marker>
              </>
            )}
          </MapContainer>
        </div>

        {groups.length > 0 && (
          <div className="w-full md:w-64 border border-gray-200 rounded-lg p-4 overflow-y-auto md:shrink-0">
            <h2 className="font-semibold text-gray-900 mb-4">Your Representatives</h2>
            <div className="flex flex-col gap-4">
              {groups.map((group) => (
                <div key={group.office}>
                  <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1">
                    {group.office}
                  </p>
                  {group.officials.map((o) => (
                    <div key={o.name} className="flex items-center gap-2">
                      <Badge party={o.party} />
                      <span className="text-sm font-medium">{o.name}</span>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
