import { useState, useCallback } from 'react';
import {
  colors,
  spacing,
  radius,
  typography,
  buttonTokens,
  inputTokens,
} from '../../styles/theme';

import fullLogo from '../../assets/Full.png';

const theme = colors.light;

const generateCaptcha = () =>
  Math.random().toString(36).slice(2, 6);

export default function Login() {
  const [captcha, setCaptcha] = useState(generateCaptcha);
  const refreshCaptcha = useCallback(() => setCaptcha(generateCaptcha), []);

  return (
    <div
      style={{
        minHeight: '100vh',
        background: theme['bg-base'],
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: spacing[8],
        fontFamily: typography.fonts.sans.family,
        color: theme['text-primary'],
      }}
    >
      {/* Card: logo, dash, and form - scaled for zoomed-out feel */}
      <div
        style={{
          transform: 'scale(0.88)',
          transformOrigin: 'center center',
        }}
      >
        <div
          style={{
            width: 416,
            minHeight: 476,
            background: theme['bg-surface'],
            borderRadius: radius.lg,
            overflow: 'hidden',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)',
          }}
        >
        {/* Logo - full width of card, slight left offset */}
        <div
          style={{
            width: '100%',
            padding: `${spacing[5]} 0 0`,
            marginLeft: -1,
          }}
        >
          <img
            src={fullLogo}
            alt="Midna Global"
            style={{
              width: '100%',
              height: 'auto',
              maxHeight: 56,
              objectFit: 'contain',
              display: 'block',
            }}
          />
        </div>

        {/* Small gradient dash - full width like card */}
        <div
          style={{
            width: '100%',
            height: 3,
            marginTop: spacing[4],
            background: `linear-gradient(90deg, ${theme.primary}, ${theme.accent})`,
          }}
        />

        {/* Form content */}
        <div style={{ padding: spacing[6] }}>
        <h1
          style={{
            fontSize: typography.sizes['2xl'].fontSize,
            lineHeight: typography.sizes['2xl'].lineHeight,
            fontWeight: typography.sizes['2xl'].fontWeight,
            fontFamily: typography.fonts.heading.family,
            letterSpacing: typography.fonts.heading.letterSpacing,
            margin: `0 0 ${spacing[6]} 0`,
            color: theme['text-primary'],
          }}
        >
          Sign In
        </h1>

        {/* User ID */}
        <div style={{ marginBottom: spacing[4] }}>
          <label
            htmlFor="user-id"
            style={{
              display: 'block',
              fontSize: typography.sizes.base.fontSize,
              marginBottom: spacing[2],
              color: theme['text-primary'],
            }}
          >
            User ID
          </label>
          <input
            id="user-id"
            type="text"
            placeholder="Enter your user ID"
            style={{
              width: '100%',
              height: inputTokens.height.md,
              padding: inputTokens.padding,
              fontSize: typography.sizes.base.fontSize,
              fontFamily: typography.fonts.sans.family,
              border: `1px solid ${theme.border}`,
              borderRadius: radius.sm,
              color: theme['text-primary'],
              boxSizing: 'border-box',
            }}
          />
        </div>

        {/* Password */}
        <div style={{ marginBottom: spacing[4] }}>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: spacing[2],
            }}
          >
            <label
              htmlFor="password"
              style={{
                fontSize: typography.sizes.base.fontSize,
                color: theme['text-primary'],
              }}
            >
              Password
            </label>
            <a
              href="#"
              style={{
                fontSize: typography.sizes.sm.fontSize,
                color: theme.primary,
                textDecoration: 'none',
              }}
            >
              Forgot Password?
            </a>
          </div>
          <input
            id="password"
            type="password"
            placeholder="Enter your password"
            style={{
              width: '100%',
              height: inputTokens.height.md,
              padding: inputTokens.padding,
              fontSize: typography.sizes.base.fontSize,
              fontFamily: typography.fonts.sans.family,
              border: `1px solid ${theme.border}`,
              borderRadius: radius.sm,
              color: theme['text-primary'],
              boxSizing: 'border-box',
            }}
          />
        </div>

        {/* Captcha */}
        <div style={{ marginBottom: spacing[6] }}>
          <label
            htmlFor="captcha"
            style={{
              display: 'block',
              fontSize: typography.sizes.base.fontSize,
              marginBottom: spacing[2],
              color: theme['text-primary'],
            }}
          >
            Captcha Code
          </label>
          <div style={{ display: 'flex', gap: spacing[2], alignItems: 'center' }}>
            <input
              id="captcha"
              type="text"
              placeholder="Enter captcha"
              style={{
                flex: 1,
                height: inputTokens.height.md,
                padding: inputTokens.padding,
                fontSize: typography.sizes.base.fontSize,
                fontFamily: typography.fonts.sans.family,
                border: `1px solid ${theme.border}`,
                borderRadius: radius.sm,
                color: theme['text-primary'],
                boxSizing: 'border-box',
              }}
            />
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: spacing[2],
                height: inputTokens.height.md,
                padding: `0 ${spacing[3]}`,
                background: theme['bg-muted'],
                borderRadius: radius.sm,
                border: `1px solid ${theme.border}`,
              }}
            >
              <span
                style={{
                  fontFamily: typography.fonts.mono.family,
                  fontWeight: typography.fonts.mono.fontWeight,
                  fontSize: typography.sizes.lg.fontSize,
                  color: theme['text-primary'],
                  letterSpacing: '2px',
                }}
              >
                {captcha}
              </span>
              <button
                type="button"
                onClick={refreshCaptcha}
                aria-label="Refresh captcha"
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  padding: spacing[1],
                  color: theme['text-secondary'],
                }}
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M21 2v6h-6M3 22v-6h6M21 8A9 9 0 0 0 6 19.5M3 16a9 9 0 0 1 15-6.5" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Secure Login button */}
        <button
          type="button"
          style={{
            width: '100%',
            height: buttonTokens.height.lg,
            padding: buttonTokens.padding.lg,
            background: theme['btn-primary-bg'],
            color: theme['btn-primary-text'],
            fontSize: typography.sizes.base.fontSize,
            fontWeight: 600,
            fontFamily: typography.fonts.sans.family,
            border: 'none',
            borderRadius: radius.md,
            cursor: 'pointer',
            marginBottom: spacing[5],
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.background = theme['btn-primary-hover'];
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.background = theme['btn-primary-bg'];
          }}
        >
          Secure Login
        </button>

        {/* Security disclaimer */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: spacing[2],
          }}
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            style={{ flexShrink: 0, color: theme['text-muted'] }}
          >
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
            <path d="M7 11V7a5 5 0 0 1 10 0v4" />
          </svg>
          <span
            style={{
              fontSize: typography.sizes.xs.fontSize,
              lineHeight: typography.sizes.xs.lineHeight,
              color: theme['text-muted'],
            }}
          >
            Your biometric data is encrypted and securely processed.
          </span>
        </div>
        </div>
        </div>
      </div>
    </div>
  );
}
