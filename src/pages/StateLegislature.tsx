import { fetchNYLegislators } from '../lib/api';
import { useOfficials } from '../hooks/useOfficials';
import Spinner from '../components/ui/Spinner';
import Badge from '../components/ui/Badge';

export default function StateLegislature() {
  const senate = useOfficials(() => fetchNYLegislators('upper'));
  const assembly = useOfficials(() => fetchNYLegislators('lower'));

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-8">NY State Legislature</h1>

      <section className="mb-10">
        <h2 className="text-lg font-semibold text-blue-700 border-b-2 border-blue-200 pb-2 mb-4">
          State Senate — 63 seats
        </h2>
        {senate.loading && <Spinner />}
        {senate.error && <p className="text-red-500 text-sm">{senate.error}</p>}
        <div className="grid grid-cols-1 gap-2">
          {senate.data.map((leg) => (
            <LegislatorRow key={leg.name} leg={leg} />
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-lg font-semibold text-green-700 border-b-2 border-green-200 pb-2 mb-4">
          State Assembly — 150 seats (showing first 100)
        </h2>
        {assembly.loading && <Spinner />}
        {assembly.error && <p className="text-red-500 text-sm">{assembly.error}</p>}
        <div className="grid grid-cols-1 gap-2">
          {assembly.data.map((leg) => (
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
