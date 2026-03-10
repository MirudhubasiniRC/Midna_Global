import {
  colors,
  spacing,
  radius,
  typography,
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

const LOGO_SIZE = 90;
const STAR_SIZE = 480;

const logos = [
  { src: academicsLogo, alt: 'Academics', position: 'topLeft' as const },
  { src: businessLogo, alt: 'Business', position: 'topRight' as const },
  { src: careerLogo, alt: 'Skills | Career', position: 'bottomLeft' as const },
  { src: partneringLogo, alt: 'Partnering', position: 'bottomRight' as const },
];

export default function PentLogin() {
  // Centered in each of the 4 small triangles (scaled for STAR_SIZE 480)
  const getLogoPosition = (pos: 'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight') => {
    const h = LOGO_SIZE / 2;
    switch (pos) {
      case 'topLeft':   return { top: 128 - h, left: 102 - h };
      case 'topRight':  return { top: 128 - h, left: 378 - h };
      case 'bottomLeft': return { top: 378 - h, left: 102 - h };
      case 'bottomRight': return { top: 378 - h, left: 378 - h };
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
      {/* Header card - shrunk, star stays same size */}
      <div
        style={{
          width: 520,
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
            paddingLeft: spacing[4],
            paddingRight: spacing[4],
            minHeight: 120,
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

        {/* Star section - reduced padding, star size unchanged */}
        <div
          style={{
            padding: spacing[4],
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
              {/* Triangle 1 (primary) */}
              <polygon
                points="200,57 280,57 478,446 2,446"
                fill="none"
                stroke={primary}
                strokeWidth="4"
              />
              {/* Triangle 2 (accent) */}
              <polygon
                points="2,57 478,57 280,446 200,446"
                fill="none"
                stroke={accent}
                strokeWidth="4"
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

            {/* Center hexagon space - ready for sign-in card later */}
          </div>
        </div>
      </div>
    </div>
  );
}
