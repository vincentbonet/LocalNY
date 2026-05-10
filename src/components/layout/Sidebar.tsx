import { NavLink, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { Home, Map, Flag, Landmark, Building2, Building, Train, MapPin, CalendarDays } from 'lucide-react';

const sections = [
  {
    label: null,
    links: [
      { to: '/', label: 'Home', icon: Home },
      { to: '/map', label: 'District Map', icon: Map },
    ],
  },
  {
    label: 'Officials',
    links: [
      { to: '/federal', label: 'Federal', icon: Flag },
      { to: '/statewide', label: 'Statewide', icon: Landmark },
      { to: '/state-legislature', label: 'State Legislature', icon: Building2 },
      { to: '/nyc', label: 'NYC Council', icon: Building },
      { to: '/metro', label: 'Metro Agencies', icon: Train },
      { to: '/county', label: 'County', icon: MapPin },
    ],
  },
  {
    label: 'Elections',
    links: [
      { to: '/midterm', label: '2026 Midterms', icon: CalendarDays },
    ],
  },
];

interface Props {
  open: boolean;
  onClose: () => void;
}

export default function Sidebar({ open, onClose }: Props) {
  const location = useLocation();

  useEffect(() => {
    onClose();
  }, [location.pathname, onClose]);

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
              {section.links.map(({ to, label, icon: Icon }) => (
                <NavLink
                  key={to}
                  to={to}
                  end={to === '/'}
                  className={({ isActive }) =>
                    `flex items-center gap-2.5 px-3 py-2 rounded text-sm font-medium transition-colors ${
                      isActive
                        ? 'bg-gray-900 text-white'
                        : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      <Icon size={15} className={isActive ? 'text-white' : 'text-gray-400'} />
                      {label}
                    </>
                  )}
                </NavLink>
              ))}
            </div>
          </div>
        ))}
      </nav>
    </>
  );
}
