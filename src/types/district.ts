export type DistrictLevel = 
    | 'federal'
    | 'statewide'
    | 'state_legislature'
    | 'nyc'
    | 'metro'
    | 'county'
    | 'local';

export interface District {
    id: string; 
    name: string;
    level: DistrictLevel;
    state: string; 
    county?: string;
    borough?: string;
    number?: number;
}

export interface AddressLookupResult {
    address: string; 
    districts: District[];
}

