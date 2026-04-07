import { useState, useEffect } from 'react';
import type { Legislator } from '../lib/api';

type FetchFn = () => Promise<Legislator[]>;

export function useOfficials(fetchFn: FetchFn) {
  const [data, setData] = useState<Legislator[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchFn()
      .then(setData)
      .catch((e) => setError(e.message ?? 'Failed to load'))
      .finally(() => setLoading(false));
  }, []);

  return { data, loading, error };
}