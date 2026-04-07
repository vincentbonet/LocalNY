import { useState } from 'react';
import { lookupByAddress, parseRepresentatives } from '../lib/api';
import type { OfficialGroup } from '../lib/api';

export function useDistrict() {
  const [data, setData] = useState<OfficialGroup[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function lookup(address: string) {
    setLoading(true);
    setError(null);
    try {
      const result = await lookupByAddress(address);
      setData(parseRepresentatives(result));
    } catch (e: any) {
      setError(e.message ?? 'Lookup failed');
    } finally {
      setLoading(false);
    }
  }

  return { data, loading, error, lookup };
}