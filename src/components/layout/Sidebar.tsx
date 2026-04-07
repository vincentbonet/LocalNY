import { NavLink } from 'react-router-dom';

const links = [
  { to: '/', label: 'Home' },
  { to: '/federal', label: 'Federal' },
  { to: '/statewide', label: 'Statewide' },
  { to: '/state-legislature', label: 'State Legislature' },
  { to: '/nyc', label: 'NYC' },
  { to: '/metro', label: 'Metro Area' },
  { to: '/county', label: 'County' },
  { to: '/local', label: 'Local' },
  { to: '/midterm', label: '2026 Midterms' },
];

export default function Sidebar() {
  return (
    <nav className="w-48 border-r border-gray-200 p-4 flex flex-col gap-1">
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
  );
}