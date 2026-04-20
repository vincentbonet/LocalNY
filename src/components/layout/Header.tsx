import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

interface Props {
  onMenuToggle: () => void;
  menuOpen: boolean;
}

export default function Header({ onMenuToggle, menuOpen }: Props) {
  return (
    <header className="bg-gray-900 px-6 py-3.5 flex items-center justify-between shrink-0">
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuToggle}
          className="md:hidden p-1.5 rounded text-gray-400 hover:bg-gray-800 transition-colors"
          aria-label="Toggle menu"
        >
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
        <Link to="/" className="text-lg font-bold tracking-tight text-white">
          LocalNY
        </Link>
        <span className="hidden sm:block text-gray-600 text-sm select-none">|</span>
        <span className="hidden sm:block text-gray-400 text-sm">New York Politics</span>
      </div>
      <span className="text-xs font-medium text-gray-500 hidden sm:block uppercase tracking-wider">2026 Elections</span>
    </header>
  );
}
