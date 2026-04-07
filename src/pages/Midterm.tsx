import { useMutation } from '@tanstack/react-query';
import { lookupByAddress } from '../lib/api';
import type { OfficialGroup } from '../lib/api';
import { houseRaces2026 } from '../data/midterm-2026';
import type { Race } from '../types/race';
import SearchBar from '../components/ui/SearchBar';
import Spinner from '../components/ui/Spinner';
import RaceCard from '../components/race/RaceCard';

function buildRaces(groups: OfficialGroup[]): Race[] {
  const races: Race[] = [];

  for (const group of groups) {
    const districtMatch = group.office.match(/District (\d+)/);
    const district = districtMatch?.[1];
    const office = group.office.toLowerCase();

    if (office.includes('representative') || office.includes('congress')) {
      const race = houseRaces2026.find((r) => r.district === district);
      if (race) races.push(race);
    } else if (office.includes('senator') || office.includes('assembly')) {
      races.push({
        id: group.office,
        office: group.office,
        district,
        level: office.includes('senator') ? 'State Senate' : 'State Assembly',
        status: 'upcoming',
        electionDate: '2026-11-03',
        candidates: group.officials.map((o) => ({
          name: o.name,
          party: o.party,
          incumbent: true,
          website: o.website,
        })),
      });
    }
  }

  return races;
}

export default function Midterm() {
  const { data: groups, mutate: lookup, isPending, error } = useMutation({
    mutationFn: lookupByAddress,
  });

  const races = groups ? buildRaces(groups) : [];

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-900 mb-2">2026 Midterm Elections</h1>
      <p className="text-gray-500 mb-8">
        Enter your NY address to see the 2026 races on your ballot.
      </p>

      <SearchBar onSearch={lookup} placeholder="Enter your NY address..." />

      {isPending && <Spinner />}
      {error && <p className="mt-4 text-red-500 text-sm">{(error as Error).message}</p>}

      {races.length > 0 && (
        <div className="mt-8 flex flex-col gap-4">
          {races.map((race) => (
            <RaceCard key={race.id} race={race} />
          ))}
        </div>
      )}

      {groups && races.length === 0 && (
        <p className="mt-8 text-gray-400 text-sm">No 2026 races found for this address.</p>
      )}
    </div>
  );
}
