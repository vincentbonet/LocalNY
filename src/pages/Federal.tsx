import { fetchNYFederalLegislators } from '../lib/api';
import { useOfficials } from '../hooks/useOfficials';
import Spinner from '../components/ui/Spinner';
import Badge from '../components/ui/Badge';

export default function Federal() {
  const { data, loading, error } = useOfficials(fetchNYFederalLegislators);

  const senate = data.filter((l) => l.chamber === 'U.S. Senate');
  const house = data.filter((l) => l.chamber === 'U.S. House');

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-8">Federal — New York</h1>

      {loading && <Spinner />}
      {error && <p className="text-red-500 text-sm">{error}</p>}

      {!loading && (
        <>
          <section className="mb-10">
            <h2 className="text-lg font-semibold text-indigo-700 border-b-2 border-indigo-200 pb-2 mb-4">
              U.S. Senate — 2 seats
            </h2>
            <div className="grid grid-cols-1 gap-2">
              {senate.map((leg) => (
                <FederalCard key={leg.name} leg={leg} />
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-violet-700 border-b-2 border-violet-200 pb-2 mb-4">
              U.S. House — 26 seats
            </h2>
            <div className="grid grid-cols-1 gap-2">
              {house.map((leg) => (
                <FederalCard key={leg.name} leg={leg} />
              ))}
            </div>
          </section>
        </>
      )}
    </div>
  );
}

function FederalCard({ leg }: { leg: import('../lib/api').Legislator }) {
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
        <p className="text-xs text-gray-400 mt-0.5">
          {leg.chamber} · {leg.district === 'Statewide' ? 'Statewide' : `District ${leg.district}`}
        </p>
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
