import { metroAgencies } from '../data/mta-officials';
import { usePageTitle } from '../hooks/usePageTitle';

export default function Metro() {
  usePageTitle('Metro Agencies');
  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-2">Metro Agencies</h1>
      <p className="text-gray-500 mb-8">Regional authorities serving the New York metropolitan area.</p>
      <div className="flex flex-col gap-6">
        {metroAgencies.map((agency) => (
          <div key={agency.name} className="border border-gray-200 rounded-lg p-5">
            <div className="flex items-start justify-between gap-4 mb-4">
              <div>
                <h2 className="font-semibold text-gray-900">{agency.name}</h2>
                <p className="text-sm text-gray-500 mt-0.5">{agency.description}</p>
              </div>
              <a href={agency.website} target="_blank" rel="noreferrer" className="text-xs text-blue-600 hover:underline shrink-0">
                Website
              </a>
            </div>
            <div className="flex flex-col divide-y divide-gray-100">
              {agency.officials.filter((o) => o.name !== 'TBD').map((official) => (
                <div key={`${official.name}-${official.title}`} className="flex items-center justify-between py-2 text-sm">
                  <span className="font-medium text-gray-900">{official.name}</span>
                  <div className="text-right">
                    <span className="text-gray-600">{official.title}</span>
                    {official.appointedBy && (
                      <p className="text-xs text-gray-400">Appt. by {official.appointedBy}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}