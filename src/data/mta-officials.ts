export interface MetroOfficial {
  name: string;
  title: string;
  appointedBy?: string;
  website?: string;
}

export interface MetroAgency {
  name: string;
  description: string;
  website: string;
  officials: MetroOfficial[];
}

export const metroAgencies: MetroAgency[] = [
  {
    name: 'Metropolitan Transportation Authority (MTA)',
    description: 'Oversees NYC subway, buses, Metro-North, and LIRR.',
    website: 'https://www.mta.info',
    officials: [
      { name: 'Janno Lieber',     title: 'Chair & CEO',          appointedBy: 'Governor' },
      { name: 'See mta.info/about/board', title: 'Board Members — 14 seats', appointedBy: 'Governor, NYC Mayor, and suburban county executives' },
    ],
  },
  {
    name: 'Port Authority of New York & New Jersey',
    description: 'Operates bridges, tunnels, airports, and PATH train across the NY/NJ metro area.',
    website: 'https://www.panynj.gov',
    officials: [
      { name: 'Kathyrn Garcia', title: 'Executive Director',        appointedBy: 'NY & NJ Governors' },
      { name: 'Kevin O\'Toole', title: 'Chair (NY)',                appointedBy: 'NY Governor' },
      { name: 'TBD', title: 'Vice Chair (NJ)',           appointedBy: 'NJ Governor' },
      { name: 'TBD', title: 'NY Commissioner',          appointedBy: 'NY Governor' },
      { name: 'TBD', title: 'NY Commissioner',          appointedBy: 'NY Governor' },
      { name: 'TBD', title: 'NY Commissioner',          appointedBy: 'NY Governor' },
      { name: 'TBD', title: 'NJ Commissioner',          appointedBy: 'NJ Governor' },
      { name: 'TBD', title: 'NJ Commissioner',          appointedBy: 'NJ Governor' },
    ],
  },
];
