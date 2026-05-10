import { useParams, Link, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { fetchPersonProfile, fetchPersonBills } from '../lib/api';
import Badge from '../components/ui/Badge';
import Spinner from '../components/ui/Spinner';
import { usePageTitle } from '../hooks/usePageTitle';
import { Globe, Mail, ExternalLink, ArrowLeft, ChevronRight } from 'lucide-react';

export default function PoliticianProfile() {
  const { id } = useParams<{ id: string }>();
  const personId = decodeURIComponent(id ?? '');
  const navigate = useNavigate();

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

  const chamberLabel =
    profile.chamber === 'upper' ? 'Senate' :
    profile.chamber === 'lower' ? 'House / Assembly' :
    profile.chamber;

  const extraLinks = profile.links.slice(1).filter((l) => l.url && l.note);

  return (
    <div className="max-w-2xl mx-auto">
      <button
        onClick={() => navigate(-1)}
        className="inline-flex items-center gap-1 text-sm text-gray-400 hover:text-gray-700 mb-6 transition-colors"
      >
        <ArrowLeft size={14} />
        Back
      </button>

      {/* Header */}
      <div className="flex items-start gap-5 mb-8 p-5 border border-gray-200 rounded-xl bg-white shadow-sm">
        {profile.photoUrl ? (
          <img
            src={profile.photoUrl}
            alt={profile.name}
            className="w-20 h-20 rounded-full object-cover flex-shrink-0 border border-gray-200 shadow-sm"
          />
        ) : (
          <div className="w-20 h-20 rounded-full bg-gray-100 border border-gray-200 flex items-center justify-center text-2xl font-bold text-gray-400 flex-shrink-0">
            {profile.name.charAt(0)}
          </div>
        )}
        <div className="min-w-0">
          <h1 className="text-xl font-bold text-gray-900 leading-tight">{profile.name}</h1>
          <p className="text-gray-500 text-sm mt-0.5">
            {profile.title}{profile.district ? ` — District ${profile.district}` : ''}
          </p>
          <p className="text-gray-400 text-xs mt-0.5">{profile.jurisdiction} · {chamberLabel}</p>
          <div className="mt-2">
            <Badge party={profile.party} />
          </div>
        </div>
      </div>

      {/* Contact */}
      {(profile.website || profile.email || profile.twitter || extraLinks.length > 0) && (
        <section className="mb-8">
          <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Contact &amp; Links</h2>
          <div className="flex flex-wrap gap-2">
            {profile.website && (
              <a
                href={profile.website}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-gray-200 text-sm text-gray-700 hover:bg-gray-50 hover:border-gray-300 transition-colors"
              >
                <Globe size={13} className="text-gray-400" />
                Website
              </a>
            )}
            {profile.email && (
              <a
                href={`mailto:${profile.email}`}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-gray-200 text-sm text-gray-700 hover:bg-gray-50 hover:border-gray-300 transition-colors"
              >
                <Mail size={13} className="text-gray-400" />
                Email
              </a>
            )}
            {profile.twitter && (
              <a
                href={`https://twitter.com/${profile.twitter}`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-gray-200 text-sm text-gray-700 hover:bg-gray-50 hover:border-gray-300 transition-colors"
              >
                <span className="text-gray-400 font-bold text-xs">X</span>
                @{profile.twitter}
              </a>
            )}
            {extraLinks.map((link, i) => (
              <a
                key={i}
                href={link.url}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-gray-200 text-sm text-gray-700 hover:bg-gray-50 hover:border-gray-300 transition-colors"
              >
                <ExternalLink size={13} className="text-gray-400" />
                {link.note}
              </a>
            ))}
          </div>
        </section>
      )}

      {/* Recent Bills */}
      <section>
        <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Recent Sponsored Bills</h2>
        {billsLoading && <Spinner />}
        {!billsLoading && bills.length === 0 && (
          <p className="text-sm text-gray-400">No recent bills found.</p>
        )}
        {bills.length > 0 && (
          <div className="flex flex-col gap-2">
            {bills.map((bill) => (
              <div key={bill.id} className="border border-gray-200 rounded-lg p-3 hover:bg-gray-50 transition-colors">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <span className="text-xs font-mono text-gray-400 mr-2">{bill.identifier}</span>
                    <span className="text-sm text-gray-800">{bill.title}</span>
                    {bill.status && (
                      <p className="text-xs text-gray-400 mt-1">{bill.status}</p>
                    )}
                  </div>
                  {bill.url && (
                    <a
                      href={bill.url}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-0.5 text-xs text-blue-600 hover:text-blue-800 flex-shrink-0 transition-colors"
                    >
                      View <ChevronRight size={11} />
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
