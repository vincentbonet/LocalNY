import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

interface Props {
  onMenuToggle: () => void;
  menuOpen: boolean;
}

export default function Header({ onMenuToggle, menuOpen }: Props) {
  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuToggle}
          className="md:hidden p-1 rounded text-gray-500 hover:bg-gray-100"
          aria-label="Toggle menu"
        >
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
        <Link to="/" className="text-xl font-bold tracking-tight text-gray-900">
          LocalNY
        </Link>
      </div>
      <span className="text-sm text-gray-500 hidden sm:block">New York Politics Tracker</span>
    </header>
  );
}
