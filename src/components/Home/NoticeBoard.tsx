import { AlertCircle } from 'lucide-react';
import { colors, spacing, radius, typography } from '../../styles/theme';

const theme = colors.light;

const notices = [
  'Alert !!!!!!!! - MLAs with Zero scans in last 30 days will be denied Login Rights. Please request for activation when required.',
  'Kind Attn: MiDNA Brand Ambassadors! Please select "Special Offer" as Client type while uploading scans for "MIDNA Jodi Offer" to get refund for the "Wife Scan".',
  'Wef 1.1.26 No need to share the consent forms in whatsapp group. Please keep it with you for statutory Requirement. Your declaration while uploading the scans is enough for H.O records. You are responsible for the Liabilities due to Lapses in maintaining the SOP. Please take care.',
  'Penalty for Unprofessional scanning: Scans without clear Delta / Centers inclusions will be rejected with Rs 250/- Penalty as NCD- Unprofessional Scanning... will require Re-Scanning ... please pay attention / check before exporting scans..',
];

export default function NoticeBoard() {
  return (
    <>
      <style>{`
        @keyframes noticeBlink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.3; }
        }
        @keyframes noticeBorderBlink {
          0%, 100% {
            border-color: ${theme.border};
            box-shadow: 0 0 0 0 ${theme['error-bg']};
          }
          50% {
            border-color: ${theme.error};
            box-shadow: 0 0 0 3px ${theme['error-bg']};
          }
        }
        .notice-alert-icon {
          animation: noticeBlink 1.2s ease-in-out infinite;
        }
        .notice-board-frame {
          border: 1px solid ${theme.border};
          animation: noticeBorderBlink 1.2s ease-in-out infinite;
        }
      `}</style>
      <div
        className="notice-board-frame"
        style={{
          flex: 1,
          minHeight: 0,
          display: 'flex',
          flexDirection: 'column',
          background: theme['bg-surface'],
          borderRadius: radius.lg,
          padding: spacing[5],
          overflow: 'hidden',
        }}
      >
        <div style={{ marginBottom: spacing[5], flexShrink: 0 }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: spacing[2],
            }}
          >
            <span className="notice-alert-icon" style={{ display: 'flex' }}>
              <AlertCircle size={22} style={{ flexShrink: 0, color: theme.error }} />
            </span>
            <h2
              style={{
                margin: 0,
                fontSize: typography.sizes.xl.fontSize,
                fontWeight: typography.fonts.heading.fontWeight,
                fontFamily: typography.fonts.heading.family,
                color: theme['text-primary'],
                textAlign: 'left',
              }}
            >
              Notice board
            </h2>
          </div>
          <p
            style={{
              margin: `${spacing[2]} 0 0 0`,
              paddingLeft: 34,
              fontSize: typography.sizes.sm.fontSize,
              fontWeight: 400,
              fontFamily: typography.fonts.sans.family,
              color: theme['text-secondary'],
              lineHeight: 1.5,
            }}
          >
            Important announcements and updates
          </p>
        </div>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: spacing[3],
            flex: 1,
            minHeight: 0,
            overflowY: 'auto',
          }}
        >
          {notices.map((text, i) => (
            <div
              key={i}
            style={{
              background: theme['table-header-bg'],
              borderRadius: radius.sm,
              padding: spacing[3],
              color: theme['text-primary'],
                fontSize: typography.sizes.sm.fontSize,
                lineHeight: 1.5,
                fontFamily: typography.fonts.sans.family,
              }}
            >
              {text}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
