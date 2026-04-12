import { useEffect, useMemo, useState } from 'react';
import {
  colors,
  spacing,
  radius,
  typography,
  inputTokens,
  buttonTokens,
} from '../../styles/theme';
import Pagination from '../ui/Pagination';
import TablePaginationFooter from '../ui/TablePaginationFooter';

const theme = colors.light;

type TxRow = {
  sno: number;
  date: string;
  mlaName: string;
  mobile: string;
  credit: number;
  debit: number;
  narration: string;
};

const TRANSACTIONS: TxRow[] = [
  {
    sno: 1,
    date: '04/04/2026',
    mlaName: 'MiDNA (H.O)',
    mobile: '9364233342',
    credit: 0,
    debit: 5000,
    narration: 'PR-Payment received from Renuka Devi-in bank account of MiDNA Office',
  },
  {
    sno: 2,
    date: '03/04/2026',
    mlaName: 'MiDNA (H.O)',
    mobile: '9364233342',
    credit: 0,
    debit: 640,
    narration: 'PR-Payment received from Client A-in bank account of MiDNA Office',
  },
  {
    sno: 3,
    date: '02/04/2026',
    mlaName: 'MiDNA (H.O)',
    mobile: '9364233342',
    credit: 0,
    debit: 3850,
    narration: 'JC-Ledger Topup (H.O - LSB - ABC)',
  },
  {
    sno: 4,
    date: '01/04/2026',
    mlaName: 'MiDNA (H.O)',
    mobile: '9364233342',
    credit: 0,
    debit: 299,
    narration: 'PR-Payment received from Soumya R-in bank account of MiDNA Office',
  },
  {
    sno: 5,
    date: '31/03/2026',
    mlaName: 'MiDNA (H.O)',
    mobile: '9364233342',
    credit: 2000,
    debit: 0,
    narration: 'AC-Adjustment credit',
  },
  {
    sno: 6,
    date: '30/03/2026',
    mlaName: 'MiDNA (H.O)',
    mobile: '9364233342',
    credit: 0,
    debit: 1200,
    narration: 'AC-Scan fee settlement',
  },
  {
    sno: 7,
    date: '29/03/2026',
    mlaName: 'MiDNA (H.O)',
    mobile: '9364233342',
    credit: 0,
    debit: 750,
    narration: 'PR-Payment received from Kumar-in bank account of MiDNA Office',
  },
  {
    sno: 8,
    date: '28/03/2026',
    mlaName: 'MiDNA (H.O)',
    mobile: '9364233342',
    credit: 0,
    debit: 4100,
    narration: 'PR-Payment received from Lakshmi-in bank account of MiDNA Office',
  },
  {
    sno: 9,
    date: '27/03/2026',
    mlaName: 'MiDNA (H.O)',
    mobile: '9364233342',
    credit: 0,
    debit: 500,
    narration: 'JC-Ledger Topup (H.O - LSB)',
  },
  {
    sno: 10,
    date: '26/03/2026',
    mlaName: 'MiDNA (H.O)',
    mobile: '9364233342',
    credit: 1500,
    debit: 0,
    narration: 'PR-Refund adjustment',
  },
  {
    sno: 11,
    date: '25/03/2026',
    mlaName: 'MiDNA (H.O)',
    mobile: '9364233342',
    credit: 0,
    debit: 2200,
    narration: 'AC-9940876987-Individual-Prashad V.B',
  },
  {
    sno: 12,
    date: '24/03/2026',
    mlaName: 'MiDNA (H.O)',
    mobile: '9364233342',
    credit: 0,
    debit: 990,
    narration: 'PR-Payment received from Meena-in bank account of MiDNA Office',
  },
  {
    sno: 13,
    date: '23/03/2026',
    mlaName: 'MiDNA (H.O)',
    mobile: '9364233342',
    credit: 0,
    debit: 1750,
    narration: 'AC-Individual-Client settlement',
  },
  {
    sno: 14,
    date: '22/03/2026',
    mlaName: 'MiDNA (H.O)',
    mobile: '9364233342',
    credit: 3000,
    debit: 0,
    narration: 'PR-Payment received',
  },
  {
    sno: 15,
    date: '21/03/2026',
    mlaName: 'MiDNA (H.O)',
    mobile: '9364233342',
    credit: 0,
    debit: 450,
    narration: 'JC-Ledger Topup (H.O - LSB - ABC)',
  },
  {
    sno: 16,
    date: '20/03/2026',
    mlaName: 'MiDNA (H.O)',
    mobile: '9364233342',
    credit: 0,
    debit: 3200,
    narration: 'PR-Payment received from Arun-in bank account of MiDNA Office',
  },
  {
    sno: 17,
    date: '19/03/2026',
    mlaName: 'MiDNA (H.O)',
    mobile: '9364233342',
    credit: 0,
    debit: 880,
    narration: 'AC-Payment gateway fee',
  },
  {
    sno: 18,
    date: '18/03/2026',
    mlaName: 'MiDNA (H.O)',
    mobile: '9364233342',
    credit: 500,
    debit: 0,
    narration: 'AC-Credit note',
  },
  {
    sno: 19,
    date: '17/03/2026',
    mlaName: 'MiDNA (H.O)',
    mobile: '9364233342',
    credit: 0,
    debit: 6100,
    narration: 'PR-Payment received from Priya-in bank account of MiDNA Office',
  },
  {
    sno: 20,
    date: '16/03/2026',
    mlaName: 'MiDNA (H.O)',
    mobile: '9364233342',
    credit: 0,
    debit: 275,
    narration: 'JC-Ledger Topup',
  },
  {
    sno: 21,
    date: '15/03/2026',
    mlaName: 'MiDNA (H.O)',
    mobile: '9364233342',
    credit: 0,
    debit: 1400,
    narration: 'PR-Payment received from Vikram-in bank account of MiDNA Office',
  },
  {
    sno: 22,
    date: '14/03/2026',
    mlaName: 'MiDNA (H.O)',
    mobile: '9364233342',
    credit: 0,
    debit: 950,
    narration: 'AC-Scan payment',
  },
  {
    sno: 23,
    date: '13/03/2026',
    mlaName: 'MiDNA (H.O)',
    mobile: '9364233342',
    credit: 1200,
    debit: 0,
    narration: 'PR-Payment received',
  },
  {
    sno: 24,
    date: '12/03/2026',
    mlaName: 'MiDNA (H.O)',
    mobile: '9364233342',
    credit: 0,
    debit: 3600,
    narration: 'PR-Payment received from Divya-in bank account of MiDNA Office',
  },
];

/** Matches `LedgerPage` / accounts table styling */
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
  children: React.ReactNode;
  align?: 'left' | 'center' | 'right';
}) {
  return (
    <th style={{ ...thStyle, textAlign: align }}>
      {children}
    </th>
  );
}

function fmtAmount(n: number) {
  return n === 0 ? '0' : String(n);
}

export default function TransactionsPage() {
  const [pageSize, setPageSize] = useState(20);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState('');

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return TRANSACTIONS;
    return TRANSACTIONS.filter(
      (r) =>
        String(r.sno).includes(q) ||
        r.date.includes(q) ||
        r.mlaName.toLowerCase().includes(q) ||
        r.mobile.includes(q) ||
        r.narration.toLowerCase().includes(q) ||
        fmtAmount(r.credit).includes(q) ||
        fmtAmount(r.debit).includes(q)
    );
  }, [search]);

  const totalCredit = filtered.reduce((s, r) => s + r.credit, 0);
  const totalDebit = filtered.reduce((s, r) => s + r.debit, 0);

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
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: spacing[4],
          marginBottom: spacing[4],
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
          My Transactions
        </h2>
        <button
          type="button"
          onClick={() => {
            setSearch('');
            setCurrentPage(1);
          }}
          style={{
            height: buttonTokens.height.sm,
            padding: buttonTokens.padding.sm,
            borderRadius: radius.sm,
            border: 'none',
            background: theme.success,
            color: theme['text-inverse'],
            fontSize: typography.sizes.sm.fontSize,
            fontWeight: 600,
            fontFamily: typography.fonts.sans.family,
            cursor: 'pointer',
          }}
        >
          Fetch
        </button>
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
        .ledger-table-body tr:nth-child(even) { background: ${theme['table-zebra']}; }
        .ledger-table-body tr:hover { background: ${theme['table-row-hover']}; }
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
              minWidth: 900,
            }}
          >
            <thead>
              <tr>
                <Th align="center">Sno</Th>
                <Th>Date</Th>
                <Th>MLA name</Th>
                <Th>Mobile</Th>
                <Th align="right">Credit</Th>
                <Th align="right">Debit</Th>
                <Th>Narration</Th>
              </tr>
            </thead>
            <tbody className="ledger-table-body">
              {pageRows.map((row) => (
                <tr key={row.sno} style={{ height: '40px' }}>
                  <td style={{ ...tdStyle, textAlign: 'center' }}>{row.sno}</td>
                  <td style={{ ...tdStyle, whiteSpace: 'nowrap' }}>{row.date}</td>
                  <td style={tdStyle}>{row.mlaName}</td>
                  <td style={{ ...tdStyle, whiteSpace: 'nowrap' }}>{row.mobile}</td>
                  <td style={{ ...tdStyle, textAlign: 'right' }}>{fmtAmount(row.credit)}</td>
                  <td style={{ ...tdStyle, textAlign: 'right' }}>{fmtAmount(row.debit)}</td>
                  <td style={{ ...tdStyle, whiteSpace: 'normal', maxWidth: 420 }}>{row.narration}</td>
                </tr>
              ))}
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
                    colSpan={4}
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
                    {totalCredit}
                  </td>
                  <td
                    style={{
                      ...tdStyle,
                      textAlign: 'right',
                      borderTop: `1px solid ${theme['table-border']}`,
                    }}
                  >
                    {totalDebit}
                  </td>
                  <td style={{ ...tdStyle, borderTop: `1px solid ${theme['table-border']}` }} />
                </tr>
              </tfoot>
            )}
          </table>
        </div>
        <TablePaginationFooter
          summary={
            totalEntries === 0
              ? 'No records match your search.'
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
    </div>
  );
}
