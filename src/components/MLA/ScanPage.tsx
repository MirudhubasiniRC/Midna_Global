import { useState } from 'react';
import {
  colors,
  spacing,
  radius,
  typography,
  tableTokens,
  buttonTokens,
} from '../../styles/theme';

const theme = colors.light;

const thStyle = {
  padding: spacing[2],
  height: tableTokens.rowHeight,
  background: theme['table-header-muted-secondary'],
  color: theme['text-primary'],
  fontSize: typography.sizes.sm.fontSize,
  fontWeight: 600,
  borderBottom: `1px solid ${theme['table-border']}`,
  fontFamily: typography.fonts.sans.family,
} as const;

export default function ScanPage() {
  const [declarationChecked, setDeclarationChecked] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<number | null>(null);

  const handleUpload = () => {
    if (!declarationChecked) return;
    setUploadProgress(0);
    const interval = setInterval(() => {
      setUploadProgress((p) => {
        if (p === null || p >= 100) {
          clearInterval(interval);
          return 100;
        }
        return p + 10;
      });
    }, 300);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: spacing[6] }}>
      {/* Upload section - separate card */}
      <div
        style={{
          background: theme['bg-surface'],
          borderRadius: radius.lg,
          border: `1px solid ${theme.border}`,
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            padding: spacing[4],
            borderBottom: `1px solid ${theme.border}`,
          }}
        >
          <h2
            style={{
              margin: 0,
              fontSize: typography.sizes.xl.fontSize,
              fontWeight: typography.fonts.heading.fontWeight,
              fontFamily: typography.fonts.heading.family,
              color: theme['text-primary'],
            }}
          >
            Upload Scan
          </h2>
        </div>
        <div style={{ padding: spacing[5] }}>
          <div
            style={{
              background: theme['bg-base'],
              borderRadius: radius.md,
              padding: spacing[5],
              border: `1px solid ${theme.border}`,
            }}
          >
            <label
              style={{
                display: 'block',
                fontSize: typography.sizes.sm.fontSize,
                fontWeight: 500,
                color: theme['text-primary'],
                marginBottom: spacing[2],
                fontFamily: typography.fonts.sans.family,
              }}
            >
              Upload data
            </label>
            <div style={{ display: 'flex', alignItems: 'center', gap: spacing[2], marginBottom: spacing[2] }}>
              <input
                type="file"
                accept=".zip"
                id="scan-upload"
                style={{ display: 'none' }}
              />
              <label
                htmlFor="scan-upload"
                style={{
                  padding: buttonTokens.padding.sm,
                  background: theme['btn-secondary-bg'],
                  color: theme['btn-secondary-text'],
                  borderRadius: radius.sm,
                  fontSize: typography.sizes.sm.fontSize,
                  fontFamily: typography.fonts.sans.family,
                  cursor: 'pointer',
                }}
              >
                Choose file
              </label>
              <span style={{ fontSize: typography.sizes.sm.fontSize, color: theme['text-muted'] }}>
                No file chosen
              </span>
            </div>
            <p
              style={{
                margin: `0 0 ${spacing[4]} 0`,
                fontSize: typography.sizes.xs.fontSize,
                color: theme['text-secondary'],
                fontFamily: typography.fonts.sans.family,
              }}
            >
              Note: Upload only zip file.
            </p>
            <label
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: spacing[2],
                marginBottom: spacing[4],
                fontSize: typography.sizes.sm.fontSize,
                fontFamily: typography.fonts.sans.family,
                color: theme['text-primary'],
                cursor: 'pointer',
              }}
            >
              <input
                type="checkbox"
                checked={declarationChecked}
                onChange={(e) => setDeclarationChecked(e.target.checked)}
              />
              I have read the{' '}
              <span style={{ color: theme.error }}>Declaration</span>
            </label>
            <button
              type="button"
              onClick={handleUpload}
              disabled={!declarationChecked}
              style={{
                padding: buttonTokens.padding.md,
                background: declarationChecked ? theme['btn-primary-bg'] : theme['btn-disabled-bg'],
                color: declarationChecked ? theme['btn-primary-text'] : theme['btn-disabled-text'],
                border: 'none',
                borderRadius: radius.sm,
                fontSize: typography.sizes.sm.fontSize,
                fontFamily: typography.fonts.sans.family,
                fontWeight: 600,
                cursor: declarationChecked ? 'pointer' : 'not-allowed',
              }}
            >
              Upload
            </button>
          </div>
          {uploadProgress !== null && (
            <div style={{ marginTop: spacing[4] }}>
              <div
                style={{
                  height: 8,
                  borderRadius: radius.sm,
                  background: theme['bg-base'],
                  overflow: 'hidden',
                }}
              >
                <div
                  style={{
                    height: '100%',
                    width: `${uploadProgress}%`,
                    background: `linear-gradient(90deg, ${theme.primary}, ${theme.secondary})`,
                    transition: 'width 0.3s ease',
                  }}
                />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Scans For Processing - separate card */}
      <div
        style={{
          background: theme['bg-surface'],
          borderRadius: radius.lg,
          overflow: 'hidden',
          border: `1px solid ${theme.border}`,
          padding: spacing[5],
        }}
      >
        <div style={{ marginBottom: spacing[4] }}>
          <h2
            style={{
              margin: 0,
              fontSize: typography.sizes.xl.fontSize,
              fontWeight: typography.fonts.heading.fontWeight,
              fontFamily: typography.fonts.heading.family,
              color: theme['text-primary'],
              textAlign: 'center',
            }}
          >
            Scans for processing
          </h2>
        </div>
        <style>{`
          .scan-table-body tr:nth-child(even) { background: ${theme['table-zebra']}; }
          .scan-table-body tr:hover { background: ${theme['table-row-hover']}; }
        `}</style>
        <div style={{ overflowX: 'auto', borderRadius: radius.sm, border: `1px solid ${theme.border}` }}>
          <table
            style={{
              width: '100%',
              borderCollapse: 'collapse',
              fontFamily: typography.fonts.sans.family,
            }}
          >
            <thead>
              <tr>
                <th style={{ ...thStyle, textAlign: 'center', width: 50 }}>Sno</th>
                <th style={{ ...thStyle, textAlign: 'left' }}>Scan Id</th>
                <th style={{ ...thStyle, textAlign: 'left' }}>Name</th>
                <th style={{ ...thStyle, textAlign: 'center' }}>Gender</th>
                <th style={{ ...thStyle, textAlign: 'center' }}>Age</th>
                <th style={{ ...thStyle, textAlign: 'left' }}>Billing Name</th>
                <th style={{ ...thStyle, textAlign: 'left' }}>Ref By</th>
                <th style={{ ...thStyle, textAlign: 'center' }}>QC Check</th>
                <th style={{ ...thStyle, textAlign: 'center' }}>Data Edit</th>
                <th style={{ ...thStyle, textAlign: 'center' }}>Delete</th>
              </tr>
            </thead>
            <tbody className="scan-table-body">
              <tr>
                <td
                  colSpan={10}
                  style={{
                    padding: spacing[8],
                    textAlign: 'center',
                    color: theme['text-muted'],
                    fontSize: typography.sizes.sm.fontSize,
                  }}
                >
                  No scans for processing
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
