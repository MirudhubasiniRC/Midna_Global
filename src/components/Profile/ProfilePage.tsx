import { useEffect, useRef, useState } from 'react';
import { buttonTokens, colors, metricColors, radius, severityTokens, spacing, typography } from '../../styles/theme';
import { EditProfileModal } from './EditProfileModal';
import { AvatarCropModal } from './AvatarCropModal';

const theme = colors.light;

type ProfilePageProps = {
  onBack: () => void;
};

/** Subscription tiers — billing % pulled from the plan reference table */
type SubscriptionTier = 'Gold' | 'Diamond' | 'Platinum' | 'Ultima';

const subscriptionTiers: Record<SubscriptionTier, { emoji: string; color: string; bg: string; billing: string }> = {
  Gold: { emoji: '🥇', color: severityTokens.medium.text, bg: severityTokens.medium.bg, billing: '30%' },
  Diamond: { emoji: '💎', color: metricColors.blue.text, bg: metricColors.blue.bg, billing: '25%' },
  Platinum: { emoji: '🏆', color: '#475467', bg: theme['bg-muted'], billing: '20%' },
  Ultima: { emoji: '👑', color: metricColors.purple.text, bg: metricColors.purple.bg, billing: '16%' },
};

/** No backend yet — this is the member's current tier, swap when subscriptions are wired up */
const currentTier: SubscriptionTier = 'Diamond';
const tier = subscriptionTiers[currentTier];

/** Status — a distinct color per state so it reads at a glance, not just a label */
type MemberStatus = 'Active' | 'On Hold' | 'Inactive';

const statusTones: Record<MemberStatus, { color: string; bg: string }> = {
  Active: { color: theme.success, bg: theme['success-bg'] },
  'On Hold': { color: theme.warning, bg: theme['warning-bg'] },
  Inactive: { color: theme.error, bg: theme['error-bg'] },
};

/** No backend yet — swap when member status is wired up */
const currentStatus: MemberStatus = 'Active';
const statusTone = statusTones[currentStatus];

type PillProps = {
  label: string;
  color: string;
  bg: string;
  emoji?: string;
  dot?: boolean;
  /** Animated "live" ping ring on the dot, like a YouTube live-analytics indicator */
  pulse?: boolean;
};

function Pill({ label, color, bg, emoji, dot, pulse }: PillProps) {
  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 6,
        fontSize: 12,
        fontWeight: 700,
        color,
        background: bg,
        borderRadius: radius.pill,
        padding: dot ? '6px 12px 6px 10px' : '5px 12px',
        whiteSpace: 'nowrap',
      }}
    >
      {dot && (
        <span
          aria-hidden="true"
          className={pulse ? 'status-dot-ping' : undefined}
          style={{
            position: 'relative',
            width: 7,
            height: 7,
            borderRadius: '50%',
            background: color,
            color,
            flexShrink: 0,
          }}
        />
      )}
      {emoji && <span aria-hidden="true">{emoji}</span>}
      {label}
    </span>
  );
}

type DetailFieldProps = {
  label: string;
  value: React.ReactNode;
};

function DetailField({ label, value }: DetailFieldProps) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: spacing[5],
        padding: `${spacing[4]} 0`,
        borderBottom: `1px solid ${theme.divider}`,
      }}
    >
      <span
        style={{
          fontSize: 13,
          fontWeight: 500,
          color: theme['text-secondary'],
          flexShrink: 0,
        }}
      >
        {label}
      </span>
      <span
        style={{
          fontSize: 14,
          fontWeight: 600,
          color: theme['text-primary'],
          textAlign: 'right',
        }}
      >
        {value}
      </span>
    </div>
  );
}

type DetailSectionProps = {
  title: string;
  children: React.ReactNode;
  onOpen?: () => void;
};

function DetailSection({ title, children, onOpen }: DetailSectionProps) {
  return (
    <button
      type="button"
      className="dash-card profile-tile"
      onClick={onOpen}
      style={{
        textAlign: 'left',
        cursor: 'pointer',
        border: 'none',
        fontFamily: 'inherit',
        width: '100%',
        color: 'inherit',
      }}
    >
      <div className="profile-tile-header">
        <h2 className="profile-tile-title">{title}</h2>
        <span
          aria-hidden="true"
          style={{
            width: 28,
            height: 28,
            borderRadius: '50%',
            background: theme['primary-soft'],
            color: theme.primary,
            display: 'grid',
            placeItems: 'center',
            flexShrink: 0,
          }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M7 17 17 7" />
            <path d="M7 7h10v10" />
          </svg>
        </span>
      </div>
      <div className="detail-list profile-tile-body">{children}</div>
    </button>
  );
}

type LitePopupProps = {
  open: boolean;
  title: string;
  children: React.ReactNode;
  onClose: () => void;
};

function LitePopup({ open, title, children, onClose }: LitePopupProps) {
  if (!open) return null;

  return (
    <div className="modal-overlay profile-lite-overlay" role="presentation" onClick={onClose}>
      <div
        className="profile-lite-popup"
        role="dialog"
        aria-modal="true"
        aria-labelledby="profile-lite-title"
        onClick={(e) => e.stopPropagation()}
      >
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12, marginBottom: spacing[4] }}>
          <div>
            <h2 id="profile-lite-title" style={{ margin: 0, fontSize: 18, fontWeight: 600, color: theme['text-primary'], letterSpacing: '-0.01em' }}>
              {title}
            </h2>
            <p style={{ margin: '4px 0 0', fontSize: 13, color: theme['text-muted'] }}>Quick view</p>
          </div>
          <button type="button" className="btn-icon" aria-label="Close" onClick={onClose} style={{ width: 36, height: 36 }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
              <path d="M18 6 6 18M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="detail-list" style={{ display: 'flex', flexDirection: 'column' }}>
          {children}
        </div>
      </div>
    </div>
  );
}

export function ProfilePage({ onBack }: ProfilePageProps) {
  const [editOpen, setEditOpen] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [pendingImage, setPendingImage] = useState<string | null>(null);
  const [liteSection, setLiteSection] = useState<string | null>(null);
  const avatarInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!liteSection) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setLiteSection(null);
    };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [liteSection]);

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setPendingImage(URL.createObjectURL(file));
    e.target.value = '';
  };

  const closeCropModal = () => {
    if (pendingImage) URL.revokeObjectURL(pendingImage);
    setPendingImage(null);
  };

  const handleCropSave = (dataUrl: string) => {
    setAvatarUrl(dataUrl);
    closeCropModal();
  };

  const personalFields = (
    <>
      <DetailField label="Name" value="Arun Prakash" />
      <DetailField label="Mobile 1" value="+91 98765 43210" />
      <DetailField label="Date of Birth" value="14 Feb 1990" />
      <DetailField label="Country" value="India" />
      <DetailField label="State" value="Tamil Nadu" />
      <DetailField label="Pincode" value="600028" />
      <DetailField label="Address" value="No. 12, Anna Nagar, Chennai" />
    </>
  );

  const membershipFields = (
    <>
      <DetailField label="MID" value="M10048" />
      <DetailField label="Date of Joining" value="03 Jan 2022" />
      <DetailField label="Subscription" value={<Pill label={currentTier} color={tier.color} bg={tier.bg} emoji={tier.emoji} />} />
      <DetailField label="Expiry Date" value="02 Jan 2027" />
      <DetailField label="Billing" value={tier.billing} />
      <DetailField label="Opening Balance" value="₹8,200" />
    </>
  );

  const professionalFields = (
    <>
      <DetailField label="UID" value="MDN-UID-08812" />
      <DetailField label="Services" value="Genetic Counseling, Sample Collection, Report Review" />
      <DetailField label="Availability" value={<Pill label="Full Time" color={metricColors.blue.text} bg={metricColors.blue.bg} />} />
      <DetailField label="Certified" value={<Pill label="Yes" color={theme.success} bg={theme['success-bg']} />} />
      <DetailField label="Certification Date" value="18 Mar 2022" />
    </>
  );

  const visibilityFields = (
    <>
      <DetailField label="MRP Visibility" value={<Pill label="Show" color={theme.success} bg={theme['success-bg']} />} />
      <DetailField label="Branding" value={<Pill label="CBA" color={metricColors.purple.text} bg={metricColors.purple.bg} />} />
      <DetailField label="MIS Training" value={<Pill label="Completed" color={theme.success} bg={theme['success-bg']} />} />
      <DetailField label="Mentored By" value="Rathinaswamy A · 9597770205" />
      <DetailField label="Admin By" value="Priya Shah" />
      <DetailField label="Remarks" value={<span style={{ fontWeight: 400, color: theme['text-muted'], fontStyle: 'italic' }}>No remarks</span>} />
    </>
  );

  const liteContent: Record<string, React.ReactNode> = {
    'Personal Details': personalFields,
    'Membership & Billing': membershipFields,
    'Professional Details': professionalFields,
    'Visibility & Admin': visibilityFields,
  };

  return (
    <section>
      <div style={{ display: 'flex', alignItems: 'center', gap: spacing[3], marginBottom: spacing[6] }}>
        <button type="button" className="btn-icon" aria-label="Back to dashboard" onClick={onBack}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="m15 6-6 6 6 6" />
          </svg>
        </button>
        <div>
          <h1
            style={{
              margin: 0,
              fontSize: typography.roles.pageTitle.fontSize,
              lineHeight: typography.roles.pageTitle.lineHeight,
              fontWeight: typography.roles.pageTitle.fontWeight,
              letterSpacing: typography.roles.pageTitle.letterSpacing,
              color: theme['text-primary'],
            }}
          >
            My Profile
          </h1>
          <p style={{ margin: '6px 0 0', fontSize: 14, color: theme['text-secondary'] }}>
            Manage your certification, mentorship, and billing details.
          </p>
        </div>
      </div>

      {/* Hero card */}
      <div className="dash-card" style={{ marginBottom: spacing[5], padding: spacing[8] }}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: spacing[6],
            flexWrap: 'wrap',
          }}
        >
          <div style={{ position: 'relative', flexShrink: 0 }}>
            <button
              type="button"
              onClick={() => avatarInputRef.current?.click()}
              aria-label="Upload profile picture"
              style={{
                width: 128,
                height: 128,
                borderRadius: '50%',
                background: avatarUrl ? 'transparent' : theme['primary-soft'],
                color: theme.primary,
                display: 'grid',
                placeItems: 'center',
                border: 'none',
                padding: 0,
                cursor: 'pointer',
                overflow: 'hidden',
                boxShadow: 'var(--shadow-float)',
              }}
            >
              {avatarUrl ? (
                <img
                  src={avatarUrl}
                  alt="Profile"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              ) : (
                <svg width="52" height="52" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="8" r="4" />
                  <path d="M4 20c1.5-4 5-6 8-6s6.5 2 8 6" />
                </svg>
              )}
            </button>
            <button
              type="button"
              onClick={() => avatarInputRef.current?.click()}
              aria-label="Change profile picture"
              style={{
                position: 'absolute',
                bottom: 0,
                right: 0,
                width: 38,
                height: 38,
                borderRadius: '50%',
                background: 'var(--btn-primary-gradient)',
                color: '#fff',
                border: `3px solid ${theme['bg-surface']}`,
                display: 'grid',
                placeItems: 'center',
                cursor: 'pointer',
                boxShadow: 'var(--shadow-soft)',
              }}
            >
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2Z" />
                <circle cx="12" cy="13" r="4" />
              </svg>
            </button>
            <input
              ref={avatarInputRef}
              type="file"
              accept="image/*"
              onChange={handleAvatarChange}
              style={{ display: 'none' }}
            />
          </div>

          <div style={{ flex: 1, minWidth: 220 }}>
            <h2
              style={{
                margin: 0,
                fontSize: 26,
                fontWeight: 600,
                color: theme['text-primary'],
                letterSpacing: '-0.025em',
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
              }}
            >
              MiDNA (H.O)
              <span
                title="Certified – Admin"
                aria-label="Verified · Certified Admin"
                style={{
                  width: 22,
                  height: 22,
                  borderRadius: '50%',
                  background: '#3897F0',
                  color: '#fff',
                  display: 'inline-grid',
                  placeItems: 'center',
                  flexShrink: 0,
                  boxShadow: '0 2px 8px rgba(56, 151, 240, 0.35)',
                }}
              >
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M20 6 9 17l-5-5" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            </h2>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap', marginTop: 12 }}>
              <Pill label={currentStatus} color={statusTone.color} bg={statusTone.bg} dot pulse />
              <Pill label={currentTier} color={tier.color} bg={tier.bg} emoji={tier.emoji} />
            </div>
          </div>

          <div className="profile-hero-actions" style={{ display: 'flex', gap: 10 }}>
            <button
              type="button"
              className="btn-pill-primary"
              onClick={() => setEditOpen(true)}
              style={{ height: buttonTokens.height.sm, padding: buttonTokens.padding.sm, fontSize: 13 }}
            >
              Edit profile
            </button>
            <button
              type="button"
              className="btn-pill-secondary"
              style={{ height: buttonTokens.height.sm, padding: buttonTokens.padding.sm, fontSize: 13 }}
            >
              Change password
            </button>
          </div>
        </div>
      </div>

      <div
        className="profile-detail-grid"
        style={{
          marginBottom: spacing[5],
          alignItems: 'stretch',
        }}
      >
        <DetailSection title="Personal Details" onOpen={() => setLiteSection('Personal Details')}>
          {personalFields}
        </DetailSection>

        <DetailSection title="Membership & Billing" onOpen={() => setLiteSection('Membership & Billing')}>
          {membershipFields}
        </DetailSection>

        <DetailSection title="Professional Details" onOpen={() => setLiteSection('Professional Details')}>
          {professionalFields}
        </DetailSection>

        <DetailSection title="Visibility & Admin" onOpen={() => setLiteSection('Visibility & Admin')}>
          {visibilityFields}
        </DetailSection>
      </div>

      {/* Certifications — display only; upload lives in Edit profile */}
      <div className="dash-card">
        <h2 style={{ margin: 0, fontSize: 20, fontWeight: 600, letterSpacing: '-0.01em', color: theme['text-primary'] }}>
          Certifications
        </h2>
        <p style={{ margin: '6px 0 0', fontSize: 14, lineHeight: 1.55, color: theme['text-secondary'], maxWidth: 560 }}>
          Your uploaded certificates appear here.
        </p>

        <div
          style={{
            marginTop: spacing[5],
            border: 'none',
            borderRadius: radius.lg,
            padding: spacing[8],
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 8,
            color: theme['text-muted'],
            background: theme['bg-muted'],
            minHeight: 160,
          }}
        >
          <div
            style={{
              width: 48,
              height: 48,
              borderRadius: '50%',
              background: theme['bg-surface'],
              display: 'grid',
              placeItems: 'center',
              color: theme.primary,
              boxShadow: 'var(--shadow-float)',
            }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="3" width="18" height="18" rx="3" />
              <circle cx="9" cy="9" r="2" />
              <path d="m21 15-5-5L5 21" />
            </svg>
          </div>
          <span style={{ fontSize: 13, fontStyle: 'italic' }}>No certifications added yet.</span>
        </div>
      </div>

      <EditProfileModal open={editOpen} onClose={() => setEditOpen(false)} />

      <LitePopup
        open={Boolean(liteSection)}
        title={liteSection ?? ''}
        onClose={() => setLiteSection(null)}
      >
        {liteSection ? liteContent[liteSection] : null}
      </LitePopup>

      {pendingImage && (
        <AvatarCropModal imageSrc={pendingImage} onCancel={closeCropModal} onSave={handleCropSave} />
      )}
    </section>
  );
}
