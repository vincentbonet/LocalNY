import { councilMembers } from '../data/nyc-council-members';
import Badge from '../components/ui/Badge';

const boroughs = ['Manhattan', 'Bronx', 'Brooklyn', 'Queens', 'Staten Island'];

export default function NYC() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-2">NYC City Council</h1>
      <p className="text-gray-500 mb-8">51 members representing districts across the five boroughs.</p>

      {boroughs.map((borough) => {
        const members = Object.entries(councilMembers).filter(([, m]) =>
          m.borough.includes(borough)
        );
        return (
          <section key={borough} className="mb-10">
            <h2 className="text-lg font-semibold text-gray-700 border-b-2 border-gray-200 pb-2 mb-4">
              {borough}
            </h2>
            <div className="flex flex-col gap-2">
              {members.map(([district, member]) => (
                <div key={district} className="flex items-center gap-3 p-3 rounded-lg border border-gray-100 hover:bg-gray-50 transition-colors">
                  <div className="w-9 h-9 rounded-full bg-gray-200 shrink-0" />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <Badge party={member.party} />
                      <span className="font-medium text-sm truncate">{member.name}</span>
                    </div>
                    <p className="text-xs text-gray-400 mt-0.5">District {district}</p>
                  </div>
                  {member.website && (
                    <a href={member.website} target="_blank" rel="noreferrer" className="text-xs text-blue-600 hover:underline shrink-0">
                      Website
                    </a>
                  )}
                </div>
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
}