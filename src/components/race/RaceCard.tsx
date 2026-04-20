import type { Race } from '../../types/race';
import Badge from '../ui/Badge';
import { formatElectionDate } from '../../lib/utils';

interface Props {
  race: Race;
}

export default function RaceCard({ race }: Props) {
  return (
    <div className="border border-gray-200 rounded-lg p-4">
      <div className="flex items-center justify-between mb-2">
        <h3 className="font-semibold text-gray-900">{race.office}</h3>
        <span className="text-xs text-gray-500">{formatElectionDate(race.electionDate)}</span>
      </div>
      {race.district && <p className="text-sm text-gray-500 mb-3">District: {race.district}</p>}
      <div className="flex flex-col gap-2">
        {race.candidates.filter((c) => c.name !== 'TBD').map((c) => (
          <div key={c.name} className="flex items-center gap-2 text-sm">
            <Badge party={c.party} />
            <span className="font-medium">{c.name}</span>
            {c.incumbent && <span className="text-xs text-gray-400">(incumbent)</span>}
          </div>
        ))}
        {race.candidates.every((c) => c.name === 'TBD') && (
          <p className="text-sm text-gray-400 italic">Candidates TBD</p>
        )}
      </div>
    </div>
  );
}