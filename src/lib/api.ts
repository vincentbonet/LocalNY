import axios from 'axios';
import type { Official } from '../types/official';

export const openStatesApi = axios.create({
  baseURL: 'https://v3.openstates.org',
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
    params: { lat, lng, apikey: import.meta.env.VITE_OPENSTATES_API_KEY },
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
      apikey: import.meta.env.VITE_OPENSTATES_API_KEY,
    },
  });
  return data;
}

export interface Legislator {
  name: string; 
  party: string;
  district: string, 
  chamber: string, 
  imageUrl?: string;
  website?: string;
}

export async function fetchNYLegislators(chamber: 'upper' | 'lower'): Promise<Legislator[]> {
  const { data } = await openStatesApi.get('/people', {
    params: {
      jurisdiction: 'ocd-jurisdiction/country:us/state:ny/government',
      org_classification: chamber,
      per_page: 50,
      include: 'links',
      apikey: import.meta.env.VITE_OPENSTATES_API_KEY,
    },
  });

    return (data.results ?? []).map((p: any) => ({
    name: p.name,
    party: p.party ?? 'Unknown',
    district: p.current_role?.district ?? '?',
    chamber: chamber === 'upper' ? 'Senate' : 'Assembly',
    imageUrl: p.image,
    website: p.links?.[0]?.url,
  }));
}

export async function fetchNYFederalLegislators(): Promise<Legislator[]> {
  const { data } = await openStatesApi.get('/people', {
    params: {
      jurisdiction: 'ocd-jurisdiction/country:us/government',
      state: 'ny',
      per_page: 50,
      include: 'links',
      apikey: import.meta.env.VITE_OPENSTATES_API_KEY
    },
  });

  return (data.results ?? []).map((p: any) => ({
    name: p.name,
    party: p.party ?? 'Unknown',
    district: p.current_role?.district ?? 'Statewide',
    chamber: p.current_role?.org_classification === 'upper' ? 'U.S. Senate' : 'U.S. House',
    imageUrl: p.image,
    website: p.links?.[0]?.url,
  }));
}
export interface NYCCouncilLookup {
  district: number;
  borough: string;
}

function parseNYCAddress(address: string): { houseNumber: string; street: string; borough: string } | null {
  const boroughMap: Record<string, string> = {
    'manhattan': 'manhattan',
    'bronx': 'bronx',
    'brooklyn': 'brooklyn',
    'queens': 'queens',
    'staten island': 'statenisland',
  };

  const lower = address.toLowerCase();
  let borough = '';
  for (const [name, code] of Object.entries(boroughMap)) {
    if (lower.includes(name)) { borough = code; break; }
  }
  if (!borough) return null;

  const match = address.match(/^(\d+)\s+(.+?)(?:,|$)/i);
  if (!match) return null;

  return { houseNumber: match[1], street: match[2].trim(), borough };
}

export async function lookupNYCCouncilDistrict(address: string): Promise<NYCCouncilLookup | null> {
  const parsed = parseNYCAddress(address);
  if (!parsed) return null;

  const { data } = await axios.get('https://api.nyc.gov/geo/geoclient/v2/address.json', {
    params: {
      houseNumber: parsed.houseNumber,
      street: parsed.street,
      borough: parsed.borough,
      app_id: import.meta.env.VITE_NYC_GEOCLIENT_APP_ID,
      app_key: import.meta.env.VITE_NYC_GEOCLIENT_APP_KEY,
    },
  });

  const result = data.address;
  if (!result?.councilDistrict) return null;

  return {
    district: parseInt(result.councilDistrict),
    borough: parsed.borough,
  };
}