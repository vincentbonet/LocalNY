import { useQuery } from '@tanstack/react-query';
import type { Legislator } from '../lib/api';

type FetchFn = () => Promise<Legislator[]>;

export function useOfficials(fetchFn: FetchFn, key: string) {
  return useQuery({
    queryKey: [key],
    queryFn: fetchFn,
  });
}