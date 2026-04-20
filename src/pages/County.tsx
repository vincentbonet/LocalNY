import { counties, regions } from '../data/counties';
import type { County } from '../data/counties';
import Badge from '../components/ui/Badge';

export default function County() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-2">NY County Government</h1>
      <p className="text-gray-500 mb-8">Top executive for each of New York's 62 counties.</p>

      {regions.map((region) => {
        const regionCounties = counties.filter((c) => c.region === region);
        return (
          <section key={region} className="mb-10">
            <h2 className="text-lg font-semibold text-gray-700 border-b-2 border-gray-200 pb-2 mb-4">
              {region}
            </h2>
            <div className="grid grid-cols-1 gap-2">
              {regionCounties.map((county) => (
                <CountyRow key={county.name} county={county} />
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
}

function CountyRow({ county }: { county: County }) {
  const exec = county.executive;
  return (
    <div className="flex items-center gap-3 p-3 rounded-lg border border-gray-100 hover:bg-gray-50 transition-colors">
      <div className="flex-1 min-w-0">
        <span className="font-medium text-sm">{county.name} County</span>
        {exec && (
        <p className="text-xs text-gray-400 mt-0.5">
          {exec.title}{exec.name ? ` · ${exec.name}` : ''}
        </p>
        )}
      </div>
      {exec?.party && exec.name !== 'TBD' && <Badge party={exec.party} />}
      {county.website && (
        <a href={county.website} target="_blank" rel="noreferrer" className="text-xs text-blue-600 hover:underline shrink-0">
          Website
        </a>
      )}
    </div>
  );
}
