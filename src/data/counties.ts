export type NYRegion =
  | 'New York City'
  | 'Long Island'
  | 'Hudson Valley'
  | 'Capital Region'
  | 'Mohawk Valley'
  | 'North Country'
  | 'Central New York'
  | 'Finger Lakes'
  | 'Southern Tier'
  | 'Western New York';

export interface CountyExecutive {
  name: string;
  title: string;
  party?: string;
  website?: string;
}

export interface County {
  name: string;
  region: NYRegion;
  executive?: CountyExecutive;
  website?: string;
}

export const counties: County[] = [
  // New York City — Borough Presidents
  { name: 'Manhattan',    region: 'New York City', website: 'https://www.manhattanbp.nyc.gov',  executive: { name: 'Mark Levine',       title: 'Borough President', party: 'Democratic' } },
  { name: 'Brooklyn',     region: 'New York City', website: 'https://www.brooklyn-usa.org',     executive: { name: 'Antonio Reynoso',   title: 'Borough President', party: 'Democratic' } },
  { name: 'Queens',       region: 'New York City', website: 'https://queensbp.org',             executive: { name: 'Donovan Richards',  title: 'Borough President', party: 'Democratic' } },
  { name: 'Bronx',        region: 'New York City', website: 'https://bronxboropres.nyc.gov',    executive: { name: 'Vanessa Gibson',    title: 'Borough President', party: 'Democratic' } },
  { name: 'Staten Island',region: 'New York City', website: 'https://statenislandusa.com',      executive: { name: 'Vito Fossella',     title: 'Borough President', party: 'Republican' } },

  // Long Island
  { name: 'Nassau', region: 'Long Island', website: 'https://www.nassaucountyny.gov', executive: { name: 'Bruce Blakeman',   title: 'County Executive', party: 'Republican' } },
  { name: 'Suffolk', region: 'Long Island', website: 'https://www.suffolkcountyny.gov', executive: { name: 'Ed Romaine',       title: 'County Executive', party: 'Republican' } },

  // Hudson Valley
  { name: 'Westchester', region: 'Hudson Valley', website: 'https://westchestergov.com',    executive: { name: 'Ken Jenkins',      title: 'County Executive', party: 'Democratic' } },
  { name: 'Rockland',    region: 'Hudson Valley', website: 'https://www.rocklandgov.com',   executive: { name: 'Ed Day',           title: 'County Executive', party: 'Republican' } },
  { name: 'Orange',      region: 'Hudson Valley', website: 'https://www.orangecountygov.com', executive: { name: 'Steven Neuhaus',  title: 'County Executive', party: 'Republican' } },
  { name: 'Putnam',      region: 'Hudson Valley', website: 'https://www.putnamcountyny.gov', executive: { name: 'Kevin Byrne',     title: 'County Executive', party: 'Republican' } },
  { name: 'Dutchess',    region: 'Hudson Valley', website: 'https://www.dutchessny.gov',    executive: { name: 'Sue Serino',       title: 'County Executive', party: 'Republican' } },
  { name: 'Ulster',      region: 'Hudson Valley', website: 'https://ulstercountyny.gov',    executive: { name: 'Jen Metzger',      title: 'County Executive', party: 'Democratic' } },
  { name: 'Sullivan',    region: 'Hudson Valley', website: 'https://www.sullivanny.us',     executive: { name: 'Rob Doherty',      title: 'County Manager',   party: 'Republican' } },
  { name: 'Columbia',    region: 'Hudson Valley', website: 'https://www.columbiacountyny.com', executive: { name: 'TBD',           title: 'Board of Supervisors' } },
  { name: 'Greene',      region: 'Hudson Valley', website: 'https://www.greenegovernment.com', executive: { name: 'TBD',           title: 'Board of Supervisors' } },

  // Capital Region
  { name: 'Albany',      region: 'Capital Region', website: 'https://www.albanycounty.com',    executive: { name: 'Daniel McCoy',     title: 'County Executive', party: 'Democratic' } },
  { name: 'Rensselaer',  region: 'Capital Region', website: 'https://www.rensco.com',          executive: { name: 'Steve McLaughlin', title: 'County Executive', party: 'Republican' } },
  { name: 'Saratoga',    region: 'Capital Region', website: 'https://www.saratogacountyny.gov', executive: { name: 'TBD',            title: 'County Administrator' } },
  { name: 'Schenectady', region: 'Capital Region', website: 'https://www.schenectadycounty.com', executive: { name: 'TBD',           title: 'County Manager' } },
  { name: 'Columbia',    region: 'Capital Region', website: 'https://www.columbiacountyny.com', executive: { name: 'TBD',            title: 'Board of Supervisors' } },
  { name: 'Greene',      region: 'Capital Region', website: 'https://www.greenegovernment.com', executive: { name: 'TBD',            title: 'Board of Supervisors' } },
  { name: 'Montgomery',  region: 'Capital Region', website: 'https://www.co.montgomery.ny.us', executive: { name: 'TBD',             title: 'Board of Supervisors' } },
  { name: 'Fulton',      region: 'Capital Region', website: 'https://www.fultoncountyny.gov',  executive: { name: 'TBD',             title: 'Board of Supervisors' } },

  // Mohawk Valley
  { name: 'Oneida',    region: 'Mohawk Valley', website: 'https://www.ocgov.net',          executive: { name: 'Anthony Picente Jr.', title: 'County Executive', party: 'Republican' } },
  { name: 'Herkimer',  region: 'Mohawk Valley', website: 'https://www.herkimercounty.org', executive: { name: 'TBD',                 title: 'Board of Legislators' } },
  { name: 'Hamilton',  region: 'Mohawk Valley', website: 'https://www.hamiltoncounty.org', executive: { name: 'TBD',                 title: 'Board of Supervisors' } },
  { name: 'Schoharie', region: 'Mohawk Valley', website: 'https://www.schohariecounty-ny.gov', executive: { name: 'TBD',             title: 'Board of Supervisors' } },
  { name: 'Otsego',    region: 'Mohawk Valley', website: 'https://www.otsegocounty.com',   executive: { name: 'TBD',                 title: 'Board of Representatives' } },

  // North Country
  { name: 'Clinton',     region: 'North Country', website: 'https://www.clintoncountygov.com', executive: { name: 'TBD', title: 'County Manager' } },
  { name: 'Essex',       region: 'North Country', website: 'https://www.co.essex.ny.us',       executive: { name: 'TBD', title: 'Board of Supervisors' } },
  { name: 'Franklin',    region: 'North Country', website: 'https://www.franklincony.org',      executive: { name: 'TBD', title: 'Board of Legislators' } },
  { name: 'Hamilton',    region: 'North Country', website: 'https://www.hamiltoncounty.org',    executive: { name: 'TBD', title: 'Board of Supervisors' } },
  { name: 'Jefferson',   region: 'North Country', website: 'https://www.jeffersoncountyny.gov', executive: { name: 'TBD', title: 'County Administrator' } },
  { name: 'Lewis',       region: 'North Country', website: 'https://www.lewiscountyny.gov',     executive: { name: 'TBD', title: 'Board of Legislators' } },
  { name: 'St. Lawrence',region: 'North Country', website: 'https://www.stlawco.org',           executive: { name: 'TBD', title: 'County Legislature' } },
  { name: 'Warren',      region: 'North Country', website: 'https://www.warrencountyny.gov',    executive: { name: 'TBD', title: 'County Manager' } },
  { name: 'Washington',  region: 'North Country', website: 'https://www.washingtoncountyny.gov', executive: { name: 'TBD', title: 'Board of Supervisors' } },

  // Central New York
  { name: 'Onondaga', region: 'Central New York', website: 'https://www.ongov.net',         executive: { name: 'Ryan McMahon', title: 'County Executive', party: 'Republican' } },
  { name: 'Cayuga',   region: 'Central New York', website: 'https://www.cayugacounty.us',   executive: { name: 'TBD',         title: 'County Legislature' } },
  { name: 'Cortland', region: 'Central New York', website: 'https://www.cortland-co.org',   executive: { name: 'TBD',         title: 'County Legislature' } },
  { name: 'Madison',  region: 'Central New York', website: 'https://www.madisoncounty.ny.gov', executive: { name: 'TBD',      title: 'Board of Supervisors' } },
  { name: 'Oswego',   region: 'Central New York', website: 'https://www.oswegocounty.com',  executive: { name: 'TBD',         title: 'County Legislature' } },

  // Finger Lakes
  { name: 'Monroe',    region: 'Finger Lakes', website: 'https://www.monroecounty.gov',   executive: { name: 'Adam Bello', title: 'County Executive', party: 'Democratic' } },
  { name: 'Chemung',   region: 'Finger Lakes', website: 'https://www.chemungcounty.com',  executive: { name: 'TBD',        title: 'County Executive' } },
  { name: 'Livingston',region: 'Finger Lakes', website: 'https://www.livingstoncounty.us', executive: { name: 'TBD',       title: 'County Administrator' } },
  { name: 'Ontario',   region: 'Finger Lakes', website: 'https://www.co.ontario.ny.us',   executive: { name: 'TBD',        title: 'County Administrator' } },
  { name: 'Schuyler',  region: 'Finger Lakes', website: 'https://www.schuylercounty.us',  executive: { name: 'TBD',        title: 'County Legislature' } },
  { name: 'Seneca',    region: 'Finger Lakes', website: 'https://www.co.seneca.ny.us',    executive: { name: 'TBD',        title: 'County Manager' } },
  { name: 'Steuben',   region: 'Finger Lakes', website: 'https://www.steubencony.org',    executive: { name: 'TBD',        title: 'County Manager' } },
  { name: 'Wayne',     region: 'Finger Lakes', website: 'https://www.co.wayne.ny.us',     executive: { name: 'TBD',        title: 'County Administrator' } },
  { name: 'Yates',     region: 'Finger Lakes', website: 'https://www.yatescounty.org',    executive: { name: 'TBD',        title: 'County Legislature' } },

  // Southern Tier
  { name: 'Broome',    region: 'Southern Tier', website: 'https://www.broomecounty.us',      executive: { name: 'Daniel J. Reynolds', title: 'County Executive', party: 'Republican' } },
  { name: 'Tioga',     region: 'Southern Tier', website: 'https://www.tiogacountyny.gov',    executive: { name: 'TBD',               title: 'County Legislature' } },
  { name: 'Tompkins',  region: 'Southern Tier', website: 'https://www.tompkinscountyny.gov', executive: { name: 'TBD',               title: 'County Administrator' } },
  { name: 'Chenango',  region: 'Southern Tier', website: 'https://www.co.chenango.ny.us',    executive: { name: 'TBD',               title: 'Board of Supervisors' } },
  { name: 'Delaware',  region: 'Southern Tier', website: 'https://www.co.delaware.ny.us',    executive: { name: 'TBD',               title: 'Board of Supervisors' } },

  // Western New York
  { name: 'Erie',        region: 'Western New York', website: 'https://www2.erie.gov',             executive: { name: 'Mark Poloncarz', title: 'County Executive', party: 'Democratic' } },
  { name: 'Chautauqua',  region: 'Western New York', website: 'https://www.chautauquacounty.com',  executive: { name: 'PJ Wendel',      title: 'County Executive', party: 'Republican' } },
  { name: 'Niagara',     region: 'Western New York', website: 'https://www.niagaracounty.com',     executive: { name: 'TBD',            title: 'County Manager' } },
  { name: 'Allegany',    region: 'Western New York', website: 'https://www.alleganyco.com',        executive: { name: 'TBD',            title: 'County Legislature' } },
  { name: 'Cattaraugus', region: 'Western New York', website: 'https://www.cattco.org',            executive: { name: 'TBD',            title: 'County Legislature' } },
  { name: 'Genesee',     region: 'Western New York', website: 'https://www.co.genesee.ny.us',      executive: { name: 'TBD',            title: 'County Manager' } },
  { name: 'Orleans',     region: 'Western New York', website: 'https://www.orleanscountyny.gov',   executive: { name: 'TBD',            title: 'County Legislature' } },
  { name: 'Wyoming',     region: 'Western New York', website: 'https://www.wyomingco.net',         executive: { name: 'TBD',            title: 'County Legislature' } },
];

export const regions: NYRegion[] = [
  'New York City',
  'Long Island',
  'Hudson Valley',
  'Capital Region',
  'Mohawk Valley',
  'North Country',
  'Central New York',
  'Finger Lakes',
  'Southern Tier',
  'Western New York',
];

export function countiesByRegion(region: NYRegion): County[] {
  return counties.filter((c) => c.region === region);
}
