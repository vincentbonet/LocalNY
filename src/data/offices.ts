import type { DistrictLevel } from '../types/district';

export interface OfficeDef {
  id: string;
  title: string;
  level: DistrictLevel;
  seats: number;
  termYears: number;
  description: string;
}

export const offices: OfficeDef[] = [
  { id: 'us_senate', title: 'U.S. Senate', level: 'federal', seats: 2, termYears: 6, description: 'New York\'s two seats in the U.S. Senate' },
  { id: 'us_house', title: 'U.S. House of Representatives', level: 'federal', seats: 26, termYears: 2, description: '26 congressional districts across NY' },

  { id: 'governor', title: 'Governor', level: 'statewide', seats: 1, termYears: 4, description: 'Chief executive of New York State' },
  { id: 'lt_governor', title: 'Lieutenant Governor', level: 'statewide', seats: 1, termYears: 4, description: 'Second-in-command to the Governor' },
  { id: 'attorney_general', title: 'Attorney General', level: 'statewide', seats: 1, termYears: 4, description: 'Chief law enforcement officer of NY' },
  { id: 'comptroller', title: 'State Comptroller', level: 'statewide', seats: 1, termYears: 4, description: 'Chief fiscal officer of New York State' },

  { id: 'ny_senate', title: 'NY State Senate', level: 'state_legislature', seats: 63, termYears: 2, description: '63 districts across New York State' },
  { id: 'ny_assembly', title: 'NY State Assembly', level: 'state_legislature', seats: 150, termYears: 2, description: '150 districts across New York State' },

  { id: 'court_of_appeals', title: 'Court of Appeals', level: 'statewide', seats: 7, termYears: 14, description: 'NY\'s highest court' },

  { id: 'nyc_mayor', title: 'Mayor of New York City', level: 'nyc', seats: 1, termYears: 4, description: 'Chief executive of New York City' },
  { id: 'nyc_comptroller', title: 'NYC Comptroller', level: 'nyc', seats: 1, termYears: 4, description: 'Fiscal officer of New York City' },
  { id: 'nyc_public_advocate', title: 'NYC Public Advocate', level: 'nyc', seats: 1, termYears: 4, description: 'Ombudsman for NYC residents' },
  { id: 'borough_president', title: 'Borough President', level: 'nyc', seats: 5, termYears: 4, description: 'Elected head of each of the 5 boroughs' },
  { id: 'city_council', title: 'NYC City Council', level: 'nyc', seats: 51, termYears: 4, description: '51 council districts across the 5 boroughs' },
  { id: 'district_attorney', title: 'District Attorney', level: 'nyc', seats: 5, termYears: 4, description: 'One DA per borough' },

  { id: 'nassau_exec', title: 'Nassau County Executive', level: 'metro', seats: 1, termYears: 4, description: '' },
  { id: 'suffolk_exec', title: 'Suffolk County Executive', level: 'metro', seats: 1, termYears: 4, description: '' },
  { id: 'westchester_exec', title: 'Westchester County Executive', level: 'metro', seats: 1, termYears: 4, description: '' },
  { id: 'rockland_exec', title: 'Rockland County Executive', level: 'metro', seats: 1, termYears: 4, description: '' },

  { id: 'county_executive', title: 'County Executive', level: 'county', seats: 1, termYears: 4, description: 'Chief executive of the county' },
  { id: 'county_legislature', title: 'County Legislature', level: 'county', seats: 0, termYears: 4, description: 'Varies by county' },

  { id: 'town_supervisor', title: 'Town Supervisor', level: 'local', seats: 1, termYears: 2, description: 'Elected head of a NY town' },
  { id: 'village_mayor', title: 'Village Mayor', level: 'local', seats: 1, termYears: 2, description: 'Elected head of a NY village' },
  { id: 'school_board', title: 'School Board', level: 'local', seats: 0, termYears: 3, description: 'Varies by district' },
];

export const officesByLevel = (level: DistrictLevel) =>
  offices.filter((o) => o.level === level);