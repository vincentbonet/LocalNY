import axios from 'axios';
import type { Official } from '../types/official';

export const openStatesApi = axios.create({
  baseURL: 'https://v3.openstates.org',
  headers: {
    'X-API-KEY': import.meta.env.VITE_OPENSTATES_API_KEY,
  },
});

async function geocodeAddress(address: string): Promise<{ lat: number; lng: number }> {
  const { data } = await axios.get('https://nominatim.openstreetmap.org/search', {
    params: { q: address, format: 'json', limit: 1 },
    headers: { 'Accept-Language': 'en' },
  });
  if (!data.length) throw new Error('Address not found');
  return { lat: parseFloat(data[0].lat), lng: parseFloat(data[0].lon) };
}

export interface OfficialGroup {
  office: string;
  officials: Official[];
}

export async function lookupByAddress(address: string): Promise<OfficialGroup[]> {
  const { lat, lng } = await geocodeAddress(address);
  const { data } = await openStatesApi.get('/people.geo', {
    params: { lat, lng },
  });
  return parseOpenStatesResponse(data);
}

function parseOpenStatesResponse(data: any): OfficialGroup[] {
  const grouped: Record<string, Official[]> = {};

  for (const person of data.results ?? []) {
    const role = person.current_role;
    if (!role) continue;

    const office = `${role.title} — District ${role.district}`;
    if (!grouped[office]) grouped[office] = [];

    grouped[office].push({
      name: person.name,
      party: person.party ?? 'Unknown',
      website: person.links?.[0]?.url,
      photoUrl: person.image,
    } satisfies Official);
  }

  return Object.entries(grouped).map(([office, officials]) => ({ office, officials }));
}

export async function lookupNYLegislators(district: number, chamber: 'upper' | 'lower') {
  const { data } = await openStatesApi.get('/people', {
    params: {
      jurisdiction: 'ocd-jurisdiction/country:us/state:ny/government',
      district,
      org_classification: chamber,
    },
  });
  return data;
}