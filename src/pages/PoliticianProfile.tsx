import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { fetchPersonProfile, fetchPersonBills } from '../lib/api';
import Badge from '../components/ui/Badge';
import Spinner from '../components/ui/Spinner';
import { usePageTitle } from '../hooks/usePageTitle';

export default function PoliticianProfile() {
  const { id } = useParams<{ id: string }>();
  const personId = decodeURIComponent(id ?? '');

  const { data: profile, isLoading, error } = useQuery({
    queryKey: ['person', personId],
    queryFn: () => fetchPersonProfile(personId),
    enabled: !!personId,
  });

  const { data: bills = [], isLoading: billsLoading } = useQuery({
    queryKey: ['person-bills', personId],
    queryFn: () => fetchPersonBills(personId),
    enabled: !!personId,
    retry: false,
  });

  usePageTitle(profile?.name ?? 'Politician Profile');

  if (isLoading) return <div className="max-w-2xl mx-auto mt-8"><Spinner /></div>;
  if (error || !profile) return (
    <div className="max-w-2xl mx-auto mt-8">
      <p className="text-red-500 text-sm">Could not load profile.</p>
      <Link to="/" className="text-sm text-blue-600 hover:underline mt-2 block">← Back</Link>
    </div>
  );

  const chamberLabel = profile.chamber === 'upper' ? 'Senate' : profile.chamber === 'lower' ? 'House / Assembly' : profile.chamber;

  return (
    <div className="max-w-2xl mx-auto">
      <Link to={-1 as any} className="text-sm text-gray-400 hover:text-gray-600 mb-6 inline-block">← Back</Link>

      {/* Header */}
      <div className="flex items-start gap-5 mb-8">
        {profile.photoUrl ? (
          <img src={profile.photoUrl} alt={profile.name} className="w-24 h-24 rounded-full object-cover flex-shrink-0 border border-gray-200" />
        ) : (
          <div className="w-24 h-24 rounded-full bg-gray-100 flex items-center justify-center text-2xl font-bold text-gray-400 flex-shrink-0">
            {profile.name.charAt(0)}
          </div>
        )}
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{profile.name}</h1>
          <p className="text-gray-500 text-sm mt-0.5">{profile.title}{profile.district ? ` — District ${profile.district}` : ''}</p>
          <p className="text-gray-400 text-xs mt-0.5">{profile.jurisdiction} · {chamberLabel}</p>
          <div className="mt-2">
            <Badge party={profile.party} />
          </div>
        </div>
      </div>

      {/* Contact */}
      <section className="mb-8">
        <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">Contact & Links</h2>
        <div className="flex flex-wrap gap-2">
          {profile.website && (
            <a href={profile.website} target="_blank" rel="noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-gray-200 text-sm text-gray-700 hover:bg-gray-50 transition-colors">
              🌐 Website
            </a>
          )}
          {profile.email && (
            <a href={`mailto:${profile.email}`}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-gray-200 text-sm text-gray-700 hover:bg-gray-50 transition-colors">
              ✉️ Email
            </a>
          )}
          {profile.twitter && (
            <a href={`https://twitter.com/${profile.twitter}`} target="_blank" rel="noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-gray-200 text-sm text-gray-700 hover:bg-gray-50 transition-colors">
              𝕏 @{profile.twitter}
            </a>
          )}
          {profile.links.slice(1).map((link, i) => (
            link.url && link.note && (
              <a key={i} href={link.url} target="_blank" rel="noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-gray-200 text-sm text-gray-700 hover:bg-gray-50 transition-colors">
                {link.note}
              </a>
            )
          ))}
        </div>
      </section>

      {/* Recent Bills */}
      <section>
        <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">Recent Sponsored Bills</h2>
        {billsLoading && <Spinner />}
        {!billsLoading && bills.length === 0 && (
          <p className="text-sm text-gray-400">No recent bills found.</p>
        )}
        {bills.length > 0 && (
          <div className="flex flex-col gap-2">
            {bills.map((bill) => (
              <div key={bill.id} className="border border-gray-200 rounded-lg p-3 hover:bg-gray-50 transition-colors">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1">
                    <span className="text-xs font-mono text-gray-400 mr-2">{bill.identifier}</span>
                    <span className="text-sm text-gray-800">{bill.title}</span>
                    {bill.status && (
                      <p className="text-xs text-gray-400 mt-1">{bill.status}</p>
                    )}
                  </div>
                  {bill.url && (
                    <a href={bill.url} target="_blank" rel="noreferrer"
                      className="text-xs text-blue-600 hover:underline flex-shrink-0">
                      View →
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
