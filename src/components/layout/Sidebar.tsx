import { NavLink, useLocation } from 'react-router-dom';
import { useEffect } from 'react';

const sections = [
  {
    label: null,
    links: [
      { to: '/', label: 'Home' },
      { to: '/map', label: 'District Map' },
    ],
  },
  {
    label: 'Officials',
    links: [
      { to: '/federal', label: 'Federal' },
      { to: '/statewide', label: 'Statewide' },
      { to: '/state-legislature', label: 'State Legislature' },
      { to: '/nyc', label: 'NYC Council' },
      { to: '/metro', label: 'Metro Agencies' },
      { to: '/county', label: 'County' },
      { to: '/local', label: 'Local' },
    ],
  },
  {
    label: 'Elections',
    links: [
      { to: '/midterm', label: '2026 Midterms' },
    ],
  },
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
        fixed top-0 left-0 h-full w-52 bg-white border-r border-gray-200 p-4 flex flex-col gap-4 z-30 pt-20 overflow-y-auto
        transform transition-transform duration-200
        md:static md:translate-x-0 md:pt-4 md:z-auto
        ${open ? 'translate-x-0' : '-translate-x-full'}
      `}>
        {sections.map((section, i) => (
          <div key={i}>
            {section.label && (
              <p className="px-3 mb-1 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                {section.label}
              </p>
            )}
            <div className="flex flex-col gap-0.5">
              {section.links.map(({ to, label }) => (
                <NavLink
                  key={to}
                  to={to}
                  end={to === '/'}
                  className={({ isActive }) =>
                    `px-3 py-2 rounded text-sm font-medium transition-colors ${
                      isActive
                        ? 'bg-gray-900 text-white'
                        : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                    }`
                  }
                >
                  {label}
                </NavLink>
              ))}
            </div>
          </div>
        ))}
      </nav>
    </>
  );
}
