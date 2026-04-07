import { statewideOfficials } from '../data/statewide-officials';
import type { StatewideOfficial } from '../data/statewide-officials';
import Badge from '../components/ui/Badge';

export default function Statewide() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-2">Statewide Offices</h1>
      <p className="text-gray-500 mb-8">Elected executives who serve all of New York State.</p>
      <div className="flex flex-col gap-2">
        {statewideOfficials.map((official) => (
          <OfficialRow key={official.office} official={official} />
        ))}
      </div>
    </div>
  );
}

function OfficialRow({ official }: { official: StatewideOfficial }) {
  return (
    <div className="flex items-center gap-3 p-3 rounded-lg border border-gray-100 hover:bg-gray-50 transition-colors">
      <div className="w-9 h-9 rounded-full bg-gray-200 shrink-0" />
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <Badge party={official.party} />
          <span className="font-medium text-sm truncate">{official.name}</span>
        </div>
        <p className="text-xs text-gray-400 mt-0.5">{official.office}</p>
      </div>
      <a
        href={official.website}
        target="_blank"
        rel="noreferrer"
        className="text-xs text-blue-600 hover:underline shrink-0"
      >
        Website
      </a>
    </div>
  );
}