export interface StatewideOfficial {
  name: string;
  office: string;
  party: string;
  website: string;
}

export const statewideOfficials: StatewideOfficial[] = [
  {
    name: 'Kathy Hochul',
    office: 'Governor',
    party: 'Democratic',
    website: 'https://www.governor.ny.gov',
  },
  {
    name: 'Antonio Delgado',
    office: 'Lieutenant Governor',
    party: 'Democratic',
    website: 'https://www.governor.ny.gov/lt-governor',
  },
  {
    name: 'Letitia James',
    office: 'Attorney General',
    party: 'Democratic',
    website: 'https://ag.ny.gov',
  },
  {
    name: 'Thomas DiNapoli',
    office: 'Comptroller',
    party: 'Democratic',
    website: 'https://www.osc.ny.gov',
  },
];