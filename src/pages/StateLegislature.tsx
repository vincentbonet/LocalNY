import { useState } from 'react';
import { fetchNYLegislators } from '../lib/api';
import { useOfficials } from '../hooks/useOfficials';
import Spinner from '../components/ui/Spinner';
import Badge from '../components/ui/Badge';
import { usePageTitle } from '../hooks/usePageTitle';

export default function StateLegislature() {
  usePageTitle('State Legislature');
  const [query, setQuery] = useState('');
  const senate = useOfficials(() => fetchNYLegislators('upper'), 'senate');
  const assembly = useOfficials(() => fetchNYLegislators('lower'), 'assembly');

  function filter<T extends { name: string; district: string }>(list: T[]): T[] {
    const q = query.toLowerCase();
    return list
      .sort((a, b) => parseInt(a.district) - parseInt(b.district))
      .filter((l) => !q || l.name.toLowerCase().includes(q) || l.district.includes(q));
  }

  const senateList = filter(senate.data ?? []);
  const assemblyList = filter(assembly.data ?? []);

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-1">NY State Legislature</h1>
      <p className="text-gray-500 mb-6">63 State Senators and 150 Assembly Members.</p>

      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search by name or district number..."
        className="w-full max-w-sm border border-gray-300 rounded px-3 py-2 text-sm mb-8 focus:outline-none focus:ring-2 focus:ring-gray-900"
      />

      <section className="mb-10">
        <h2 className="text-lg font-semibold text-blue-700 border-b-2 border-blue-200 pb-2 mb-4">
          State Senate{senateList.length > 0 && <span className="text-sm font-normal text-gray-400 ml-2">{senateList.length} members</span>}
        </h2>
        {senate.isLoading && <Spinner />}
        {senate.error && <p className="text-red-500 text-sm">{senate.error.message}</p>}
        <div className="grid grid-cols-1 gap-2">
          {senateList.map((leg) => (
            <LegislatorRow key={leg.name} leg={leg} />
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-lg font-semibold text-green-700 border-b-2 border-green-200 pb-2 mb-4">
          State Assembly{assemblyList.length > 0 && <span className="text-sm font-normal text-gray-400 ml-2">{assemblyList.length} members</span>}
        </h2>
        {assembly.isLoading && <Spinner />}
        {assembly.error && <p className="text-red-500 text-sm">{assembly.error.message}</p>}
        <div className="grid grid-cols-1 gap-2">
          {assemblyList.map((leg) => (
            <LegislatorRow key={leg.name} leg={leg} />
          ))}
        </div>
      </section>
    </div>
  );
}

function LegislatorRow({ leg }: { leg: import('../lib/api').Legislator }) {
  return (
    <div className="flex items-center gap-3 p-3 rounded-lg border border-gray-100 hover:bg-gray-50 transition-colors">
      {leg.imageUrl ? (
        <img src={leg.imageUrl} alt={leg.name} className="w-9 h-9 rounded-full object-cover shrink-0" />
      ) : (
        <div className="w-9 h-9 rounded-full bg-gray-200 shrink-0" />
      )}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <Badge party={leg.party} />
          <span className="font-medium text-sm truncate">{leg.name}</span>
        </div>
        <p className="text-xs text-gray-400 mt-0.5">District {leg.district}</p>
      </div>
      {leg.website && (
        <a
          href={leg.website}
          target="_blank"
          rel="noreferrer"
          className="text-xs text-blue-600 hover:underline shrink-0"
        >
          Website
        </a>
      )}
    </div>
  );
}