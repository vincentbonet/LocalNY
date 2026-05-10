export interface Official {
    id?: string;
    name: string;
    party: 'Democrat' | 'Republican' | 'Independent' | 'Working Families' | 'Conservative' | string;
    district?: string;
    phone?: string;
    email?: string;
    website?: string;
    photoUrl?: string;
}
