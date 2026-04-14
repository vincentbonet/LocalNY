import { useState } from 'react';
import { MapContainer, TileLayer, ZoomControl, GeoJSON } from 'react-leaflet';
import { useQuery } from '@tanstack/react-query';
import type { Layer, LeafletMouseEvent } from 'leaflet';
import type { Feature } from 'geojson';
import { fetchCongressionalDistrictGeoJSON } from '../lib/api';
import { houseRaces2026 } from '../data/midterm-2026';
import { partyColor } from '../lib/utils';
import Badge from '../components/ui/Badge';
import Spinner from '../components/ui/Spinner';
import type { Race } from '../types/race';

const NY_CENTER: [number, number] = [42.9538, -75.5268];
const NY_ZOOM = 7;

function getIncumbentParty(district: string): string {
  const race = houseRaces2026.find((r) => r.district === district);
  const incumbent = race?.candidates.find((c) => c.incumbent);
  return incumbent?.party ?? 'Unknown';
}

function districtStyle(district: string) {
  const party = getIncumbentParty(district);
  return {
    color: '#fff',
    weight: 1,
    fillColor: partyColor(party),
    fillOpacity: 0.5,
  };
}

function districtHoverStyle(district: string) {
  return { ...districtStyle(district), fillOpacity: 0.8, weight: 2 };
}

export default function MapView() {
  const [selected, setSelected] = useState<Race | null>(null);

  const { data: geojson, isLoading, error } = useQuery({
    queryKey: ['congressional-geojson'],
    queryFn: fetchCongressionalDistrictGeoJSON,
  });

  function onEachFeature(feature: Feature, layer: Layer) {
    console.log(feature.properties); 
    const district = feature.properties?.DISTRICT?.replace(/^0+/, '');
    if (!district) return;

    layer.on({
      mouseover: (e: LeafletMouseEvent) => {
        e.target.setStyle(districtHoverStyle(district));
      },
      mouseout: (e: LeafletMouseEvent) => {
        e.target.setStyle(districtStyle(district));
      },
      click: () => {
        const race = houseRaces2026.find((r) => r.district === district);
        setSelected(race ?? null);
      },
    });
  }

  function styleFeature(feature?: Feature) {
    const district = feature?.properties?.DISTRICT?.replace(/^0+/, '');
    return districtStyle(district ?? '');
  }

  return (
    <div className="flex flex-col h-full">
      <div className="mb-4 flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">District Map</h1>
          <p className="text-gray-500 text-sm mt-1">NY Congressional Districts — colored by incumbent party. Click a district for details.</p>
        </div>
        <div className="flex items-center gap-3 text-xs text-gray-500">
          <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-sm inline-block" style={{ background: partyColor('Democratic') }} /> Democrat</span>
          <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-sm inline-block" style={{ background: partyColor('Republican') }} /> Republican</span>
        </div>
      </div>

      <div className="flex gap-4 flex-1" style={{ minHeight: '600px' }}>
        <div className="flex-1 rounded-lg overflow-hidden border border-gray-200">
          {isLoading && <div className="flex items-center justify-center h-full"><Spinner /></div>}
          {error && <p className="p-4 text-red-500 text-sm">Failed to load district boundaries.</p>}
          {geojson && (
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
              <GeoJSON
                key="congressional"
                data={geojson}
                style={styleFeature}
                onEachFeature={onEachFeature}
              />
            </MapContainer>
          )}
        </div>

        {selected && (
          <div className="w-64 border border-gray-200 rounded-lg p-4 shrink-0">
            <div className="flex items-center justify-between mb-3">
              <h2 className="font-semibold text-gray-900">District {selected.district}</h2>
              <button onClick={() => setSelected(null)} className="text-gray-400 hover:text-gray-600 text-lg leading-none">×</button>
            </div>
            <p className="text-xs text-gray-400 uppercase tracking-wide mb-3">U.S. House — NY</p>
            <div className="flex flex-col gap-2">
              {selected.candidates.filter((c) => c.name !== 'TBD').map((c) => (
                <div key={c.name} className="flex items-center gap-2">
                  <Badge party={c.party} />
                  <div>
                    <p className="text-sm font-medium">{c.name}</p>
                    {c.incumbent && <p className="text-xs text-gray-400">Incumbent</p>}
                  </div>
                </div>
              ))}
            </div>
            {selected.candidates.find((c) => c.incumbent)?.website && (
              <a
                href={selected.candidates.find((c) => c.incumbent)!.website}
                target="_blank"
                rel="noreferrer"
                className="mt-4 block text-xs text-blue-600 hover:underline"
              >
                Official Website
              </a>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
