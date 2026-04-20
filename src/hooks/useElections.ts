import { houseRaces2026 } from '../data/midterm-2026';
import type { Race } from '../types/race';

export function useElections(level?: string): { races: Race[]; loading: false } {
  const races = level
    ? houseRaces2026.filter((r) => r.level === level)
    : houseRaces2026;

  return { races, loading: false };
}
