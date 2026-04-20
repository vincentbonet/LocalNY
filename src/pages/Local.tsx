import { useMutation } from '@tanstack/react-query';
import { lookupByAddress, lookupNYCCouncilMember } from '../lib/api';
import { councilMembers } from '../data/nyc-council-members';
import SearchBar from '../components/ui/SearchBar';
import Spinner from '../components/ui/Spinner';
import Badge from '../components/ui/Badge';
import { useState } from 'react';
import { usePageTitle } from '../hooks/usePageTitle';

export default function Local() {
  usePageTitle('Local Government');
  const [councilDistrict, setCouncilDistrict] = useState<number | null>(null);

  const { data: groups = [], mutate: lookup, isPending, error } = useMutation({
    mutationFn: async (address: string) => {
      const [reps, district] = await Promise.all([
        lookupByAddress(address),
        lookupNYCCouncilMember(address),
      ]);
      setCouncilDistrict(district);
      return reps;
    },
  });

  const localGroups = groups.filter((g) => {
    const o = g.office.toLowerCase();
    return !o.includes('representative') && !o.includes('congress') &&
           !o.includes('senator') && !o.includes('assembly');
  });

  const councilMember = councilDistrict ? councilMembers[councilDistrict] : null;

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-900 mb-2">Local Government</h1>
      <p className="text-gray-500 mb-8">
        Enter your NY address to find your local elected officials.
      </p>

      <SearchBar onSearch={lookup} placeholder="Enter your NY address..." />

      {isPending && <Spinner />}
      {error && <p className="mt-4 text-red-500 text-sm">{(error as Error).message}</p>}

      {councilMember && (
        <div className="mt-8">
          <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2">
            NYC Council — District {councilDistrict}
          </h2>
          <div className="flex items-center gap-3 border border-gray-200 rounded-lg p-3">
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <Badge party={councilMember.party} />
                <span className="font-medium text-sm">{councilMember.name}</span>
              </div>
              <p className="text-xs text-gray-400 mt-0.5">{councilMember.borough}</p>
            </div>
            {councilMember.website && (
              <a href={councilMember.website} target="_blank" rel="noreferrer" className="text-xs text-blue-600 hover:underline">
                Website
              </a>
            )}
          </div>
        </div>
      )}

      {groups.length > 0 && localGroups.length === 0 && !councilMember && (
        <p className="mt-8 text-gray-400 text-sm">No additional local officials found for this address.</p>
      )}

      {localGroups.length > 0 && (
        <div className="mt-8 flex flex-col gap-6">
          {localGroups.map((group) => (
            <div key={group.office}>
              <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2">
                {group.office}
              </h2>
              <div className="flex flex-col gap-2">
                {group.officials.map((official) => (
                  <div key={official.name} className="flex items-center gap-3 border border-gray-200 rounded-lg p-3">
                    {official.photoUrl && (
                      <img src={official.photoUrl} alt={official.name} className="w-10 h-10 rounded-full object-cover" />
                    )}
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <Badge party={official.party} />
                        <span className="font-medium text-sm">{official.name}</span>
                      </div>
                    </div>
                    {official.website && (
                      <a href={official.website} target="_blank" rel="noreferrer" className="text-xs text-blue-600 hover:underline">
                        Website
                      </a>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
