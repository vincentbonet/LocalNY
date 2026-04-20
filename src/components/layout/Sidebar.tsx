import { NavLink, useLocation } from 'react-router-dom';
import { useEffect } from 'react';

const links = [
  { to: '/', label: 'Home' },
  { to: '/map', label: 'District Map' },
  { to: '/federal', label: 'Federal' },
  { to: '/statewide', label: 'Statewide' },
  { to: '/state-legislature', label: 'State Legislature' },
  { to: '/nyc', label: 'NYC' },
  { to: '/metro', label: 'Metro Area' },
  { to: '/county', label: 'County' },
  { to: '/local', label: 'Local' },
  { to: '/midterm', label: '2026 Midterms' },
];

interface Props {
  open: boolean;
  onClose: () => void;
}

export default function Sidebar({ open, onClose }: Props) {
  const location = useLocation();

  useEffect(() => { onClose(); }, [location.pathname]);

  return (
    <>
      {open && (
        <div
          className="fixed inset-0 bg-black/30 z-20 md:hidden"
          onClick={onClose}
        />
      )}

      <nav className={`
        fixed top-0 left-0 h-full w-48 bg-white border-r border-gray-200 p-4 flex flex-col gap-1 z-30 pt-20
        transform transition-transform duration-200
        md:static md:translate-x-0 md:pt-4 md:z-auto
        ${open ? 'translate-x-0' : '-translate-x-full'}
      `}>
        {links.map(({ to, label }) => (
          <NavLink
            key={to}
            to={to}
            end={to === '/'}
            className={({ isActive }) =>
              `px-3 py-2 rounded text-sm font-medium transition-colors ${
                isActive
                  ? 'bg-gray-900 text-white'
                  : 'text-gray-600 hover:bg-gray-100'
              }`
            }
          >
            {label}
          </NavLink>
        ))}
      </nav>
    </>
  );
}
