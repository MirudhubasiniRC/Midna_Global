import { useState } from 'react';
import { buttonTokens, colors, radius, spacing } from '../../styles/theme';
import { EditProfileModal } from './EditProfileModal';

const theme = colors.light;

type ProfilePageProps = {
  onBack: () => void;
};

type MetaRow = {
  label: string;
  value: string;
  icon: React.ReactNode;
};

const metaRows: MetaRow[] = [
  {
    label: 'Your MID',
    value: 'M10048',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <path d="M3 9h18" />
        <path d="M7 14h4" />
      </svg>
    ),
  },
  {
    label: 'Your Mentor',
    value: 'Rathinaswamy A · 9597770205',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="8" r="4" />
        <path d="M4 20c1.5-4 5-6 8-6s6.5 2 8 6" />
      </svg>
    ),
  },
  {
    label: 'Your Billing',
    value: '40% · SRC — YES',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="6" width="20" height="14" rx="2.5" />
        <path d="M2 11h20" />
      </svg>
    ),
  },
];

export function ProfilePage({ onBack }: ProfilePageProps) {
  const [editOpen, setEditOpen] = useState(false);

  return (
    <section>
      <div style={{ display: 'flex', alignItems: 'center', gap: spacing[3], marginBottom: spacing[5] }}>
        <button type="button" className="btn-icon" aria-label="Back to dashboard" onClick={onBack}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="m15 6-6 6 6 6" />
          </svg>
        </button>
        <div>
          <h1 style={{ margin: 0, fontSize: 28, fontWeight: 700, letterSpacing: '-0.03em', color: theme['text-primary'] }}>
            My Profile
          </h1>
          <p style={{ margin: '4px 0 0', fontSize: 13, color: theme['text-muted'] }}>
            Manage your certification, mentorship, and billing details.
          </p>
        </div>
      </div>

      {/* Hero card */}
      <div className="dash-card" style={{ marginBottom: spacing[5] }}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: spacing[5],
            flexWrap: 'wrap',
          }}
        >
          <div
            style={{
              width: 64,
              height: 64,
              borderRadius: '50%',
              background: theme['primary-soft'],
              color: theme.primary,
              display: 'grid',
              placeItems: 'center',
              flexShrink: 0,
            }}
          >
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="8" r="4" />
              <path d="M4 20c1.5-4 5-6 8-6s6.5 2 8 6" />
            </svg>
          </div>

          <div style={{ flex: 1, minWidth: 220 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
              <h2 style={{ margin: 0, fontSize: 20, fontWeight: 700, color: theme['text-primary'], letterSpacing: '-0.02em' }}>
                MiDNA (H.O)
              </h2>
              <span
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 5,
                  fontSize: 12,
                  fontWeight: 600,
                  color: theme.primary,
                  background: theme['primary-soft'],
                  borderRadius: radius.pill,
                  padding: '4px 10px 4px 8px',
                }}
              >
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 12l2 2 4-4" />
                  <circle cx="12" cy="12" r="9" />
                </svg>
                Certified – Admin
              </span>
            </div>
          </div>

          <div style={{ display: 'flex', gap: 10 }}>
            <button
              type="button"
              onClick={() => setEditOpen(true)}
              style={{
                height: buttonTokens.height.sm,
                padding: buttonTokens.padding.sm,
                borderRadius: radius.pill,
                border: 'none',
                background: theme['btn-primary-bg'],
                color: theme['btn-primary-text'],
                fontSize: 13,
                fontWeight: 600,
                cursor: 'pointer',
              }}
            >
              Edit profile
            </button>
            <button
              type="button"
              style={{
                height: buttonTokens.height.sm,
                padding: buttonTokens.padding.sm,
                borderRadius: radius.pill,
                border: `1px solid ${theme['btn-secondary-border']}`,
                background: theme['btn-secondary-bg'],
                color: theme['btn-secondary-text'],
                fontSize: 13,
                fontWeight: 600,
                cursor: 'pointer',
              }}
            >
              Change password
            </button>
          </div>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: spacing[3],
            marginTop: spacing[5],
            paddingTop: spacing[5],
            borderTop: `1px solid ${theme.divider}`,
          }}
        >
          {metaRows.map((row) => (
            <div key={row.label} style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
              <span
                style={{
                  width: 30,
                  height: 30,
                  borderRadius: radius.sm,
                  background: theme['bg-canvas'],
                  color: theme.primary,
                  display: 'grid',
                  placeItems: 'center',
                  flexShrink: 0,
                }}
              >
                {row.icon}
              </span>
              <div>
                <div style={{ fontSize: 11, fontWeight: 600, color: theme['text-muted'], letterSpacing: '0.04em' }}>
                  {row.label}
                </div>
                <div style={{ fontSize: 14, fontWeight: 600, color: theme['text-primary'], marginTop: 2 }}>
                  {row.value}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Certifications card */}
      <div className="dash-card">
        <h2 style={{ margin: 0, fontSize: 22, fontWeight: 700, letterSpacing: '-0.01em', color: theme['text-primary'] }}>
          Certifications
        </h2>
        <p style={{ margin: '6px 0 0', fontSize: 14, lineHeight: 1.55, color: theme['text-secondary'], maxWidth: 560 }}>
          Upload images of your certifications. Previews appear below; connect a backend when you are ready to save
          them.
        </p>

        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginTop: spacing[4], flexWrap: 'wrap' }}>
          <button
            type="button"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              height: buttonTokens.height.sm,
              padding: buttonTokens.padding.sm,
              borderRadius: radius.pill,
              border: `1px solid ${theme['btn-secondary-border']}`,
              background: theme['btn-secondary-bg'],
              color: theme['btn-secondary-text'],
              fontSize: 13,
              fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 16V4" />
              <path d="m6 10 6-6 6 6" />
              <path d="M4 20h16" />
            </svg>
            Add certification
          </button>
          <span style={{ fontSize: 12, color: theme['text-muted'] }}>PNG, JPG, or WebP</span>
        </div>

        <div
          style={{
            marginTop: spacing[5],
            border: `1.5px dashed ${theme.border}`,
            borderRadius: radius.md,
            padding: spacing[6],
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 8,
            color: theme['text-muted'],
          }}
        >
          <div
            style={{
              width: 40,
              height: 40,
              borderRadius: '50%',
              background: theme['bg-canvas'],
              display: 'grid',
              placeItems: 'center',
              color: theme['text-muted'],
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="3" width="18" height="18" rx="3" />
              <circle cx="9" cy="9" r="2" />
              <path d="m21 15-5-5L5 21" />
            </svg>
          </div>
          <span style={{ fontSize: 13, fontStyle: 'italic' }}>No certifications added yet.</span>
        </div>
      </div>

      <EditProfileModal open={editOpen} onClose={() => setEditOpen(false)} />
    </section>
  );
}
