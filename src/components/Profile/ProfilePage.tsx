import { useRef, useState } from 'react';
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

type PillProps = {
  label: string;
  color: string;
  bg: string;
  emoji?: string;
};

function Pill({ label, color, bg, emoji }: PillProps) {
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
        padding: '5px 12px',
        whiteSpace: 'nowrap',
      }}
    >
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
    <div>
      <div
        style={{
          fontSize: 11,
          fontWeight: 600,
          color: theme['text-muted'],
          letterSpacing: '0.04em',
          textTransform: 'uppercase',
        }}
      >
        {label}
      </div>
      <div style={{ fontSize: 14, fontWeight: 600, color: theme['text-primary'], marginTop: 4 }}>{value}</div>
    </div>
  );
}

type DetailSectionProps = {
  title: string;
  children: React.ReactNode;
};

function DetailSection({ title, children }: DetailSectionProps) {
  return (
    <div className="dash-card" style={{ marginBottom: spacing[5] }}>
      <h2 style={{ margin: 0, fontSize: 18, fontWeight: 700, letterSpacing: '-0.01em', color: theme['text-primary'] }}>
        {title}
      </h2>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
          gap: spacing[4],
          marginTop: spacing[4],
        }}
      >
        {children}
      </div>
    </div>
  );
}

export function ProfilePage({ onBack }: ProfilePageProps) {
  const [editOpen, setEditOpen] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [pendingImage, setPendingImage] = useState<string | null>(null);
  const avatarInputRef = useRef<HTMLInputElement>(null);

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

  return (
    <section>
      <div style={{ display: 'flex', alignItems: 'center', gap: spacing[3], marginBottom: spacing[5] }}>
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
                background: theme.primary,
                color: '#fff',
                border: `3px solid ${theme['bg-surface']}`,
                display: 'grid',
                placeItems: 'center',
                cursor: 'pointer',
                boxShadow: '0 4px 10px rgba(22, 26, 46, 0.18)',
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
            <h2 style={{ margin: 0, fontSize: 26, fontWeight: 700, color: theme['text-primary'], letterSpacing: '-0.02em' }}>
              MiDNA (H.O)
            </h2>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap', marginTop: 12 }}>
              <Pill label={`${currentTier} member`} color={tier.color} bg={tier.bg} emoji={tier.emoji} />
              <Pill label="Certified – Admin" color={theme.primary} bg={theme['primary-soft']} />
            </div>
          </div>

          <div style={{ display: 'flex', gap: 10 }}>
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

      <DetailSection title="Personal Details">
        <DetailField label="Name" value="Arun Prakash" />
        <DetailField label="Mobile 1" value="+91 98765 43210" />
        <DetailField label="Mobile 2" value="+91 90000 11223" />
        <DetailField label="Date of Birth" value="14 Feb 1990" />
        <DetailField label="Country" value="India" />
        <DetailField label="State" value="Tamil Nadu" />
        <DetailField label="Pincode" value="600028" />
        <DetailField label="Address" value="No. 12, Anna Nagar, Chennai" />
      </DetailSection>

      <DetailSection title="Membership & Billing">
        <DetailField label="Midna ID (MID)" value="M10048" />
        <DetailField label="Date of Joining" value="03 Jan 2022" />
        <DetailField label="Subscription" value={<Pill label={currentTier} color={tier.color} bg={tier.bg} emoji={tier.emoji} />} />
        <DetailField label="Expiry Date" value="02 Jan 2027" />
        <DetailField label="Billing" value={`${tier.billing} commission`} />
        <DetailField label="Opening Balance" value="₹8,200" />
      </DetailSection>

      <DetailSection title="Professional Details">
        <DetailField label="UID" value="MDN-UID-08812" />
        <DetailField label="Services" value="Genetic Counseling, Sample Collection, Report Review" />
        <DetailField
          label="Availability"
          value={<Pill label="Full Time" color={metricColors.blue.text} bg={metricColors.blue.bg} />}
        />
        <DetailField label="Certified" value={<Pill label="Yes" color={theme.success} bg={theme['success-bg']} />} />
        <DetailField label="Certification Date" value="18 Mar 2022" />
      </DetailSection>

      <DetailSection title="Visibility & Admin">
        <DetailField label="MRP Visibility" value={<Pill label="Show" color={theme.success} bg={theme['success-bg']} />} />
        <DetailField
          label="Branding"
          value={<Pill label="CBA" color={metricColors.purple.text} bg={metricColors.purple.bg} />}
        />
        <DetailField label="MIS Training" value={<Pill label="Completed" color={theme.success} bg={theme['success-bg']} />} />
        <DetailField label="Mentored By" value="Rathinaswamy A · 9597770205" />
        <DetailField label="Admin By" value="Priya Shah" />
        <DetailField label="Status" value={<Pill label="Active" color={theme.success} bg={theme['success-bg']} />} />
        <DetailField label="Remarks" value={<span style={{ fontWeight: 400, color: theme['text-muted'], fontStyle: 'italic' }}>No remarks</span>} />
      </DetailSection>

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
            className="btn-pill-secondary"
            style={{ height: buttonTokens.height.sm, padding: buttonTokens.padding.sm, fontSize: 13 }}
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

      {pendingImage && (
        <AvatarCropModal imageSrc={pendingImage} onCancel={closeCropModal} onSave={handleCropSave} />
      )}
    </section>
  );
}
