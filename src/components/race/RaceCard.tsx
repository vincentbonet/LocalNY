import type { Race } from '../../types/race';
import Badge from '../ui/Badge';
import { formatElectionDate } from '../../lib/utils';

interface Props {
  race: Race;
}

const levelStyle: Record<string, string> = {
  federal: 'bg-blue-50 text-blue-700 border-blue-200',
  statewide: 'bg-purple-50 text-purple-700 border-purple-200',
  'State Senate': 'bg-indigo-50 text-indigo-700 border-indigo-200',
  'State Assembly': 'bg-green-50 text-green-700 border-green-200',
};

const levelLabel: Record<string, string> = {
  federal: 'Federal',
  statewide: 'Statewide',
  'State Senate': 'State Senate',
  'State Assembly': 'State Assembly',
};

export default function RaceCard({ race }: Props) {
  const style = levelStyle[race.level] ?? 'bg-gray-50 text-gray-600 border-gray-200';
  const label = levelLabel[race.level] ?? race.level;

  return (
    <div className="border border-gray-200 rounded-lg p-4">
      <div className="flex items-start justify-between gap-2 mb-3">
        <div>
          <h3 className="font-semibold text-gray-900">{race.office}</h3>
          {race.district && <p className="text-xs text-gray-500 mt-0.5">District {race.district}</p>}
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <span className={`text-xs font-medium px-2 py-0.5 rounded border ${style}`}>{label}</span>
          <span className="text-xs text-gray-400">{formatElectionDate(race.electionDate)}</span>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        {race.candidates.filter((c) => c.name !== 'TBD').map((c) => (
          <div key={c.name} className="flex items-center gap-2 text-sm">
            <Badge party={c.party} />
            <span className="font-medium">{c.name}</span>
            {c.incumbent && <span className="text-xs text-gray-400">(incumbent)</span>}
            {c.website && (
              <a href={c.website} target="_blank" rel="noreferrer" className="text-xs text-blue-600 hover:underline ml-auto">
                Website
              </a>
            )}
          </div>
        ))}
        {race.candidates.every((c) => c.name === 'TBD') && (
          <p className="text-sm text-gray-400 italic">Candidates TBD</p>
        )}
      </div>
    </div>
  );
}