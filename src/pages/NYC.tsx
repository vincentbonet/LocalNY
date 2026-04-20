import { useState } from 'react';
import { councilMembers } from '../data/nyc-council-members';
import Badge from '../components/ui/Badge';
import { usePageTitle } from '../hooks/usePageTitle';

const boroughs = ['Manhattan', 'Bronx', 'Brooklyn', 'Queens', 'Staten Island'];

export default function NYC() {
  usePageTitle('NYC City Council');
  const [query, setQuery] = useState('');
  const q = query.toLowerCase();

  const allMembers = Object.entries(councilMembers);
  const filtered = q
    ? allMembers.filter(([district, m]) =>
        m.name.toLowerCase().includes(q) || district.includes(q) || m.borough.toLowerCase().includes(q)
      )
    : null;

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-1">NYC City Council</h1>
      <p className="text-gray-500 mb-6">51 members across the five boroughs.</p>

      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search by name, district, or borough..."
        className="w-full max-w-sm border border-gray-300 rounded px-3 py-2 text-sm mb-8 focus:outline-none focus:ring-2 focus:ring-gray-900"
      />

      {filtered ? (
        <div className="flex flex-col gap-2">
          {filtered.map(([district, member]) => (
            <MemberRow key={district} district={district} member={member} />
          ))}
          {filtered.length === 0 && <p className="text-gray-400 text-sm">No members found.</p>}
        </div>
      ) : (
        boroughs.map((borough) => {
          const members = allMembers.filter(([, m]) => m.borough.includes(borough));
          return (
            <section key={borough} className="mb-10">
              <h2 className="text-lg font-semibold text-gray-700 border-b-2 border-gray-200 pb-2 mb-4">
                {borough} <span className="text-sm font-normal text-gray-400">({members.length})</span>
              </h2>
              <div className="flex flex-col gap-2">
                {members.map(([district, member]) => (
                  <MemberRow key={district} district={district} member={member} />
                ))}
              </div>
            </section>
          );
        })
      )}
    </div>
  );
}

function MemberRow({ district, member }: { district: string; member: { name: string; party: string; borough: string; website?: string } }) {
  return (
    <div className="flex items-center gap-3 p-3 rounded-lg border border-gray-100 hover:bg-gray-50 transition-colors">
      <div className="w-9 h-9 rounded-full bg-gray-100 border border-gray-200 flex items-center justify-center shrink-0">
        <span className="text-xs font-bold text-gray-500">{district}</span>
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <Badge party={member.party} />
          <span className="font-medium text-sm truncate">{member.name}</span>
        </div>
        <p className="text-xs text-gray-400 mt-0.5">{member.borough}</p>
      </div>
      {member.website && (
        <a href={member.website} target="_blank" rel="noreferrer" className="text-xs text-blue-600 hover:underline shrink-0">
          Website
        </a>
      )}
    </div>
  );
}