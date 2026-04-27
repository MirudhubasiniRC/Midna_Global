import { useState } from 'react';
import { User } from 'lucide-react';
import {
  colors,
  spacing,
  radius,
  typography,
  buttonTokens,
  inputTokens,
  modalTokens,
} from '../../styles/theme';
import AppModal from '../ui/AppModal';

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
  address: '123 Sample Street, Coimbatore',
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
        My Profile
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
  const [emailError, setEmailError] = useState('');

  const setField = (key: keyof typeof editFormDefaults, value: string) => {
    setForm((f) => ({ ...f, [key]: value }));
  };

  const keepDigitsOnly = (value: string, maxLength?: number) => {
    const digits = value.replace(/\D/g, '');
    return typeof maxLength === 'number' ? digits.slice(0, maxLength) : digits;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.mailId);
    if (!validEmail) {
      setEmailError('Enter a valid email address.');
      return;
    }
    onClose();
  };

  return (
    <AppModal
      open
      onClose={onClose}
      titleId="edit-profile-title"
      title="Edit your profile"
      subtitle="Update your contact details, photo, and certificate."
      size="2xl"
      maxWidthPx={720}
      maxHeight="min(90vh, 900px)"
      scrollBody
      footer={
        <button
          type="submit"
          form="edit-profile-form"
          style={{
            height: buttonTokens.height.md,
            padding: buttonTokens.padding.md,
            borderRadius: radius.pill,
            border: 'none',
            background: theme['btn-primary-bg'],
            color: theme['btn-primary-text'],
            fontSize: typography.sizes.sm.fontSize,
            fontWeight: 600,
            fontFamily: typography.fonts.sans.family,
            cursor: 'pointer',
            boxShadow: modalTokens.primaryActionBoxShadow,
          }}
        >
          Submit
        </button>
      }
    >
        <form id="edit-profile-form" onSubmit={handleSubmit} style={{ margin: 0, padding: 0 }}>
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
                onChange={(e) => setField('mobileAccounts', keepDigitsOnly(e.target.value, 10))}
                inputMode="numeric"
                pattern="[0-9]*"
                maxLength={10}
                style={inputBase}
              />
            </Field>
            <Field label="Mobile (for counselling)" htmlFor="ep-mob-couns">
              <input
                id="ep-mob-couns"
                type="tel"
                value={form.mobileCounselling}
                onChange={(e) => setField('mobileCounselling', keepDigitsOnly(e.target.value, 10))}
                inputMode="numeric"
                pattern="[0-9]*"
                maxLength={10}
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
                onChange={(e) => setField('pincode', keepDigitsOnly(e.target.value, 6))}
                inputMode="numeric"
                pattern="[0-9]*"
                maxLength={6}
                style={inputBase}
              />
            </Field>
            <Field label="Address" htmlFor="ep-address">
              <input
                id="ep-address"
                type="text"
                value={form.address}
                onChange={(e) => setField('address', e.target.value)}
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
                onChange={(e) => {
                  setField('mailId', e.target.value);
                  setEmailError('');
                }}
                style={{
                  ...inputBase,
                  borderColor: emailError ? theme.error : theme.border,
                }}
              />
            </Field>
            {emailError ? (
              <div
                style={{
                  gridColumn: '1 / -1',
                  fontSize: typography.sizes.xs.fontSize,
                  color: theme.error,
                  fontFamily: typography.fonts.sans.family,
                  marginTop: `-${spacing[2]}`,
                }}
              >
                {emailError}
              </div>
            ) : null}
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
          <div style={{ marginTop: spacing[5] }}>
            <div style={{ ...labelStyle, marginBottom: spacing[3] }}>Upload certificate</div>
            <input
              type="file"
              accept=".pdf,.jpg,.jpeg,.png"
              style={{
                fontSize: typography.sizes.sm.fontSize,
                fontFamily: typography.fonts.sans.family,
                color: theme['text-primary'],
                maxWidth: '100%',
              }}
            />
          </div>
        </form>
    </AppModal>
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
    <AppModal
      open
      onClose={onClose}
      titleId="change-password-title"
      title="Change password"
      subtitle="Current password, then a new password that meets the strength rules."
      size="md"
      maxWidthPx={440}
      maxHeight="min(90vh, 720px)"
      scrollBody
      footer={
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
            gap: spacing[2],
            alignItems: 'stretch',
          }}
        >
          <button
            type="submit"
            form="change-password-form"
            disabled={!canSubmit}
            style={{
              height: buttonTokens.height.md,
              padding: buttonTokens.padding.md,
              borderRadius: radius.pill,
              border: 'none',
              background: canSubmit ? theme['btn-primary-bg'] : theme['btn-disabled-bg'],
              color: canSubmit ? theme['btn-primary-text'] : theme['btn-disabled-text'],
              fontSize: typography.sizes.sm.fontSize,
              fontWeight: 600,
              fontFamily: typography.fonts.sans.family,
              cursor: canSubmit ? 'pointer' : 'not-allowed',
              boxShadow: canSubmit ? modalTokens.primaryActionBoxShadow : 'none',
            }}
          >
            Submit
          </button>
          <button
            type="button"
            onClick={onClose}
            style={{
              width: '100%',
              height: buttonTokens.height.sm,
              border: `1px solid ${theme.border}`,
              borderRadius: radius.pill,
              background: theme['bg-surface'],
              color: theme['text-secondary'],
              fontSize: typography.sizes.sm.fontSize,
              fontWeight: 500,
              fontFamily: typography.fonts.sans.family,
              cursor: 'pointer',
            }}
          >
            Cancel
          </button>
        </div>
      }
    >
        <form id="change-password-form" onSubmit={handleSubmit} style={{ margin: 0, padding: 0 }}>
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
        </form>
    </AppModal>
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
