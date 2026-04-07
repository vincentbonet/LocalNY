import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
      <Link to="/" className="text-xl font-bold tracking-tight text-gray-900">
        LocalNY
      </Link>
      <span className="text-sm text-gray-500">New York Politics Tracker</span>
    </header>
  );
}