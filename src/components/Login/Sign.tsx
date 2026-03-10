/**
 * Sign.tsx - Example file using logo colors (hex codes only, no theme variables)
 * Primary: Magenta (#CB2888) | Secondary: Yellow (#FDD00F) from MYDNA logo
 */
import { useState, useCallback } from 'react';
import fullLogo from '../../assets/Full.png';

const generateCaptcha = () =>
  Math.random().toString(36).slice(2, 6);

export default function Sign() {
  const [captcha, setCaptcha] = useState(generateCaptcha);
  const refreshCaptcha = useCallback(() => setCaptcha(generateCaptcha), []);

  // Logo colors - hex codes only (no theme variables)
  const colors = {
    primary: '#93207A',        // Primary - vibrant magenta
    primaryHover: '#7A1A65',   // Darker on hover
    secondary: '#FDD00F',      // Yellow - figures, swirls, banner segments
    secondarySoft: '#FEF3C7',  // Soft yellow background
    purple: '#8C0A9F',         // Purple - 'i' stem, website URL
    darkGrey: '#4B4B4B',       // Dark grey - main text
    darkGreen: '#4E8132',      // Dark green - figures, banner
    bgBase: '#F8FAFC',
    bgSurface: '#FFFFFF',
    bgMuted: '#F1F5F9',
    textPrimary: '#0F172A',
    textSecondary: '#475569',
    textMuted: '#64748B',
    border: '#E5E7EB',
    focusRing: '#93207A',
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        background: colors.bgBase,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '32px',
        fontFamily: 'Inter, system-ui, sans-serif',
        fontSize: '16px',
        lineHeight: '24px',
        color: colors.textPrimary,
      }}
    >
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
            background: colors.bgSurface,
            borderRadius: '14px',
            overflow: 'hidden',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)',
          }}
        >
          {/* Logo */}
          <div
            style={{
              width: '100%',
              height: 120,
              paddingTop: '16px',
              marginLeft: -10,
              background: 'transparent',
            }}
          >
            <img
              src={fullLogo}
              alt="Midna Global"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'contain',
                objectPosition: 'center center',
                display: 'block',
                background: 'transparent',
              }}
            />
          </div>

          {/* Gradient: magenta to yellow (logo colors) */}
          <div
            style={{
              width: '100%',
              height: 3,
              marginTop: '16px',
              background: `linear-gradient(90deg, ${colors.primary}, ${colors.secondary})`,
            }}
          />

          <div style={{ padding: '24px' }}>
            <h1
              style={{
                fontSize: '24px',
                lineHeight: '32px',
                fontWeight: 600,
                fontFamily: 'Inter, system-ui, sans-serif',
                letterSpacing: '-0.01em',
                margin: '0 0 24px 0',
                color: colors.textPrimary,
                textAlign: 'center',
              }}
            >
              Sign In
            </h1>

            {/* User ID */}
            <div style={{ marginBottom: '16px' }}>
              <label
                htmlFor="sign-user-id"
                style={{
                  display: 'block',
                  fontSize: '16px',
                  lineHeight: '24px',
                  marginBottom: '8px',
                  color: colors.textPrimary,
                }}
              >
                User ID
              </label>
              <input
                id="sign-user-id"
                type="text"
                placeholder="Enter your user ID"
                style={{
                  width: '100%',
                  height: '44px',
                  padding: '12px 16px',
                  fontSize: '16px',
                  fontFamily: 'inherit',
                  border: `1px solid ${colors.border}`,
                  borderRadius: '6px',
                  color: colors.textPrimary,
                  boxSizing: 'border-box',
                  outlineColor: colors.focusRing,
                }}
              />
            </div>

            {/* Password */}
            <div style={{ marginBottom: '16px' }}>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '8px',
                }}
              >
                <label
                  htmlFor="sign-password"
                  style={{
                    fontSize: '16px',
                    lineHeight: '24px',
                    color: colors.textPrimary,
                  }}
                >
                  Password
                </label>
                <a
                  href="#"
                  style={{
                    fontSize: '14px',
                    lineHeight: '20px',
                    color: colors.primary,
                    textDecoration: 'none',
                  }}
                >
                  Forgot Password?
                </a>
              </div>
              <input
                id="sign-password"
                type="password"
                placeholder="Enter your password"
                style={{
                  width: '100%',
                  height: '44px',
                  padding: '12px 16px',
                  fontSize: '16px',
                  fontFamily: 'inherit',
                  border: `1px solid ${colors.border}`,
                  borderRadius: '6px',
                  color: colors.textPrimary,
                  boxSizing: 'border-box',
                  outlineColor: colors.focusRing,
                }}
              />
            </div>

            {/* Captcha */}
            <div style={{ marginBottom: '24px' }}>
              <label
                htmlFor="sign-captcha"
                style={{
                  display: 'block',
                  fontSize: '16px',
                  lineHeight: '24px',
                  marginBottom: '8px',
                  color: colors.textPrimary,
                }}
              >
                Captcha Code
              </label>
              <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                <input
                  id="sign-captcha"
                  type="text"
                  placeholder="Enter captcha"
                  style={{
                    flex: 1,
                    height: '44px',
                    padding: '12px 16px',
                    fontSize: '16px',
                    fontFamily: 'inherit',
                    border: `1px solid ${colors.border}`,
                    borderRadius: '6px',
                    color: colors.textPrimary,
                    boxSizing: 'border-box',
                    outlineColor: colors.focusRing,
                  }}
                />
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    height: '44px',
                    padding: '0 12px',
                    background: colors.secondarySoft,
                    borderRadius: '6px',
                    border: `1px solid ${colors.border}`,
                  }}
                >
                  <span
                    style={{
                      fontFamily: 'Menlo, Consolas, monospace',
                      fontWeight: 500,
                      fontSize: '18px',
                      letterSpacing: '2px',
                      color: colors.textPrimary,
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
                      padding: '4px',
                      color: colors.textSecondary,
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

            {/* Sign In button - magenta primary */}
            <button
              type="button"
              style={{
                width: '100%',
                height: '52px',
                padding: '16px 24px',
                background: colors.primary,
                color: '#FFFFFF',
                fontSize: '16px',
                lineHeight: '24px',
                fontWeight: 600,
                fontFamily: 'inherit',
                border: 'none',
                borderRadius: '10px',
                cursor: 'pointer',
                marginBottom: '20px',
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.background = colors.primaryHover;
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.background = colors.primary;
              }}
            >
              Sign In
            </button>

            {/* Security disclaimer */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
              }}
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                style={{ flexShrink: 0, color: colors.textMuted }}
              >
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
              </svg>
              <span
                style={{
                  fontSize: '11px',
                  lineHeight: '16px',
                  color: colors.textMuted,
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
