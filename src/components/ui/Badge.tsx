import { partyColor, partyShort } from '../../lib/utils';

interface Props {
  party: string;
}

export default function Badge({ party }: Props) {
  return (
    <span
      className="inline-block px-2 py-0.5 rounded text-white text-xs font-bold"
      style={{ backgroundColor: partyColor(party) }}
    >
      {partyShort(party)}
    </span>
  );
}