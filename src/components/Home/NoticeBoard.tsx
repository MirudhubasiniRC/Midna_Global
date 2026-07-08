import { colors, layoutTokens, radius, severityTokens, spacing, type SeverityLevel } from '../../styles/theme';

const theme = colors.light;

type Notice = {
  id: string;
  severity: SeverityLevel;
  headline: string;
  body: string;
  author: string;
  datetime: string;
  initials: string;
};

const notices: Notice[] = [
  {
    id: '1',
    severity: 'low',
    headline: 'Tomorrow is a Holiday!',
    body: 'Let us make a promise that we would not let the hard sacrifices of our brave freedom fighters go in vain. We would work hard to make our country the best in the world. Happy Republic Day!',
    author: 'HR Team',
    datetime: 'Jan 14th, 2021 · 10:30 AM',
    initials: 'HR',
  },
  {
    id: '2',
    severity: 'high',
    headline: 'System maintenance window',
    body: 'A brief maintenance window is planned this weekend. Dashboard access may be intermittent between 2:00 AM and 4:00 AM. Please plan scans accordingly.',
    author: 'Ops Team',
    datetime: 'Mar 2nd, 2026 · 09:15 AM',
    initials: 'OT',
  },
  {
    id: '3',
    severity: 'medium',
    headline: 'New billing summary live',
    body: 'Your year-to-date and all-time billing figures are now reflected on the dashboard KPIs. Reach out to accounts if any number looks off.',
    author: 'Accounts',
    datetime: 'Jul 1st, 2026 · 11:00 AM',
    initials: 'AC',
  },
];

const severityIcon: Record<SeverityLevel, React.ReactNode> = {
  high: (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0Z" />
      <line x1="12" y1="9" x2="12" y2="13" />
      <line x1="12" y1="17" x2="12.01" y2="17" />
    </svg>
  ),
  medium: (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="8" x2="12" y2="12" />
      <line x1="12" y1="16" x2="12.01" y2="16" />
    </svg>
  ),
  low: (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9" />
      <path d="M13.73 21a2 2 0 0 1-3.46 0" />
    </svg>
  ),
};

export function NoticeBoard() {
  return (
    <section
      className="dash-card"
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: layoutTokens.homeLowerCardHeight,
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: spacing[4],
          flexShrink: 0,
        }}
      >
        <h2 style={{ margin: 0, fontSize: 18, fontWeight: 700, letterSpacing: '-0.02em' }}>Notice board</h2>
        <span style={{ fontSize: 12, color: theme['text-muted'] }}>
          {notices.length} notice{notices.length === 1 ? '' : 's'}
        </span>
      </div>

      <div
        className="notice-scroll"
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: spacing[3],
          flex: '1 1 auto',
          minHeight: 0,
          overflowY: 'auto',
          paddingRight: 4,
          marginRight: -4,
        }}
      >
        {notices.map((notice) => {
          const tone = severityTokens[notice.severity];
          return (
            <article
              key={notice.id}
              style={{
                borderRadius: radius.md,
                border: `1px solid ${tone.border}`,
                background: tone.bg,
                padding: spacing[4],
              }}
            >
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
                <span
                  style={{
                    width: 24,
                    height: 24,
                    borderRadius: '50%',
                    display: 'grid',
                    placeItems: 'center',
                    flexShrink: 0,
                    marginTop: 1,
                    background: theme['bg-surface'],
                    color: tone.icon,
                  }}
                >
                  {severityIcon[notice.severity]}
                </span>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <h3
                    style={{
                      margin: 0,
                      fontSize: 14,
                      fontWeight: 700,
                      color: tone.text,
                    }}
                  >
                    {notice.headline}
                  </h3>
                  <p
                    style={{
                      margin: '6px 0 0',
                      fontSize: 13,
                      lineHeight: 1.55,
                      color: theme['text-secondary'],
                    }}
                  >
                    {notice.body}
                  </p>

                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 12 }}>
                    <div
                      style={{
                        width: 24,
                        height: 24,
                        borderRadius: '50%',
                        background: theme['bg-surface'],
                        color: theme['text-secondary'],
                        display: 'grid',
                        placeItems: 'center',
                        fontSize: 10,
                        fontWeight: 700,
                        flexShrink: 0,
                      }}
                    >
                      {notice.initials}
                    </div>
                    <span style={{ fontSize: 12, fontWeight: 600, color: theme['text-primary'] }}>{notice.author}</span>
                    <span style={{ fontSize: 12, color: theme['text-muted'] }}>· {notice.datetime}</span>
                  </div>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
