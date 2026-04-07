import SearchBar from '../components/ui/SearchBar';
import { useDistrict } from '../hooks/useDistrict';
import Spinner from '../components/ui/Spinner';

export default function Home() {
  const { data, loading, error, lookup } = useDistrict();

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">LocalNY</h1>
      <p className="text-gray-500 mb-8">
        Track every level of New York politics — from your school board to the U.S. Senate.
      </p>
      <SearchBar onSearch={lookup} placeholder="Enter your NY address..." />
      {loading && <Spinner />}
      {error && <p className="mt-4 text-red-500 text-sm">{error}</p>}
      {data && (
        <pre className="mt-6 bg-gray-50 p-4 rounded text-xs overflow-auto">
          {JSON.stringify(data, null, 2)}
        </pre>
      )}
    </div>
  );
}