import { useEffect, useState } from 'react';
import { User, X } from 'lucide-react';
import { colors, spacing, radius, typography, buttonTokens, inputTokens } from '../../styles/theme';

const theme = colors.light;

const profile = {
  displayName: 'MiDNA (H.O)',
  role: 'Certified – Admin',
  mid: 'M10048',
  mentor: 'Rathinaswamy A – 9597770205',
  billing: '40%, SRC – YES',
  bank: {
    accountName: 'A Rathinaswamy HUF',
    bank: 'Axis Bank',
    accNo: '641010100022154',
    branch: 'Coimbatore (Podanur)',
    ifsc: 'UTIB0004747',
  },
  upi: 'Gpay – 99522 21632 (Radhika R)',
};

const editFormDefaults = {
  name: 'MiDNA (H.O)',
  mobileAccounts: '9364233342',
  mobileCounselling: '9791770205',
  city: 'Coimbatore',
  state: 'Tamil Nadu',
  pincode: '641024',
  uid: 'C3C3x | C3xA1 | A1A1 | C3C3 | A1A1',
  mailId: 'midna.global@gmail.com',
  nurturingServices:
    'MiDNA Global, 123 Sample Street, Coimbatore – 641024, Tamil Nadu, India',
};

/** All 28 states + 8 union territories of India (alphabetical). */
const INDIAN_STATES = [
  'Andaman and Nicobar Islands',
  'Andhra Pradesh',
  'Arunachal Pradesh',
  'Assam',
  'Bihar',
  'Chandigarh',
  'Chhattisgarh',
  'Dadra and Nagar Haveli and Daman and Diu',
  'Delhi',
  'Goa',
  'Gujarat',
  'Haryana',
  'Himachal Pradesh',
  'Jammu and Kashmir',
  'Jharkhand',
  'Karnataka',
  'Kerala',
  'Ladakh',
  'Lakshadweep',
  'Madhya Pradesh',
  'Maharashtra',
  'Manipur',
  'Meghalaya',
  'Mizoram',
  'Nagaland',
  'Odisha',
  'Puducherry',
  'Punjab',
  'Rajasthan',
  'Sikkim',
  'Tamil Nadu',
  'Telangana',
  'Tripura',
  'Uttar Pradesh',
  'Uttarakhand',
  'West Bengal',
] as const;

const PASSWORD_STRENGTH_RULES: { id: string; label: string; test: (p: string) => boolean }[] = [
  { id: 'len', label: 'At least 8 characters', test: (p) => p.length >= 8 },
  { id: 'lower', label: 'One lowercase letter (a–z)', test: (p) => /[a-z]/.test(p) },
  { id: 'upper', label: 'One uppercase letter (A–Z)', test: (p) => /[A-Z]/.test(p) },
  { id: 'num', label: 'One number (0–9)', test: (p) => /[0-9]/.test(p) },
  { id: 'special', label: 'One special character (e.g. !@#$%)', test: (p) => /[^A-Za-z0-9]/.test(p) },
];

function isStrongPassword(password: string): boolean {
  return PASSWORD_STRENGTH_RULES.every((r) => r.test(password));
}

const inputBase: React.CSSProperties = {
  width: '100%',
  height: inputTokens.height.md,
  padding: inputTokens.padding,
  fontSize: typography.sizes.sm.fontSize,
  fontFamily: typography.fonts.sans.family,
  border: `1px solid ${theme.border}`,
  borderRadius: radius.sm,
  color: theme['text-primary'],
  background: theme['bg-surface'],
  boxSizing: 'border-box',
  outlineColor: theme['focus-ring'],
};

const labelStyle: React.CSSProperties = {
  display: 'block',
  fontSize: typography.sizes.sm.fontSize,
  fontWeight: 500,
  fontFamily: typography.fonts.sans.family,
  color: theme['text-primary'],
  marginBottom: spacing[2],
};

export default function ProfilePage() {
  const [editOpen, setEditOpen] = useState(false);
  const [passwordOpen, setPasswordOpen] = useState(false);

  return (
    <div
      style={{
        background: theme['bg-surface'],
        borderRadius: radius.lg,
        border: `1px solid ${theme.border}`,
        padding: spacing[5],
      }}
    >
      <h2
        style={{
          margin: `0 0 ${spacing[5]} 0`,
          fontSize: typography.sizes.xl.fontSize,
          fontWeight: typography.fonts.heading.fontWeight,
          fontFamily: typography.fonts.heading.family,
          color: theme['text-primary'],
        }}
      >
        My profile
      </h2>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr',
          gap: spacing[6],
          padding: spacing[5],
          borderRadius: radius.md,
          border: `1px solid ${theme.border}`,
        }}
        className="profile-card-grid"
      >
        <style>{`
          @media (min-width: 900px) {
            .profile-card-grid {
              grid-template-columns: auto 1fr 1fr !important;
              align-items: start;
            }
          }
        `}</style>

        {/* Avatar */}
        <div
          style={{
            width: 140,
            height: 140,
            borderRadius: '50%',
            background: theme['table-header-gray'],
            border: `1px solid ${theme.border}`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            justifySelf: 'center',
          }}
          aria-hidden
        >
          <User size={64} color={theme['text-muted']} strokeWidth={1.5} />
        </div>

        {/* Main info */}
        <div
          style={{
            minWidth: 0,
            display: 'flex',
            flexDirection: 'column',
            gap: spacing[3],
            paddingBottom: spacing[4],
            borderBottom: `1px solid ${theme.border}`,
          }}
          className="profile-main"
        >
          <style>{`
          @media (min-width: 900px) {
            .profile-main {
              border-bottom: none !important;
              padding-bottom: 0 !important;
              border-right: 1px solid ${theme.divider};
              padding-right: ${spacing[6]};
            }
          }
        `}</style>
          <div>
            <div
              style={{
                fontSize: typography.sizes['2xl'].fontSize,
                fontWeight: 700,
                fontFamily: typography.fonts.heading.family,
                color: theme.primary,
                lineHeight: 1.2,
              }}
            >
              {profile.displayName}
            </div>
            <div
              style={{
                marginTop: spacing[2],
                fontSize: typography.sizes.base.fontSize,
                color: theme['text-primary'],
                fontFamily: typography.fonts.sans.family,
              }}
            >
              {profile.role}
            </div>
          </div>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: spacing[3] }}>
            <button
              type="button"
              onClick={() => setEditOpen(true)}
              style={{
                height: buttonTokens.height.md,
                padding: buttonTokens.padding.md,
                borderRadius: radius.sm,
                border: 'none',
                background: theme['btn-primary-bg'],
                color: theme['btn-primary-text'],
                fontSize: typography.sizes.sm.fontSize,
                fontWeight: 600,
                fontFamily: typography.fonts.sans.family,
                cursor: 'pointer',
              }}
            >
              Edit profile
            </button>
            <button
              type="button"
              onClick={() => setPasswordOpen(true)}
              style={{
                height: buttonTokens.height.md,
                padding: buttonTokens.padding.md,
                borderRadius: radius.sm,
                border: `2px solid ${theme.primary}`,
                background: theme['bg-surface'],
                color: theme.primary,
                fontSize: typography.sizes.sm.fontSize,
                fontWeight: 600,
                fontFamily: typography.fonts.sans.family,
                cursor: 'pointer',
              }}
            >
              Change password
            </button>
          </div>

          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: spacing[2],
              fontSize: typography.sizes.sm.fontSize,
              color: theme['text-secondary'],
              fontFamily: typography.fonts.sans.family,
              lineHeight: 1.5,
            }}
          >
            <div>Your MID : {profile.mid}</div>
            <div>Your Mentor : {profile.mentor}</div>
            <div>Your Billing : {profile.billing}</div>
          </div>
        </div>

        {/* Payments */}
        <div
          style={{
            minWidth: 0,
            display: 'flex',
            flexDirection: 'column',
            gap: spacing[4],
          }}
        >
          <SectionTitle>Payments – Through bank</SectionTitle>
          <dl
            style={{
              margin: 0,
              display: 'grid',
              gap: spacing[2],
              fontSize: typography.sizes.sm.fontSize,
              fontFamily: typography.fonts.sans.family,
              color: theme['text-primary'],
            }}
          >
            <DetailRow label="Name" value={profile.bank.accountName} />
            <DetailRow label="Bank" value={profile.bank.bank} />
            <DetailRow label="Acc no" value={profile.bank.accNo} />
            <DetailRow label="Branch" value={profile.bank.branch} />
            <DetailRow label="IFSC code" value={profile.bank.ifsc} />
          </dl>

          <SectionTitle style={{ marginTop: spacing[2] }}>Payments – Through UPI</SectionTitle>
          <p
            style={{
              margin: 0,
              fontSize: typography.sizes.sm.fontSize,
              color: theme['text-primary'],
              fontFamily: typography.fonts.sans.family,
              lineHeight: 1.5,
            }}
          >
            {profile.upi}
          </p>
        </div>
      </div>

      {editOpen && (
        <EditProfileModal
          onClose={() => setEditOpen(false)}
        />
      )}
      {passwordOpen && (
        <ChangePasswordModal onClose={() => setPasswordOpen(false)} />
      )}
    </div>
  );
}

function EditProfileModal({ onClose }: { onClose: () => void }) {
  const [form, setForm] = useState(editFormDefaults);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  const setField = (key: keyof typeof editFormDefaults, value: string) => {
    setForm((f) => ({ ...f, [key]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onClose();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="edit-profile-title"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 1000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: spacing[4],
        background: 'rgba(17, 24, 39, 0.45)',
      }}
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        onMouseDown={(e) => e.stopPropagation()}
        style={{
          width: '100%',
          maxWidth: 720,
          maxHeight: 'min(90vh, 900px)',
          overflow: 'auto',
          background: theme['bg-surface'],
          borderRadius: radius.lg,
          border: `1px solid ${theme.border}`,
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: `${spacing[4]} ${spacing[5]} ${spacing[3]}`,
            borderBottom: `1px solid ${theme.border}`,
          }}
        >
          <h3
            id="edit-profile-title"
            style={{
              margin: 0,
              fontSize: typography.sizes.lg.fontSize,
              fontWeight: typography.fonts.heading.fontWeight,
              fontFamily: typography.fonts.heading.family,
              color: theme['text-primary'],
            }}
          >
            Edit your profile
          </h3>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: 40,
              height: 40,
              border: 'none',
              borderRadius: radius.sm,
              background: 'transparent',
              color: theme['text-secondary'],
              cursor: 'pointer',
            }}
          >
            <X size={22} strokeWidth={2} />
          </button>
        </div>

        <form onSubmit={handleSubmit} style={{ padding: spacing[5] }}>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr',
              gap: spacing[4],
            }}
            className="edit-profile-grid"
          >
            <style>{`
              @media (min-width: 640px) {
                .edit-profile-grid {
                  grid-template-columns: 1fr 1fr !important;
                }
              }
            `}</style>

            <Field label="Name" htmlFor="ep-name">
              <input
                id="ep-name"
                type="text"
                value={form.name}
                onChange={(e) => setField('name', e.target.value)}
                style={inputBase}
              />
            </Field>
            <Field label="Mobile (for accounts)" htmlFor="ep-mob-acc">
              <input
                id="ep-mob-acc"
                type="tel"
                value={form.mobileAccounts}
                onChange={(e) => setField('mobileAccounts', e.target.value)}
                style={inputBase}
              />
            </Field>
            <Field label="Mobile (for counselling)" htmlFor="ep-mob-couns">
              <input
                id="ep-mob-couns"
                type="tel"
                value={form.mobileCounselling}
                onChange={(e) => setField('mobileCounselling', e.target.value)}
                style={inputBase}
              />
            </Field>
            <Field label="City" htmlFor="ep-city">
              <input
                id="ep-city"
                type="text"
                value={form.city}
                onChange={(e) => setField('city', e.target.value)}
                style={inputBase}
              />
            </Field>
            <Field label="State" htmlFor="ep-state">
              <select
                id="ep-state"
                value={form.state}
                onChange={(e) => setField('state', e.target.value)}
                style={{
                  ...inputBase,
                  cursor: 'pointer',
                }}
              >
                {INDIAN_STATES.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </Field>
            <Field label="Pincode" htmlFor="ep-pin">
              <input
                id="ep-pin"
                type="text"
                value={form.pincode}
                onChange={(e) => setField('pincode', e.target.value)}
                style={inputBase}
              />
            </Field>
            <Field label="UID" htmlFor="ep-uid">
              <input
                id="ep-uid"
                type="text"
                value={form.uid}
                onChange={(e) => setField('uid', e.target.value)}
                style={inputBase}
              />
            </Field>
            <Field label="Mail ID" htmlFor="ep-mail">
              <input
                id="ep-mail"
                type="email"
                value={form.mailId}
                onChange={(e) => setField('mailId', e.target.value)}
                style={inputBase}
              />
            </Field>
          </div>

          <div style={{ marginTop: spacing[4] }}>
            <label htmlFor="ep-nurture" style={labelStyle}>
              My nurturing services
            </label>
            <textarea
              id="ep-nurture"
              value={form.nurturingServices}
              onChange={(e) => setField('nurturingServices', e.target.value)}
              rows={4}
              style={{
                ...inputBase,
                height: 'auto',
                minHeight: 100,
                resize: 'vertical',
                lineHeight: 1.5,
              }}
            />
          </div>

          <div style={{ marginTop: spacing[5] }}>
            <div style={{ ...labelStyle, marginBottom: spacing[3] }}>Photo</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: spacing[4], alignItems: 'center' }}>
              <div
                style={{
                  width: 100,
                  height: 100,
                  flexShrink: 0,
                  borderRadius: radius.sm,
                  background: theme['table-header-gray'],
                  border: `1px solid ${theme.border}`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                aria-hidden
              >
                <User size={44} color={theme['text-muted']} strokeWidth={1.5} />
              </div>
              <div>
                <label
                  htmlFor="ep-photo"
                  style={{
                    fontSize: typography.sizes.sm.fontSize,
                    color: theme['text-secondary'],
                    fontFamily: typography.fonts.sans.family,
                    display: 'block',
                    marginBottom: spacing[2],
                  }}
                >
                  Upload new photo
                </label>
                <input
                  id="ep-photo"
                  type="file"
                  accept="image/*"
                  style={{
                    fontSize: typography.sizes.sm.fontSize,
                    fontFamily: typography.fonts.sans.family,
                    color: theme['text-primary'],
                    maxWidth: '100%',
                  }}
                />
              </div>
            </div>
          </div>

          <div
            style={{
              marginTop: spacing[6],
              display: 'flex',
              justifyContent: 'flex-end',
            }}
          >
            <button
              type="submit"
              style={{
                height: buttonTokens.height.md,
                padding: buttonTokens.padding.md,
                borderRadius: radius.sm,
                border: 'none',
                background: theme['btn-primary-bg'],
                color: theme['btn-primary-text'],
                fontSize: typography.sizes.sm.fontSize,
                fontWeight: 600,
                fontFamily: typography.fonts.sans.family,
                cursor: 'pointer',
              }}
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function ChangePasswordModal({ onClose }: { onClose: () => void }) {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const bothFilled = newPassword.length > 0 && confirmPassword.length > 0;
  const passwordsMatch = newPassword === confirmPassword;
  const strongPassword = isStrongPassword(newPassword);
  const newPasswordHasInput = newPassword.length > 0;
  const canSubmit =
    currentPassword.length > 0 &&
    strongPassword &&
    bothFilled &&
    passwordsMatch;

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (newPassword !== confirmPassword) {
      setError('New passwords do not match.');
      return;
    }
    if (!newPassword.trim()) {
      setError('Enter a new password.');
      return;
    }
    if (!isStrongPassword(newPassword)) {
      setError('New password must meet all strength requirements.');
      return;
    }
    onClose();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="change-password-title"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 1000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: spacing[4],
        background: 'rgba(17, 24, 39, 0.45)',
      }}
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        onMouseDown={(e) => e.stopPropagation()}
        style={{
          width: '100%',
          maxWidth: 440,
          maxHeight: 'min(90vh, 720px)',
          overflow: 'auto',
          background: theme['bg-surface'],
          borderRadius: radius.lg,
          border: `1px solid ${theme.border}`,
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: `${spacing[4]} ${spacing[5]} ${spacing[3]}`,
            borderBottom: `1px solid ${theme.border}`,
          }}
        >
          <h3
            id="change-password-title"
            style={{
              margin: 0,
              fontSize: typography.sizes.lg.fontSize,
              fontWeight: typography.fonts.heading.fontWeight,
              fontFamily: typography.fonts.heading.family,
              color: theme['text-primary'],
            }}
          >
            Change password
          </h3>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: 40,
              height: 40,
              border: 'none',
              borderRadius: radius.sm,
              background: 'transparent',
              color: theme['text-secondary'],
              cursor: 'pointer',
            }}
          >
            <X size={22} strokeWidth={2} />
          </button>
        </div>

        <form onSubmit={handleSubmit} style={{ padding: spacing[5] }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: spacing[4] }}>
            <Field label="Current password" htmlFor="cp-current">
              <input
                id="cp-current"
                type="password"
                autoComplete="current-password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                style={inputBase}
              />
            </Field>
            <div>
              <Field label="New password" htmlFor="cp-new">
                <input
                  id="cp-new"
                  type="password"
                  autoComplete="new-password"
                  value={newPassword}
                  onChange={(e) => {
                    setNewPassword(e.target.value);
                    setError('');
                  }}
                  aria-invalid={newPasswordHasInput && !strongPassword}
                  aria-describedby="password-strength-hint"
                  style={{
                    ...inputBase,
                    borderColor: !newPasswordHasInput
                      ? theme.border
                      : strongPassword
                        ? theme.success
                        : theme.error,
                  }}
                />
              </Field>
              <ul
                id="password-strength-hint"
                style={{
                  margin: `${spacing[2]} 0 0`,
                  paddingLeft: spacing[5],
                  fontSize: typography.sizes['2xs'].fontSize,
                  fontFamily: typography.fonts.sans.family,
                  color: theme['text-secondary'],
                  lineHeight: 1.6,
                }}
              >
                {PASSWORD_STRENGTH_RULES.map((rule) => {
                  const ok = rule.test(newPassword);
                  return (
                    <li
                      key={rule.id}
                      style={{
                        color: newPasswordHasInput ? (ok ? theme.success : theme['text-muted']) : theme['text-muted'],
                      }}
                    >
                      {newPasswordHasInput ? (ok ? '✓ ' : '○ ') : '○ '}
                      {rule.label}
                    </li>
                  );
                })}
              </ul>
            </div>
            <Field label="Enter new password again" htmlFor="cp-confirm">
              <input
                id="cp-confirm"
                type="password"
                autoComplete="new-password"
                value={confirmPassword}
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                  setError('');
                }}
                aria-invalid={bothFilled && (!passwordsMatch || !strongPassword)}
                style={{
                  ...inputBase,
                  borderColor: !bothFilled
                    ? theme.border
                    : passwordsMatch && strongPassword
                      ? theme.success
                      : theme.error,
                }}
              />
            </Field>
          </div>

          {bothFilled ? (
            <p
              role="status"
              aria-live="polite"
              style={{
                margin: `${spacing[3]} 0 0`,
                fontSize: typography.sizes.sm.fontSize,
                fontFamily: typography.fonts.sans.family,
                color:
                  !passwordsMatch
                    ? theme.error
                    : !strongPassword
                      ? theme.warning
                      : theme.success,
              }}
            >
              {!passwordsMatch
                ? 'Passwords do not match.'
                : !strongPassword
                  ? 'Passwords match, but the new password must satisfy all requirements above.'
                  : 'Passwords match and meet strength requirements.'}
            </p>
          ) : null}

          {error ? (
            <p
              role="alert"
              style={{
                margin: `${spacing[3]} 0 0`,
                fontSize: typography.sizes.sm.fontSize,
                color: theme.error,
                fontFamily: typography.fonts.sans.family,
              }}
            >
              {error}
            </p>
          ) : null}

          <div
            style={{
              marginTop: spacing[6],
              display: 'flex',
              justifyContent: 'flex-end',
            }}
          >
            <button
              type="submit"
              disabled={!canSubmit}
              style={{
                height: buttonTokens.height.md,
                padding: buttonTokens.padding.md,
                borderRadius: radius.sm,
                border: 'none',
                background: !canSubmit ? theme['btn-disabled-bg'] : theme['btn-primary-bg'],
                color: !canSubmit ? theme['btn-disabled-text'] : theme['btn-primary-text'],
                fontSize: typography.sizes.sm.fontSize,
                fontWeight: 600,
                fontFamily: typography.fonts.sans.family,
                cursor: !canSubmit ? 'not-allowed' : 'pointer',
              }}
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function Field({
  label,
  htmlFor,
  children,
}: {
  label: string;
  htmlFor: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={htmlFor} style={labelStyle}>
        {label}
      </label>
      {children}
    </div>
  );
}

function SectionTitle({
  children,
  style,
}: {
  children: React.ReactNode;
  style?: React.CSSProperties;
}) {
  return (
    <div
      style={{
        fontSize: typography.sizes.sm.fontSize,
        fontWeight: 700,
        fontFamily: typography.fonts.heading.family,
        color: theme['text-primary'],
        ...style,
      }}
    >
      {children}
    </div>
  );
}

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '88px 1fr',
        gap: spacing[2],
        alignItems: 'baseline',
      }}
    >
      <dt style={{ margin: 0, color: theme['text-secondary'], fontWeight: 500 }}>{label}</dt>
      <dd style={{ margin: 0, color: theme['text-primary'] }}>{value}</dd>
    </div>
  );
}
