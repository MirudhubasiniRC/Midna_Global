import { useEffect, useMemo, useState, type ReactNode } from 'react';
import {
  colors,
  spacing,
  radius,
  typography,
  inputTokens,
} from '../../styles/theme';
import Pagination from '../ui/Pagination';
import TablePaginationFooter from '../ui/TablePaginationFooter';

const theme = colors.light;

type ABCLedgerRow = {
  sno: number;
  ledgerName: string;
  mobile: string;
  city: string;
  status: string;
  billingPct: number;
  lastScan: string;
  seDate: string;
  crDate: string;
  credits: number;
  debits: number;
  clBal: number;
  transfer: string;
};

const ABC_DATA: ABCLedgerRow[] = [
  {
    sno: 1,
    ledgerName: 'MiDNA (H.O)',
    mobile: '9364233342',
    city: 'Coimbatore',
    status: 'Admin',
    billingPct: 40,
    lastScan: '+118 Days Ago',
    seDate: '31/03/2027',
    crDate: '2026-01-25',
    credits: 150315,
    debits: 172339,
    clBal: 22024,
    transfer: 'ABC',
  },
];

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
  color: theme['text-primary'],
  fontSize: typography.sizes.xs.fontSize,
  fontWeight: 400,
  borderBottom: `1px solid ${theme['table-border']}`,
  fontFamily: typography.fonts.sans.family,
} as const;

function Th({
  children,
  align = 'left' as const,
}: {
  children: ReactNode;
  align?: 'left' | 'center' | 'right';
}) {
  return (
    <th style={{ ...thStyle, textAlign: align }}>
      {children}
    </th>
  );
}

/** Overdue-style last scan (e.g. +118 Days Ago) — blinking red per legacy portal */
function isLastScanOverdueWarning(value: string): boolean {
  const v = value.trim();
  return /^\+\d+/.test(v) && /days?\s*ago/i.test(v);
}

function LastScanCell({ value }: { value: string }) {
  const isOverdueWarning = isLastScanOverdueWarning(value);
  return (
    <span
      className={isOverdueWarning ? 'abc-ledger-last-scan-blink' : undefined}
      style={{
        color: isOverdueWarning ? theme.error : theme['text-primary'],
        fontWeight: isOverdueWarning ? 600 : 400,
      }}
    >
      {value}
    </span>
  );
}

function fmtNum(n: number) {
  return String(n);
}

export default function ABCLedgerPage() {
  const [pageSize, setPageSize] = useState(20);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState('');
  const [selectedLedger, setSelectedLedger] = useState<ABCLedgerRow | null>(null);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return ABC_DATA;
    return ABC_DATA.filter(
      (r) =>
        String(r.sno).includes(q) ||
        r.ledgerName.toLowerCase().includes(q) ||
        r.mobile.includes(q) ||
        r.city.toLowerCase().includes(q) ||
        r.status.toLowerCase().includes(q) ||
        String(r.billingPct).includes(q) ||
        r.lastScan.toLowerCase().includes(q) ||
        r.seDate.includes(q) ||
        r.crDate.includes(q) ||
        fmtNum(r.credits).includes(q) ||
        fmtNum(r.debits).includes(q) ||
        fmtNum(r.clBal).includes(q) ||
        r.transfer.toLowerCase().includes(q)
    );
  }, [search]);

  const totalCredits = filtered.reduce((s, r) => s + r.credits, 0);
  const totalDebits = filtered.reduce((s, r) => s + r.debits, 0);
  const totalClBal = filtered.reduce((s, r) => s + r.clBal, 0);
  const totalTransfer = filtered.reduce((s, r) => {
    const n = Number(r.transfer);
    return s + (Number.isFinite(n) ? n : 0);
  }, 0);

  const totalEntries = filtered.length;
  const totalPages =
    totalEntries === 0 ? 0 : Math.max(1, Math.ceil(totalEntries / pageSize));

  useEffect(() => {
    if (totalPages === 0) return;
    setCurrentPage((p) => Math.min(p, totalPages));
  }, [totalPages]);

  const safePage = totalPages === 0 ? 1 : Math.min(currentPage, totalPages);
  const from = totalEntries === 0 ? 0 : (safePage - 1) * pageSize + 1;
  const to = Math.min(safePage * pageSize, totalEntries);
  const pageRows = filtered.slice((safePage - 1) * pageSize, safePage * pageSize);

  const emptyBodyMessage =
    search.trim() && totalEntries === 0
      ? 'No records match your search.'
      : 'No data available in table';

  return (
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
          }}
        >
          My ABC Ledger
        </h2>
        <p
          style={{
            margin: `${spacing[2]} 0 0`,
            fontSize: typography.sizes.sm.fontSize,
            color: theme['text-secondary'],
            fontFamily: typography.fonts.sans.family,
            lineHeight: 1.5,
          }}
        >
          ABC network ledger balances and scan status
        </p>
      </div>

      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: spacing[4],
          marginBottom: spacing[4],
        }}
      >
        <label
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: spacing[2],
            fontSize: typography.sizes.sm.fontSize,
            fontFamily: typography.fonts.sans.family,
            color: theme['text-secondary'],
            flex: '1 1 200px',
            minWidth: 0,
          }}
        >
          Search:
          <input
            type="search"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1);
            }}
            placeholder="Search..."
            style={{
              flex: 1,
              maxWidth: 360,
              padding: `${spacing[2]} ${spacing[3]}`,
              borderRadius: radius.sm,
              border: `1px solid ${theme.border}`,
              fontSize: typography.sizes.sm.fontSize,
              fontFamily: typography.fonts.sans.family,
              color: theme['text-primary'],
              minWidth: 160,
            }}
          />
        </label>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: spacing[2],
            flexShrink: 0,
            marginLeft: 'auto',
          }}
        >
          <span
            style={{
              fontSize: typography.sizes.sm.fontSize,
              color: theme['text-secondary'],
              fontFamily: typography.fonts.sans.family,
            }}
          >
            Show
          </span>
          <select
            value={pageSize}
            onChange={(e) => {
              setPageSize(Number(e.target.value));
              setCurrentPage(1);
            }}
            style={{
              padding: `${spacing[1]} ${spacing[2]}`,
              borderRadius: radius.sm,
              border: `1px solid ${theme.border}`,
              fontSize: typography.sizes.sm.fontSize,
              fontFamily: typography.fonts.sans.family,
              color: theme['text-primary'],
              background: theme['bg-surface'],
              height: inputTokens.height.sm,
            }}
          >
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={50}>50</option>
          </select>
          <span
            style={{
              fontSize: typography.sizes.sm.fontSize,
              color: theme['text-secondary'],
              fontFamily: typography.fonts.sans.family,
            }}
          >
            records per page
          </span>
        </div>
      </div>

      <style>{`
        @keyframes abcLedgerLastScanBlink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }
        .abc-ledger-last-scan-blink {
          animation: abcLedgerLastScanBlink 1.25s ease-in-out infinite;
        }
        @media (prefers-reduced-motion: reduce) {
          .abc-ledger-last-scan-blink {
            animation: none;
            opacity: 1;
          }
        }
        .abc-ledger-table-body tr:nth-child(even) { background: ${theme['table-zebra']}; }
        .abc-ledger-table-body tr:hover { background: ${theme['table-row-hover']}; }
      `}</style>
      <div
        style={{
          border: `1px solid ${theme.border}`,
          borderRadius: radius.sm,
          overflow: 'hidden',
        }}
      >
        <div style={{ overflowX: 'auto' }}>
          <table
            style={{
              width: '100%',
              borderCollapse: 'collapse',
              fontFamily: typography.fonts.sans.family,
              minWidth: 1200,
            }}
          >
            <thead>
              <tr>
                <Th align="center">Sno</Th>
                <Th>Ledger Name</Th>
                <Th>Mobile No</Th>
                <Th>City</Th>
                <Th>Status</Th>
                <Th align="right">% Billing</Th>
                <Th align="center">Last Scan</Th>
                <Th>SE_Date</Th>
                <Th>CR_Date</Th>
                <Th align="right">Credits</Th>
                <Th align="right">Debits</Th>
                <Th align="right">CL.BAL</Th>
                <Th align="center">Transfer</Th>
              </tr>
            </thead>
            <tbody className="abc-ledger-table-body">
              {pageRows.length === 0 ? (
                <tr>
                  <td
                    colSpan={13}
                    style={{
                      ...tdStyle,
                      textAlign: 'center',
                      padding: spacing[8],
                      color: theme['text-secondary'],
                      fontSize: typography.sizes.sm.fontSize,
                    }}
                  >
                    {emptyBodyMessage}
                  </td>
                </tr>
              ) : (
                pageRows.map((row) => (
                  <tr key={row.sno} style={{ height: '40px' }}>
                    <td style={{ ...tdStyle, textAlign: 'center' }}>{row.sno}</td>
                    <td style={tdStyle}>
                      <button
                        type="button"
                        onClick={() => setSelectedLedger(row)}
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
                          cursor: 'pointer',
                        }}
                      >
                        {row.ledgerName}
                      </button>
                    </td>
                    <td style={tdStyle}>{row.mobile}</td>
                    <td style={tdStyle}>{row.city}</td>
                    <td style={tdStyle}>{row.status}</td>
                    <td style={{ ...tdStyle, textAlign: 'right' }}>{row.billingPct}</td>
                    <td style={{ ...tdStyle, textAlign: 'center' }}>
                      <LastScanCell value={row.lastScan} />
                    </td>
                    <td style={tdStyle}>{row.seDate}</td>
                    <td style={tdStyle}>{row.crDate}</td>
                    <td style={{ ...tdStyle, textAlign: 'right' }}>{fmtNum(row.credits)}</td>
                    <td style={{ ...tdStyle, textAlign: 'right' }}>{fmtNum(row.debits)}</td>
                    <td style={{ ...tdStyle, textAlign: 'right' }}>{fmtNum(row.clBal)}</td>
                    <td style={{ ...tdStyle, textAlign: 'center' }}>{row.transfer}</td>
                  </tr>
                ))
              )}
            </tbody>
            {totalEntries > 0 && (
              <tfoot>
                <tr
                  style={{
                    background: theme['table-header-muted-secondary'],
                    fontWeight: 600,
                    fontSize: typography.sizes.xs.fontSize,
                    fontFamily: typography.fonts.sans.family,
                  }}
                >
                  <td
                    colSpan={9}
                    style={{
                      ...tdStyle,
                      textAlign: 'right',
                      borderTop: `1px solid ${theme['table-border']}`,
                    }}
                  >
                    Total
                  </td>
                  <td
                    style={{
                      ...tdStyle,
                      textAlign: 'right',
                      borderTop: `1px solid ${theme['table-border']}`,
                    }}
                  >
                    {fmtNum(totalCredits)}
                  </td>
                  <td
                    style={{
                      ...tdStyle,
                      textAlign: 'right',
                      borderTop: `1px solid ${theme['table-border']}`,
                    }}
                  >
                    {fmtNum(totalDebits)}
                  </td>
                  <td
                    style={{
                      ...tdStyle,
                      textAlign: 'right',
                      borderTop: `1px solid ${theme['table-border']}`,
                    }}
                  >
                    {fmtNum(totalClBal)}
                  </td>
                  <td
                    style={{
                      ...tdStyle,
                      textAlign: 'center',
                      borderTop: `1px solid ${theme['table-border']}`,
                    }}
                  >
                    {totalTransfer}
                  </td>
                </tr>
              </tfoot>
            )}
          </table>
        </div>
        <TablePaginationFooter
          summary={
            totalEntries === 0
              ? 'Showing 0 to 0 of 0 entries'
              : `Showing ${from} to ${to} of ${totalEntries} entries`
          }
          pagination={
            totalEntries > 0 && totalPages > 0 ? (
              <Pagination
                currentPage={safePage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
              />
            ) : undefined
          }
        />
      </div>

      {selectedLedger ? (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0, 0, 0, 0.45)',
            zIndex: 1000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: spacing[5],
          }}
          onClick={() => setSelectedLedger(null)}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Add New Entry"
            onClick={(e) => e.stopPropagation()}
            style={{
              width: 'min(920px, 100%)',
              background: theme['bg-surface'],
              borderRadius: radius.md,
              border: `1px solid ${theme.border}`,
              boxShadow: '0 12px 30px rgba(0, 0, 0, 0.18)',
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: spacing[4],
                borderBottom: `1px solid ${theme.border}`,
              }}
            >
              <h3
                style={{
                  margin: 0,
                  fontSize: typography.sizes.xl.fontSize,
                  fontFamily: typography.fonts.heading.family,
                  fontWeight: typography.fonts.heading.fontWeight,
                  color: theme['text-primary'],
                }}
              >
                Add New Entry
              </h3>
              <button
                type="button"
                onClick={() => setSelectedLedger(null)}
                style={{
                  border: 'none',
                  background: 'transparent',
                  color: theme['text-muted'],
                  fontSize: typography.sizes.lg.fontSize,
                  cursor: 'pointer',
                }}
                aria-label="Close add entry modal"
              >
                X
              </button>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                setSelectedLedger(null);
              }}
              style={{ padding: spacing[4] }}
            >
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: spacing[3] }}>
                <label style={{ display: 'grid', gap: spacing[1], fontSize: typography.sizes.xs.fontSize, color: theme['text-secondary'] }}>
                  To
                  <input
                    type="text"
                    value={selectedLedger.ledgerName}
                    readOnly
                    style={{
                      height: inputTokens.height.sm,
                      padding: `${spacing[1]} ${spacing[2]}`,
                      borderRadius: radius.sm,
                      border: `1px solid ${theme.border}`,
                      fontSize: typography.sizes.sm.fontSize,
                      fontFamily: typography.fonts.sans.family,
                      color: theme['text-primary'],
                      background: theme['table-header-gray'],
                    }}
                  />
                </label>
                <label style={{ display: 'grid', gap: spacing[1], fontSize: typography.sizes.xs.fontSize, color: theme['text-secondary'] }}>
                  From
                  <select style={{ height: inputTokens.height.sm, padding: `${spacing[1]} ${spacing[2]}`, borderRadius: radius.sm, border: `1px solid ${theme.border}`, fontSize: typography.sizes.sm.fontSize, fontFamily: typography.fonts.sans.family }}>
                    <option>Choose</option>
                    <option>Rathinaswamy A</option>
                    <option>MiDNA (H.O)</option>
                  </select>
                </label>
                <label style={{ display: 'grid', gap: spacing[1], fontSize: typography.sizes.xs.fontSize, color: theme['text-secondary'] }}>
                  Journal Date
                  <input type="date" style={{ height: inputTokens.height.sm, padding: `${spacing[1]} ${spacing[2]}`, borderRadius: radius.sm, border: `1px solid ${theme.border}`, fontSize: typography.sizes.sm.fontSize, fontFamily: typography.fonts.sans.family }} />
                </label>
                <label style={{ display: 'grid', gap: spacing[1], fontSize: typography.sizes.xs.fontSize, color: theme['text-secondary'] }}>
                  Type
                  <select style={{ height: inputTokens.height.sm, padding: `${spacing[1]} ${spacing[2]}`, borderRadius: radius.sm, border: `1px solid ${theme.border}`, fontSize: typography.sizes.sm.fontSize, fontFamily: typography.fonts.sans.family }}>
                    <option>Choose</option>
                    <option>Credit</option>
                    <option>Debit</option>
                  </select>
                </label>
                <label style={{ display: 'grid', gap: spacing[1], fontSize: typography.sizes.xs.fontSize, color: theme['text-secondary'] }}>
                  Amount
                  <input type="number" min={0} style={{ height: inputTokens.height.sm, padding: `${spacing[1]} ${spacing[2]}`, borderRadius: radius.sm, border: `1px solid ${theme.border}`, fontSize: typography.sizes.sm.fontSize, fontFamily: typography.fonts.sans.family }} />
                </label>
                <label style={{ display: 'grid', gap: spacing[1], fontSize: typography.sizes.xs.fontSize, color: theme['text-secondary'] }}>
                  Remarks
                  <input type="text" style={{ height: inputTokens.height.sm, padding: `${spacing[1]} ${spacing[2]}`, borderRadius: radius.sm, border: `1px solid ${theme.border}`, fontSize: typography.sizes.sm.fontSize, fontFamily: typography.fonts.sans.family }} />
                </label>
              </div>
              <div style={{ display: 'flex', justifyContent: 'center', marginTop: spacing[4] }}>
                <button
                  type="submit"
                  style={{
                    padding: `${spacing[2]} ${spacing[4]}`,
                    border: 'none',
                    borderRadius: radius.sm,
                    background: theme['btn-primary-bg'],
                    color: theme['btn-primary-text'],
                    fontSize: typography.sizes.sm.fontSize,
                    fontFamily: typography.fonts.sans.family,
                    fontWeight: 600,
                    cursor: 'pointer',
                  }}
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      ) : null}
    </div>
  );
}
