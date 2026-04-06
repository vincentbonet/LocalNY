import { useState, useEffect } from 'react';
import type { Race } from '../types/race';

export function useElections(level?: string) {
  const [races, setRaces] = useState<Race[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    // TODO: fetch from NY BOE or Google Civic
    setRaces([]);
    setLoading(false);
  }, [level]);

  return { races, loading };
}