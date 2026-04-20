import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { lookupByAddress } from '../lib/api';
import type { OfficialGroup } from '../lib/api';
import { houseRaces2026 } from '../data/midterm-2026';
import { statewideRaces2026 } from '../data/statewide-races-2026';
import type { Race } from '../types/race';
import SearchBar from '../components/ui/SearchBar';
import Spinner from '../components/ui/Spinner';
import RaceCard from '../components/race/RaceCard';

function buildRaces(groups: OfficialGroup[]): Race[] {
  const races: Race[] = [...statewideRaces2026];

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
  const [searchParams] = useSearchParams();
  const addressParam = searchParams.get('address') ?? '';

  const { data: groups, mutate: lookup, isPending, error } = useMutation({
    mutationFn: lookupByAddress,
  });

  useEffect(() => {
    if (addressParam) lookup(addressParam);
  }, []);

  const races = groups ? buildRaces(groups) : statewideRaces2026;

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-900 mb-2">2026 Midterm Elections</h1>
      <p className="text-gray-500 mb-8">
        Enter your NY address to see all 2026 races on your ballot.
      </p>

      <SearchBar onSearch={lookup} defaultValue={addressParam} placeholder="Enter your NY address..." />

      {isPending && <Spinner />}
      {error && <p className="mt-4 text-red-500 text-sm">{(error as Error).message}</p>}

      <div className="mt-8 flex flex-col gap-4">
        {races.map((race) => (
          <RaceCard key={race.id} race={race} />
        ))}
      </div>

      {groups && races.length === statewideRaces2026.length && (
        <p className="mt-4 text-gray-400 text-sm">No additional district races found for this address.</p>
      )}
    </div>
  );
}
