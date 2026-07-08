import { useState } from 'react';
import { brandScale, colors, radius, spacing } from '../../styles/theme';

const theme = colors.light;

type Notice = {
  id: string;
  headline: string;
  body: string;
  author: string;
  datetime: string;
  initials: string;
};

const notices: Notice[] = [
  {
    id: '1',
    headline: 'Tomorrow is a Holiday!',
    body: 'Let us make a promise that we would not let the hard sacrifices of our brave freedom fighters go in vain. We would work hard to make our country the best in the world. Happy Republic Day!',
    author: 'HR Team',
    datetime: 'Jan 14th, 2021 · 10:30 AM',
    initials: 'HR',
  },
  {
    id: '2',
    headline: 'System maintenance window',
    body: 'A brief maintenance window is planned this weekend. Dashboard access may be intermittent between 2:00 AM and 4:00 AM. Please plan scans accordingly.',
    author: 'Ops Team',
    datetime: 'Mar 2nd, 2026 · 09:15 AM',
    initials: 'OT',
  },
  {
    id: '3',
    headline: 'New billing summary live',
    body: 'Your year-to-date and all-time billing figures are now reflected on the dashboard KPIs. Reach out to accounts if any number looks off.',
    author: 'Accounts',
    datetime: 'Jul 1st, 2026 · 11:00 AM',
    initials: 'AC',
  },
];

export function NoticeBoard() {
  const [index, setIndex] = useState(0);
  const notice = notices[index];

  const goPrev = () => setIndex((i) => (i === 0 ? notices.length - 1 : i - 1));
  const goNext = () => setIndex((i) => (i === notices.length - 1 ? 0 : i + 1));

  return (
    <section
      className="dash-card"
      style={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: 280,
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: spacing[4],
        }}
      >
        <h2 style={{ margin: 0, fontSize: 18, fontWeight: 700, letterSpacing: '-0.02em' }}>Notice board</h2>
        <div style={{ display: 'flex', gap: 6 }}>
          <button type="button" className="btn-icon" aria-label="Previous notice" onClick={goPrev} style={{ width: 32, height: 32 }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="m15 6-6 6 6 6" />
            </svg>
          </button>
          <button type="button" className="btn-icon" aria-label="Next notice" onClick={goNext} style={{ width: 32, height: 32 }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="m9 6 6 6-6 6" />
            </svg>
          </button>
        </div>
      </div>

      <h3
        style={{
          margin: `0 0 ${spacing[3]}`,
          fontSize: 16,
          fontWeight: 700,
          color: theme['text-primary'],
        }}
      >
        {notice.headline}
      </h3>
      <p
        style={{
          margin: 0,
          flex: 1,
          fontSize: 13,
          lineHeight: 1.55,
          color: theme['text-secondary'],
        }}
      >
        {notice.body}
      </p>

      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 10,
          marginTop: spacing[5],
          paddingTop: spacing[4],
          borderTop: `1px solid ${theme.border}`,
        }}
      >
        <div
          style={{
            width: 36,
            height: 36,
            borderRadius: '50%',
            background: `linear-gradient(135deg, ${brandScale.mid}, ${brandScale.base})`,
            color: '#fff',
            display: 'grid',
            placeItems: 'center',
            fontSize: 11,
            fontWeight: 700,
            flexShrink: 0,
          }}
        >
          {notice.initials}
        </div>
        <div style={{ lineHeight: 1.3 }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: theme['text-primary'] }}>{notice.author}</div>
          <div style={{ fontSize: 12, color: theme['text-muted'] }}>{notice.datetime}</div>
        </div>
        <span
          style={{
            marginLeft: 'auto',
            fontSize: 11,
            color: theme['text-muted'],
            background: theme['bg-surface'],
            borderRadius: radius.pill,
            padding: '4px 8px',
          }}
        >
          {index + 1}/{notices.length}
        </span>
      </div>
    </section>
  );
}
