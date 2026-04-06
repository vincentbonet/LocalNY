import type { Official } from './official';

export type RaceStatus = 'upcoming' | 'active' | 'certified';

export interface Candidate {
  name: string;
  party: string;
  incumbent: boolean;
  website?: string;
  photoUrl?: string;
}

export interface Race {
  id: string;
  office: string;
  district?: string;
  level: string;
  status: RaceStatus;
  electionDate: string;
  candidates: Candidate[];
  currentHolder?: Official;
}