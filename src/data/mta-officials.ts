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
      { name: 'TBD',              title: 'Board Member',         appointedBy: 'Governor' },
      { name: 'TBD',              title: 'Board Member',         appointedBy: 'NYC Mayor' },
      { name: 'TBD',              title: 'Board Member',         appointedBy: 'Nassau County' },
      { name: 'TBD',              title: 'Board Member',         appointedBy: 'Suffolk County' },
      { name: 'TBD',              title: 'Board Member',         appointedBy: 'Westchester County' },
      { name: 'TBD',              title: 'Board Member',         appointedBy: 'Rockland County' },
      { name: 'TBD',              title: 'Board Member',         appointedBy: 'Dutchess/Orange/Putnam Counties' },
    ],
  },
  {
    name: 'Port Authority of New York & New Jersey',
    description: 'Operates bridges, tunnels, airports, and PATH train across the NY/NJ metro area.',
    website: 'https://www.panynj.gov',
    officials: [
      { name: 'TBD', title: 'Executive Director',        appointedBy: 'NY & NJ Governors' },
      { name: 'TBD', title: 'Chair (NY)',                appointedBy: 'NY Governor' },
      { name: 'TBD', title: 'Vice Chair (NJ)',           appointedBy: 'NJ Governor' },
      { name: 'TBD', title: 'NY Commissioner',          appointedBy: 'NY Governor' },
      { name: 'TBD', title: 'NY Commissioner',          appointedBy: 'NY Governor' },
      { name: 'TBD', title: 'NY Commissioner',          appointedBy: 'NY Governor' },
      { name: 'TBD', title: 'NJ Commissioner',          appointedBy: 'NJ Governor' },
      { name: 'TBD', title: 'NJ Commissioner',          appointedBy: 'NJ Governor' },
    ],
  },
];
