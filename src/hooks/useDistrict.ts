import { useState } from 'react';
import { lookupByAddress } from '../lib/api';
import type { OfficialGroup } from '../lib/api';
import type { District } from '../types/district';

function buildDistricts(groups: OfficialGroup[]): District[] {
  return groups.flatMap((group) => {
    const districtMatch = group.office.match(/District (\d+)/);
    const number = districtMatch ? parseInt(districtMatch[1]) : undefined;
    const office = group.office.toLowerCase();

    let level: District['level'] = 'state_legislature';
    if (office.includes('representative') || office.includes('congress')) level = 'federal';
    else if (office.includes('assembly') || office.includes('senator')) level = 'state_legislature';

    return [{
      id: group.office,
      name: group.office,
      level,
      state: 'NY',
      number,
    }];
  });
}

export function useDistrict() {
  const [data, setData] = useState<OfficialGroup[]>([]);
  const [districts, setDistricts] = useState<District[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function lookup(address: string) {
    setLoading(true);
    setError(null);
    try {
      const result = await lookupByAddress(address);
      setData(result);
      setDistricts(buildDistricts(result));
    } catch (e: any) {
      setError(e.message ?? 'Lookup failed');
    } finally {
      setLoading(false);
    }
  }

  return { data, districts, loading, error, lookup };
}
