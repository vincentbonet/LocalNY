import { officesByLevel } from '../data/offices';

export default function Metro() {
  const offices = officesByLevel('metro');
  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Federal Offices</h1>
      <div className="grid gap-4">
        {offices.map((o) => (
          <div key={o.id} className="border border-gray-200 rounded-lg p-4">
            <h2 className="font-semibold">{o.title}</h2>
            <p className="text-sm text-gray-500">{o.description}</p>
            <p className="text-xs text-gray-400 mt-1">{o.seats} seat{o.seats !== 1 ? 's' : ''} · {o.termYears}-year term</p>
          </div>
        ))}
      </div>
    </div>
  );
}