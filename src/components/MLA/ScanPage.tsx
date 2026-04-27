import { useRef, useState } from 'react';
import { X } from 'lucide-react';
import {
  colors,
  spacing,
  radius,
  typography,
  tableTokens,
  buttonTokens,
} from '../../styles/theme';
import AppModal from '../ui/AppModal';

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
  const [showDeclaration, setShowDeclaration] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<number | null>(null);
  const [selectedFileName, setSelectedFileName] = useState('No file chosen');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const hasFile = selectedFileName !== 'No file chosen';

  const clearSelectedFile = () => {
    if (fileInputRef.current) fileInputRef.current.value = '';
    setSelectedFileName('No file chosen');
  };

  const handleUpload = () => {
    if (!declarationChecked || !hasFile) return;
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
              background: theme['bg-surface'],
              borderRadius: radius.sm,
              padding: spacing[4],
              border: `1px solid ${theme.border}`,
            }}
          >
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'space-between',
                gap: spacing[3],
                alignItems: 'center',
                marginBottom: spacing[3],
              }}
            >
              <label
                style={{
                  display: 'block',
                  fontSize: typography.sizes.sm.fontSize,
                  fontWeight: 600,
                  color: theme['text-primary'],
                  fontFamily: typography.fonts.sans.family,
                }}
              >
                Upload data
              </label>
              <span
                style={{
                  fontSize: typography.sizes.xs.fontSize,
                  color: theme['text-secondary'],
                  fontFamily: typography.fonts.sans.family,
                }}
              >
                ZIP only
              </span>
            </div>

            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: spacing[2],
                marginBottom: spacing[2],
                padding: spacing[2],
                borderRadius: radius.sm,
                border: `1px solid ${theme.border}`,
                background: theme['bg-base'],
              }}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept=".zip"
                id="scan-upload"
                style={{ display: 'none' }}
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  setSelectedFileName(file ? file.name : 'No file chosen');
                }}
              />
              <label
                htmlFor="scan-upload"
                style={{
                  padding: `${spacing[2]} ${spacing[3]}`,
                  background: theme['primary-soft'],
                  color: theme.primary,
                  borderRadius: radius.sm,
                  fontSize: typography.sizes.sm.fontSize,
                  fontFamily: typography.fonts.sans.family,
                  fontWeight: 600,
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                }}
              >
                Choose file
              </label>
              <span
                style={{
                  fontSize: typography.sizes.sm.fontSize,
                  color: theme['text-muted'],
                  flex: 1,
                  minWidth: 0,
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                }}
                title={hasFile ? selectedFileName : undefined}
              >
                {selectedFileName}
              </span>
              {hasFile ? (
                <button
                  type="button"
                  onClick={clearSelectedFile}
                  aria-label="Remove selected file"
                  title="Remove file"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                    width: 32,
                    height: 32,
                    padding: 0,
                    border: `1px solid ${theme.border}`,
                    borderRadius: radius.sm,
                    background: theme['bg-surface'],
                    color: theme['text-secondary'],
                    cursor: 'pointer',
                  }}
                >
                  <X size={16} strokeWidth={2.25} />
                </button>
              ) : null}
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
                gap: 0,
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
                style={{ marginRight: spacing[2] }}
              />
              <span
                style={{
                  display: 'inline-flex',
                  flexWrap: 'wrap',
                  alignItems: 'center',
                  columnGap: 0,
                  minWidth: 0,
                }}
              >
                <span style={{ whiteSpace: 'pre' }}>I have read the </span>
                <button
                  type="button"
                  onClick={() => setShowDeclaration(true)}
                  style={{
                    border: 'none',
                    background: 'transparent',
                    color: theme.error,
                    fontSize: typography.sizes.sm.fontSize,
                    fontFamily: typography.fonts.sans.family,
                    textDecoration: 'underline',
                    cursor: 'pointer',
                    padding: 0,
                    margin: 0,
                    verticalAlign: 'baseline',
                  }}
                >
                  Declaration
                </button>
              </span>
            </label>
            <button
              type="button"
              onClick={handleUpload}
              disabled={!declarationChecked || !hasFile}
              style={{
                minHeight: buttonTokens.height.md,
                padding: `${spacing[2]} ${spacing[5]}`,
                background:
                  declarationChecked && hasFile ? theme['btn-primary-bg'] : theme['btn-disabled-bg'],
                color:
                  declarationChecked && hasFile ? theme['btn-primary-text'] : theme['btn-disabled-text'],
                border: 'none',
                borderRadius: radius.sm,
                fontSize: typography.sizes.sm.fontSize,
                fontFamily: typography.fonts.sans.family,
                fontWeight: 600,
                cursor: declarationChecked && hasFile ? 'pointer' : 'not-allowed',
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

      <AppModal
        open={showDeclaration}
        onClose={() => setShowDeclaration(false)}
        titleId="scan-declaration-title"
        ariaLabel="Declaration"
        title="Declaration"
        subtitle="Please read and confirm you understand the following."
        maxWidthPx={980}
        maxHeight="85vh"
      >
        <ol
          style={{
            margin: 0,
            padding: `0 0 0 ${spacing[6]}`,
            display: 'grid',
            gap: spacing[3],
            color: theme['text-primary'],
            fontFamily: typography.fonts.sans.family,
            fontSize: typography.sizes.base.fontSize,
            lineHeight: 1.5,
          }}
        >
          <li>I have explained to the Client / Parent about the process of Fingerprint scanning and the scope of Genetic Brain Profiling Reports.</li>
          <li>I have taken the due consent form signed and will retain it as long as it is needed.</li>
          <li>I have inspected the finger prints carefully and found it meeting the guidelines.</li>
          <li>I am aware that CW processing is available between 8 AM to 6 PM only.</li>
          <li>Bulk scans if any will be uploaded after getting due consent from the Head Office.</li>
          <li>I am aware that the fingerprints can be deleted from the webserver by me once the report is generated/counseled.</li>
          <li>I take the full responsibility of housekeeping of my scans and archiving of reports.</li>
          <li>I will comply with the guidelines for service delivery expected by MiDNA Global.</li>
        </ol>
      </AppModal>
    </div>
  );
}
