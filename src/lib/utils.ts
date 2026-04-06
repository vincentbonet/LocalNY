export function partyColor(party: string): string {
  const p = party.toLowerCase();
  if (p.includes('democrat')) return '#1a6fbc';
  if (p.includes('republican')) return '#c0392b';
  if (p.includes('working families')) return '#e67e22';
  if (p.includes('conservative')) return '#8e44ad';
  return '#555';
}

export function partyShort(party: string): string {
  const p = party.toLowerCase();
  if (p.includes('democrat')) return 'D';
  if (p.includes('republican')) return 'R';
  if (p.includes('working families')) return 'WF';
  if (p.includes('conservative')) return 'C';
  if (p.includes('independent')) return 'I';
  return '?';
}

export function formatElectionDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}