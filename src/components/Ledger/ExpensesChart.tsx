import { useState } from 'react';
import { colors, radius, spacing } from '../../styles/theme';

const theme = colors.light;

type MonthBar = {
  label: string;
  value: number;
};

/** Full-year sample expenses — Jul is the focal month (like the reference) */
const yearData: MonthBar[] = [
  { label: 'Jan', value: 980 },
  { label: 'Feb', value: 1240 },
  { label: 'Mar', value: 1100 },
  { label: 'Apr', value: 1560 },
  { label: 'May', value: 1320 },
  { label: 'Jun', value: 1480 },
  { label: 'Jul', value: 2121 },
  { label: 'Aug', value: 1680 },
  { label: 'Sep', value: 1410 },
  { label: 'Oct', value: 1750 },
  { label: 'Nov', value: 1590 },
  { label: 'Dec', value: 1890 },
];

const maxValue = Math.max(...yearData.map((d) => d.value));
const CHART_H = 200;

export function ExpensesChart() {
  const [activeIndex, setActiveIndex] = useState(6); // Jul
  const [year] = useState(2025);
  const active = yearData[activeIndex];

  return (
    <div className="dash-card" style={{ padding: spacing[5], height: '100%', display: 'flex', flexDirection: 'column' }}>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: spacing[5],
          flexShrink: 0,
        }}
      >
        <h2 style={{ margin: 0, fontSize: 20, fontWeight: 600, letterSpacing: '-0.01em', color: theme['text-primary'] }}>
          Expenses
        </h2>
        <button
          type="button"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 6,
            border: 'none',
            background: 'transparent',
            color: theme['text-secondary'],
            fontSize: 13,
            fontWeight: 500,
            cursor: 'pointer',
            fontFamily: 'inherit',
            padding: '4px 2px',
          }}
        >
          {year}
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="m6 9 6 6 6-6" />
          </svg>
        </button>
      </div>

      <div style={{ position: 'relative', flex: 1, minHeight: CHART_H + 48, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
        {/* Soft horizontal guides — pinned with the bars at the bottom */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            bottom: 28,
            height: CHART_H,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            pointerEvents: 'none',
          }}
        >
          {[0, 1, 2, 3].map((i) => (
            <div key={i} style={{ height: 1, background: theme.divider, opacity: 0.85 }} />
          ))}
        </div>

        <div
          style={{
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'space-between',
            gap: 6,
            height: CHART_H + 28,
            paddingTop: 28,
            position: 'relative',
            zIndex: 1,
            marginTop: 'auto',
          }}
        >
          {yearData.map((bar, index) => {
            const isActive = index === activeIndex;
            const barH = Math.max(18, Math.round((bar.value / maxValue) * (CHART_H - 8)));

            return (
              <button
                key={bar.label}
                type="button"
                onClick={() => setActiveIndex(index)}
                onMouseEnter={() => setActiveIndex(index)}
                aria-label={`${bar.label}: ₹${bar.value.toLocaleString('en-IN')}`}
                aria-pressed={isActive}
                style={{
                  flex: 1,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'flex-end',
                  gap: 10,
                  border: 'none',
                  background: 'transparent',
                  padding: 0,
                  cursor: 'pointer',
                  fontFamily: 'inherit',
                  position: 'relative',
                  height: '100%',
                }}
              >
                {isActive && (
                  <span
                    style={{
                      position: 'absolute',
                      bottom: barH + 22,
                      left: '50%',
                      transform: 'translateX(-50%)',
                      background: theme['text-primary'],
                      color: '#fff',
                      fontSize: 12,
                      fontWeight: 600,
                      padding: '6px 10px',
                      borderRadius: radius.pill,
                      whiteSpace: 'nowrap',
                      boxShadow: '0 8px 18px rgba(33, 37, 41, 0.22)',
                      zIndex: 2,
                    }}
                  >
                    ₹{active.value.toLocaleString('en-IN')}
                  </span>
                )}

                <span
                  style={{
                    position: 'relative',
                    width: '100%',
                    maxWidth: 28,
                    height: barH,
                    borderRadius: 999,
                    background: isActive
                      ? 'var(--btn-primary-gradient, linear-gradient(180deg, #8E9AFE 0%, #6D7AF2 100%))'
                      : `repeating-linear-gradient(
                          -45deg,
                          #E9ECEF,
                          #E9ECEF 3px,
                          #F8F9FA 3px,
                          #F8F9FA 6px
                        )`,
                    boxShadow: isActive ? 'var(--shadow-soft)' : 'none',
                    transition: 'height 0.2s ease, background 0.2s ease, box-shadow 0.2s ease',
                  }}
                >
                  {isActive && (
                    <span
                      style={{
                        position: 'absolute',
                        top: -5,
                        left: '50%',
                        transform: 'translateX(-50%)',
                        width: 12,
                        height: 12,
                        borderRadius: '50%',
                        background: '#fff',
                        border: `3px solid ${theme['text-primary']}`,
                        boxSizing: 'border-box',
                      }}
                    />
                  )}
                </span>
              </button>
            );
          })}
        </div>

        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            gap: 6,
            marginTop: 10,
          }}
        >
          {yearData.map((bar, index) => (
            <span
              key={bar.label}
              style={{
                flex: 1,
                textAlign: 'center',
                fontSize: 11,
                fontWeight: index === activeIndex ? 600 : 500,
                color: index === activeIndex ? theme['text-primary'] : theme['text-muted'],
              }}
            >
              {bar.label}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
