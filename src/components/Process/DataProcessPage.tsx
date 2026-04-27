import { useMemo, useState } from 'react';
import { colors, spacing, typography, radius } from '../../styles/theme';
import TablePaginationFooter from '../ui/TablePaginationFooter';

const theme = colors.light;

const thStyle = {
  padding: `${spacing[1]} ${spacing[2]}`,
  height: '40px',
  background: theme['table-header-muted-secondary'],
  color: theme['text-primary'],
  fontSize: typography.sizes.xs.fontSize,
  fontWeight: 600,
  borderBottom: `1px solid ${theme['table-border']}`,
  fontFamily: typography.fonts.sans.family,
  whiteSpace: 'nowrap' as const,
} as const;

const tdStyle = {
  padding: `${spacing[1]} ${spacing[2]}`,
  borderBottom: `1px solid ${theme['table-border']}`,
  color: theme['text-primary'],
  fontSize: typography.sizes.xs.fontSize,
  fontFamily: typography.fonts.sans.family,
} as const;

type FingerprintRecord = {
  id: number;
  scanId: string;
  name: string;
  storedOn: string;
  processedBy: string;
  flagged: boolean;
};

const sampleRecords: FingerprintRecord[] = [
  {
    id: 1,
    scanId: 'S41347',
    name: 'Ashwin / Male / 21',
    storedOn: '2026-04-24',
    processedBy: 'Bhuvana',
    flagged: false,
  },
  {
    id: 2,
    scanId: 'S41348',
    name: 'Megha / Female / 18',
    storedOn: '2026-04-24',
    processedBy: 'Karthik',
    flagged: true,
  },
];

export default function DataProcessPage() {
  const [search, setSearch] = useState('');
  const [records, setRecords] = useState(sampleRecords);
  const [selectedIds, setSelectedIds] = useState<number[]>([]);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return records;
    return records.filter(
      (row) =>
        row.scanId.toLowerCase().includes(q) ||
        row.name.toLowerCase().includes(q) ||
        row.processedBy.toLowerCase().includes(q)
    );
  }, [records, search]);

  const handleFlag = (id: number) => {
    setRecords((prev) =>
      prev.map((row) => (row.id === id ? { ...row, flagged: true } : row))
    );
  };
  const allSelected = filtered.length > 0 && filtered.every((row) => selectedIds.includes(row.id));

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedIds(filtered.map((row) => row.id));
      return;
    }
    setSelectedIds([]);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: spacing[4] }}>
      <div
        style={{
          background: theme['bg-surface'],
          border: `1px solid ${theme.border}`,
          borderRadius: radius.lg,
          overflow: 'hidden',
          padding: spacing[5],
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            gap: spacing[3],
            marginBottom: spacing[3],
          }}
        >
          <h1
            style={{
              margin: 0,
              fontSize: typography.sizes.xl.fontSize,
              fontFamily: typography.fonts.heading.family,
              fontWeight: typography.fonts.heading.fontWeight,
              color: theme['text-primary'],
            }}
          >
            Fin. Data download
          </h1>
          <label
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: spacing[2],
              fontSize: typography.sizes.sm.fontSize,
              color: theme['text-secondary'],
              fontFamily: typography.fonts.sans.family,
              width: '100%',
            }}
          >
            Search:
            <input
              type="text"
              placeholder="Search..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{
                padding: `${spacing[2]} ${spacing[3]}`,
                width: 240,
                maxWidth: '100%',
                border: `1px solid ${theme.border}`,
                borderRadius: radius.sm,
                fontSize: typography.sizes.sm.fontSize,
                fontFamily: typography.fonts.sans.family,
                background: theme['bg-surface'],
                color: theme['text-primary'],
              }}
            />
          </label>
          <h2
            style={{
              margin: 0,
              width: '100%',
              textAlign: 'center',
              fontSize: typography.sizes.xl.fontSize,
              fontFamily: typography.fonts.heading.family,
              fontWeight: typography.fonts.heading.fontWeight,
              color: theme['text-primary'],
            }}
          >
            Data Download
          </h2>
          <div style={{ display: 'flex', alignItems: 'center', gap: spacing[4] }}>
            <label style={{ fontSize: typography.sizes.sm.fontSize }}>
              <input
                type="checkbox"
                checked={allSelected}
                onChange={(e) => handleSelectAll(e.target.checked)}
                style={{ marginRight: spacing[1] }}
              />
              Select all
            </label>
            <span style={{ fontSize: typography.sizes.sm.fontSize, color: theme['text-secondary'] }}>
              Custom selection enabled
            </span>
          </div>
        </div>

        <style>{`
          .process-data-table-body tr:nth-child(even) { background: ${theme['table-zebra']}; }
          .process-data-table-body tr:hover { background: ${theme['table-row-hover']}; }
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
                <th style={{ ...thStyle, textAlign: 'center', minWidth: 60 }}>Select</th>
                <th style={{ ...thStyle, textAlign: 'center', minWidth: 60 }}>Sno</th>
                <th style={{ ...thStyle, textAlign: 'left', minWidth: 90 }}>Scan Id</th>
                <th style={{ ...thStyle, textAlign: 'left', minWidth: 180 }}>Name</th>
                <th style={{ ...thStyle, textAlign: 'left', minWidth: 120 }}>Stored On</th>
                <th style={{ ...thStyle, textAlign: 'left', minWidth: 140 }}>Processed By</th>
                <th style={{ ...thStyle, textAlign: 'left', minWidth: 120 }}>Status</th>
                <th style={{ ...thStyle, textAlign: 'center', minWidth: 110 }}>Flag</th>
              </tr>
            </thead>
            <tbody className="process-data-table-body">
              {filtered.length === 0 ? (
                <tr>
                  <td
                    colSpan={8}
                    style={{
                      padding: spacing[8],
                      textAlign: 'center',
                      color: theme['text-muted'],
                      fontSize: typography.sizes.sm.fontSize,
                      fontFamily: typography.fonts.sans.family,
                      background: theme['bg-surface'],
                    }}
                  >
                    No records found
                  </td>
                </tr>
              ) : (
                filtered.map((row, index) => (
                  <tr key={row.id} style={{ height: 40 }}>
                    <td style={{ ...tdStyle, textAlign: 'center' }}>
                      <input
                        type="checkbox"
                        checked={selectedIds.includes(row.id)}
                        onChange={(e) => {
                          setSelectedIds((prev) =>
                            e.target.checked ? [...prev, row.id] : prev.filter((id) => id !== row.id)
                          );
                        }}
                      />
                    </td>
                    <td style={{ ...tdStyle, textAlign: 'center' }}>{index + 1}</td>
                    <td style={tdStyle}>
                      <span
                        style={{
                          display: 'inline-block',
                          padding: `${spacing[1]} ${spacing[3]}`,
                          border: `1px solid ${theme.info}`,
                          background: theme['info-bg'],
                          color: theme.info,
                          borderRadius: radius.pill,
                          fontSize: typography.sizes.xs.fontSize,
                          fontFamily: typography.fonts.sans.family,
                          fontWeight: 500,
                        }}
                      >
                        {row.scanId}
                      </span>
                    </td>
                    <td style={tdStyle}>{row.name}</td>
                    <td style={tdStyle}>{row.storedOn}</td>
                    <td style={tdStyle}>{row.processedBy}</td>
                    <td style={tdStyle}>
                      <span
                        style={{
                          display: 'inline-block',
                          padding: `${spacing[1]} ${spacing[3]}`,
                          borderRadius: radius.pill,
                          border: `1px solid ${row.flagged ? theme.warning : theme.success}`,
                          fontSize: typography.sizes.xs.fontSize,
                          fontFamily: typography.fonts.sans.family,
                          fontWeight: 500,
                          background: row.flagged ? theme['warning-bg'] : theme['success-bg'],
                          color: row.flagged ? theme.warning : theme.success,
                        }}
                      >
                        {row.flagged ? 'Moved to review queue' : 'Stored'}
                      </span>
                    </td>
                    <td style={{ ...tdStyle, textAlign: 'center' }}>
                      <button
                        type="button"
                        disabled={row.flagged}
                        onClick={() => handleFlag(row.id)}
                        style={{
                          display: 'inline-block',
                          padding: `${spacing[1]} ${spacing[3]}`,
                          borderRadius: radius.pill,
                          border: `1px solid ${row.flagged ? theme['btn-disabled-text'] : theme.warning}`,
                          fontSize: typography.sizes.xs.fontSize,
                          fontFamily: typography.fonts.sans.family,
                          fontWeight: 500,
                          background: row.flagged ? theme['btn-disabled-bg'] : theme['warning-bg'],
                          color: row.flagged ? theme['btn-disabled-text'] : theme.warning,
                          cursor: row.flagged ? 'not-allowed' : 'pointer',
                        }}
                      >
                        {row.flagged ? 'Flagged' : 'Flag for Review'}
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        <TablePaginationFooter
          summary={
            filtered.length === 0
              ? 'Showing 0 to 0 of 0 entries'
              : `Showing 1 to ${filtered.length} of ${filtered.length} entries`
          }
        />
      </div>
    </div>
  );
}
