import axios from 'axios';

export const civicApi = axios.create({
  baseURL: 'https://civicinfo.googleapis.com/civicinfo/v2',
  params: {
    key: import.meta.env.VITE_GOOGLE_CIVIC_API_KEY,
  },
});

export const openStatesApi = axios.create({
  baseURL: 'https://v3.openstates.org',
  headers: {
    'X-API-KEY': import.meta.env.VITE_OPENSTATES_API_KEY,
  },
});

export async function lookupByAddress(address: string) {
  const { data } = await civicApi.get('/representatives', {
    params: { address },
  });
  return data;
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