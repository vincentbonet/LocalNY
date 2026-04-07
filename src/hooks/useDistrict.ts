import { useMutation } from '@tanstack/react-query';
import { lookupByAddress } from '../lib/api';

export function useDistrict() {
  const { data = [], isPending, error, mutate: lookup } = useMutation({
    mutationFn: lookupByAddress,
  });

  return {
    data,
    loading: isPending,
    error: error?.message ?? null,
    lookup,
  };
}