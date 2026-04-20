import { useState } from 'react';
import { Link } from 'react-router-dom';
import SearchBar from '../components/ui/SearchBar';
import { useDistrict } from '../hooks/useDistrict';
import Spinner from '../components/ui/Spinner';
import Badge from '../components/ui/Badge';

export default function Home() {
  const { data, loading, error, lookup } = useDistrict();
  const [lastAddress, setLastAddress] = useState('');

  function handleSearch(address: string) {
    setLastAddress(address);
    lookup(address);
  }

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">LocalNY</h1>
      <p className="text-gray-500 mb-8">
        Track every level of New York politics — from your school board to the U.S. Senate.
      </p>
      <SearchBar onSearch={handleSearch} placeholder="Enter your NY address..." />
      {loading && <Spinner />}
      {error && <p className="mt-4 text-red-500 text-sm">{error}</p>}
      {data.length > 0 && (
        <div className="mt-8 flex flex-col gap-6">
          {data.map((group) => (
            <div key={group.office}>
              <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2">
                {group.office}
              </h2>
              <div className="flex flex-col gap-2">
                {group.officials.map((official) => (
                  <div key={official.name} className="flex items-center gap-3 border border-gray-200 rounded-lg p-3">
                    {official.photoUrl && (
                      <img src={official.photoUrl} alt={official.name} className="w-10 h-10 rounded-full object-cover" />
                    )}
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <Badge party={official.party} />
                        <span className="font-medium text-sm">{official.name}</span>
                      </div>
                      {official.phone && (
                        <p className="text-xs text-gray-400 mt-0.5">{official.phone}</p>
                      )}
                      {official.email && (
                        <a href={`mailto:${official.email}`} className="text-xs text-blue-600 hover:underline mt-0.5 block">
                          {official.email}
                        </a>
                      )}
                    </div>
                    {official.website && (
                      <a href={official.website} target="_blank" rel="noreferrer" className="text-xs text-blue-600 hover:underline">
                        Website
                      </a>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}

          <Link
            to={`/midterm?address=${encodeURIComponent(lastAddress)}`}
            className="mt-2 inline-flex items-center gap-1 text-sm font-medium text-indigo-600 hover:text-indigo-800"
          >
            See your 2026 races →
          </Link>
        </div>
      )}
    </div>
  );
}
