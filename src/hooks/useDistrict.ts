import { useState } from 'react';
import { lookupByAddress } from '../lib/api';

export function useDistrict(){ 
    const [data, setData] = useState<any>(null); 
    const [loading, setLoading] = useState<any>(false);
    const [error, setError] = useState<string | null>(null); 

    async function lookup(address: string) {
        setLoading(true); 
        setError(null);
        try{ 
            const result = await lookupByAddress(address);
            setData(result);
        } catch (e : any) {
            setError(e.message ?? 'Lookup failed');
        } finally {
            setLoading(false); 
        }
    }

    return { data, loading, error, lookup};
}