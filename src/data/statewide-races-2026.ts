import type { Race } from '../types/race';

export const statewideRaces2026: Race[] = [
  {
    id: 'ny-us-senate',
    office: 'U.S. Senate',
    level: 'federal',
    status: 'upcoming',
    electionDate: '2026-11-03',
    candidates: [
      { name: 'Kirsten Gillibrand', party: 'Democrat', incumbent: true },
      { name: 'TBD', party: 'Unknown', incumbent: false },
    ],
  },
  {
    id: 'ny-governor',
    office: 'Governor',
    level: 'statewide',
    status: 'upcoming',
    electionDate: '2026-11-03',
    candidates: [
      { name: 'Kathy Hochul', party: 'Democrat', incumbent: true },
      { name: 'TBD', party: 'Unknown', incumbent: false },
    ],
  },
  {
    id: 'ny-lt-governor',
    office: 'Lieutenant Governor',
    level: 'statewide',
    status: 'upcoming',
    electionDate: '2026-11-03',
    candidates: [
      { name: 'Antonio Delgado', party: 'Democrat', incumbent: true },
      { name: 'TBD', party: 'Unknown', incumbent: false },
    ],
  },
  {
    id: 'ny-ag',
    office: 'Attorney General',
    level: 'statewide',
    status: 'upcoming',
    electionDate: '2026-11-03',
    candidates: [
      { name: 'Letitia James', party: 'Democrat', incumbent: true },
      { name: 'TBD', party: 'Unknown', incumbent: false },
    ],
  },
  {
    id: 'ny-comptroller',
    office: 'State Comptroller',
    level: 'statewide',
    status: 'upcoming',
    electionDate: '2026-11-03',
    candidates: [
      { name: 'Tom DiNapoli', party: 'Democrat', incumbent: true },
      { name: 'TBD', party: 'Unknown', incumbent: false },
    ],
  },
];
