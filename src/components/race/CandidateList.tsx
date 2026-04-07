import type { Candidate } from '../../types/race';
import Badge from '../ui/Badge';

interface Props {
  candidates: Candidate[];
}

export default function CandidateList({ candidates }: Props) {
  return (
    <ul className="divide-y divide-gray-100">
      {candidates.map((c) => (
        <li key={c.name} className="py-3 flex items-center gap-3">
          <Badge party={c.party} />
          <span className="font-medium text-sm">{c.name}</span>
          {c.incumbent && <span className="text-xs text-gray-400">Incumbent</span>}
          {c.website && (
            <a href={c.website} target="_blank" rel="noreferrer" className="ml-auto text-xs text-blue-600 hover:underline">
              Website
            </a>
          )}
        </li>
      ))}
    </ul>
  );
}