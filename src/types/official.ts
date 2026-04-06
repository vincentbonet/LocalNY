export interface Official {
    name: string; 
    party: 'Democrat' | 'Republican' | 'Independent' | 'Working Families' | 'Conservative' | string; 
    district?: string; 
    phone?: string;
    email?: string;
    website?: string;
    photoUrl?: string; 
    socialMedia?: {
        twitter?: string;
        facebook?: string;
    }
}
