import { useState, useCallback } from 'react';
import {
  colors,
  spacing,
  radius,
  typography,
  inputTokens,
} from '../../styles/theme';

import fullLogo from '../../assets/Full.png';
import bulletsLogo from '../../assets/Bullets.PNG';
import academicsLogo from '../../assets/Academics.png';
import businessLogo from '../../assets/Business.png';
import careerLogo from '../../assets/career.png';
import partneringLogo from '../../assets/Partnering.png';

const theme = colors.light;
const primary = theme.primary;
const accent = theme.accent;

const LOGO_SIZE = 98;
const STAR_SIZE = 500;

const logos = [
  { src: academicsLogo, alt: 'Academics', position: 'topLeft' as const },
  { src: businessLogo, alt: 'Business', position: 'topRight' as const },
  { src: careerLogo, alt: 'Skills | Career', position: 'bottomLeft' as const },
  { src: partneringLogo, alt: 'Partnering', position: 'bottomRight' as const },
];

const generateCaptcha = () => Math.random().toString(36).slice(2, 6);

export default function PentLogin() {
  const [captcha, setCaptcha] = useState(generateCaptcha);
  const refreshCaptcha = useCallback(() => setCaptcha(generateCaptcha), []);

  // Centered in each of the 4 small triangles (scaled for STAR_SIZE 500)
  const getLogoPosition = (pos: 'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight') => {
    const h = LOGO_SIZE / 2;
    switch (pos) {
      case 'topLeft':   return { top: 133 - h, left: 104 - h };
      case 'topRight':  return { top: 133 - h, left: 396 - h };
      case 'bottomLeft': return { top: 390 - h, left: 104 - h };
      case 'bottomRight': return { top: 390 - h, left: 396 - h };
    }
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        background: theme['bg-base'],
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: spacing[8],
        fontFamily: typography.fonts.sans.family,
        fontSize: typography.sizes.base.fontSize,
        lineHeight: typography.sizes.base.lineHeight,
        color: theme['text-primary'],
      }}
    >
      {/* Header card */}
      <div
        style={{
          width: 540,
          maxWidth: '100%',
          background: theme['bg-surface'],
          borderRadius: radius.lg,
          overflow: 'hidden',
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)',
        }}
      >
        {/* Logo header */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '100%',
            paddingTop: spacing[4],
            paddingBottom: spacing[2],
            paddingLeft: spacing[4],
            paddingRight: spacing[4],
            minHeight: 100,
            gap: 0,
          }}
        >
          <div
            style={{
              flex: '1 1 65%',
              minWidth: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-start',
            }}
          >
            <img
              src={fullLogo}
              alt="Midna Global"
              style={{
                width: '100%',
                height: 'auto',
                maxHeight: 120,
                objectFit: 'contain',
                objectPosition: 'left center',
                display: 'block',
              }}
            />
          </div>
          <div
            style={{
              flex: '1 1 35%',
              minWidth: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              marginLeft: -18,
              zIndex: 1,
            }}
          >
            <img
              src={bulletsLogo}
              alt="Smart Life Coaching"
              style={{
                width: '100%',
                height: 'auto',
                maxHeight: 120,
                objectFit: 'contain',
                objectPosition: 'right center',
                display: 'block',
              }}
            />
          </div>
        </div>

        {/* Gradient dash */}
        <div
          style={{
            width: '100%',
            height: 3,
            background: `linear-gradient(90deg, ${primary}, ${accent})`,
          }}
        />

        {/* Star section */}
        <div
          style={{
            paddingTop: 0,
            paddingBottom: spacing[3],
            paddingLeft: spacing[3],
            paddingRight: spacing[4],
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            background: theme['bg-surface'],
          }}
        >
          <div
            style={{
              position: 'relative',
              width: STAR_SIZE,
              height: STAR_SIZE,
            }}
          >
            {/* Clean X: two overlapping triangles, thick strokes like reference */}
            <svg
              width={STAR_SIZE}
              height={STAR_SIZE}
              viewBox={`0 0 ${STAR_SIZE} ${STAR_SIZE}`}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                overflow: 'visible',
              }}
            >
              {/* Triangle 1 (primary) - scaled for 500 */}
              <polygon
                points="208,60 292,60 498,465 2,465"
                fill="none"
                stroke={primary}
                strokeWidth="2.5"
              />
              {/* Triangle 2 (accent) */}
              <polygon
                points="2,60 498,60 292,465 208,465"
                fill="none"
                stroke={accent}
                strokeWidth="2.5"
              />
              {/* Middle bottom segment - indigo overlay */}
              <line
                x1="208"
                y1="465"
                x2="292"
                y2="465"
                stroke={primary}
                strokeWidth="2.5"
              />
            </svg>

            {/* 4 logos inside the 4 corner triangles - pop up on hover */}
            {logos.map(({ src, alt, position }) => (
              <div
                key={position}
                style={{
                  position: 'absolute',
                  ...getLogoPosition(position),
                  width: LOGO_SIZE,
                  height: LOGO_SIZE,
                  borderRadius: '50%',
                  overflow: 'hidden',
                  border: `2px solid ${primary}`,
                  background: theme['bg-surface'],
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                  cursor: 'default',
                  transition: 'transform 0.25s ease, box-shadow 0.25s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'scale(1.15)';
                  e.currentTarget.style.boxShadow = '0 8px 24px rgba(49, 46, 129, 0.3)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'scale(1)';
                  e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.1)';
                }}
              >
                <img
                  src={src}
                  alt={alt}
                  style={{
                    width: '85%',
                    height: '85%',
                    objectFit: 'contain',
                  }}
                />
              </div>
            ))}

            {/* Login fields - narrow width, inside pentagon */}
            <div
              style={{
                position: 'absolute',
                top: 170,
                left: 145,
                right: 145,
                bottom: 90,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'stretch',
                padding: spacing[3],
                background: 'transparent',
                zIndex: 2,
              }}
            >
              <h1
                style={{
                  fontSize: typography.sizes.xl.fontSize,
                  fontWeight: typography.fonts.heading.fontWeight,
                  fontFamily: typography.fonts.heading.family,
                  margin: `0 0 ${spacing[3]} 0`,
                  marginTop: -50,
                  color: theme['text-primary'],
                  textAlign: 'center',
                }}
              >
                Sign In
              </h1>
              <div style={{ marginTop: (spacing[6] ?? 24) + 42, marginBottom: spacing[2] }}>
                <label htmlFor="pent-user-id" style={{ display: 'block', fontSize: typography.sizes.sm.fontSize, marginBottom: 4, marginLeft: 8, color: theme['text-primary'] }}>
                  User ID
                </label>
                <input
                  id="pent-user-id"
                  type="text"
                  placeholder="Enter your user ID"
                  style={{
                    width: '100%',
                    height: inputTokens.height.sm,
                    padding: '8px 12px',
                    fontSize: typography.sizes.sm.fontSize,
                    fontFamily: typography.fonts.sans.family,
                    border: `1px solid ${theme.border}`,
                    borderRadius: radius.sm,
                    color: theme['text-primary'],
                    boxSizing: 'border-box',
                  }}
                />
              </div>
              <div style={{ marginBottom: spacing[2] }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4, marginLeft: -25, marginRight: -25 }}>
                  <label htmlFor="pent-password" style={{ fontSize: typography.sizes.sm.fontSize, color: theme['text-primary'] }}>
                    Password
                  </label>
                  <a href="#" style={{ fontSize: typography.sizes.xs.fontSize, color: primary, textDecoration: 'none' }}>
                    Forgot Password?
                  </a>
                </div>
                <div style={{ marginLeft: -35, marginRight: -35 }}>
                  <input
                    id="pent-password"
                    type="password"
                    placeholder="Enter your password"
                    style={{
                      width: '100%',
                      height: inputTokens.height.sm,
                    padding: '8px 12px',
                    fontSize: typography.sizes.sm.fontSize,
                    fontFamily: typography.fonts.sans.family,
                    border: `1px solid ${theme.border}`,
                    borderRadius: radius.sm,
                    color: theme['text-primary'],
                    boxSizing: 'border-box',
                  }}
                  />
                </div>
              </div>
              <div style={{ marginBottom: spacing[3] }}>
                <label htmlFor="pent-captcha" style={{ display: 'block', fontSize: typography.sizes.sm.fontSize, marginBottom: 4, marginLeft: -10, color: theme['text-primary'] }}>
                  Captcha
                </label>
                <div style={{ display: 'flex', gap: spacing[2], alignItems: 'center' }}>
                  <input
                    id="pent-captcha"
                    type="text"
                    placeholder="Enter captcha"
                    style={{
                      width: 100,
                      maxWidth: 100,
                      height: inputTokens.height.sm,
                      padding: '8px 12px',
                      fontSize: typography.sizes.sm.fontSize,
                      fontFamily: typography.fonts.sans.family,
                      border: `1px solid ${theme.border}`,
                      borderRadius: radius.sm,
                      color: theme['text-primary'],
                      boxSizing: 'border-box',
                    }}
                  />
                  <div
                    style={{
                      height: inputTokens.height.sm,
                      minWidth: 52,
                      padding: '0 10px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      background: theme['bg-muted'],
                      borderRadius: radius.sm,
                      border: `1px solid ${theme.border}`,
                      fontFamily: typography.fonts.mono.family,
                      fontSize: typography.sizes.sm.fontSize,
                    }}
                  >
                    {captcha}
                  </div>
                  <button
                    type="button"
                    onClick={refreshCaptcha}
                    aria-label="Refresh captcha"
                    style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 4, color: theme['text-secondary'] }}
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M21 2v6h-6M3 22v-6h6M21 8A9 9 0 0 0 6 19.5M3 16a9 9 0 0 1 15-6.5" />
                    </svg>
                  </button>
                </div>
              </div>
              <button
                type="button"
                style={{
                  alignSelf: 'center',
                  marginTop: spacing[6],
                  minWidth: 60,
                  padding: '0 20px',
                  height: 48,
                  minHeight: 30,
                  background: theme['btn-primary-bg'],
                  color: theme['btn-primary-text'],
                  fontSize: typography.sizes.sm.fontSize,
                  fontWeight: typography.fonts.heading.fontWeight,
                  fontFamily: typography.fonts.sans.family,
                  border: 'none',
                  borderRadius: radius.sm,
                  cursor: 'pointer',
                }}
                onMouseOver={(e) => { e.currentTarget.style.background = theme['btn-primary-hover']; }}
                onMouseOut={(e) => { e.currentTarget.style.background = theme['btn-primary-bg']; }}
              >
                Sign In
              </button>
            </div>
          </div>
          {/* Biometric text - below star, minimal spacing */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: spacing[1],
              marginTop: -24,
              paddingTop: 0,
              paddingBottom: spacing[1],
            }}
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ flexShrink: 0, color: theme['text-muted'] }}>
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
            <span style={{ fontSize: typography.sizes['2xs'].fontSize, color: theme['text-muted'] }}>
              Your biometric data is encrypted and securely processed.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
