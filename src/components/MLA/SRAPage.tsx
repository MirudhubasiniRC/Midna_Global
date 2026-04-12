import { useEffect, useMemo, useState } from 'react';
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

type NetworkTier =
  | 'REGISTERED'
  | 'SPARK_LITE'
  | 'SPARK'
  | 'IGNITE'
  | 'FREELANCER';

/** Pastel fills + calmer borders; aligned with brand gold (#E9C75A) & primary (#93207A). */
const TIER_STYLE: Record<NetworkTier, { bg: string; border: string; color: string }> = {
  REGISTERED: {
    bg: '#FFFAF3',
    border: '#D4B87A',
    color: '#5C4A2E',
  },
  SPARK_LITE: {
    bg: '#F3F0FA',
    border: '#9A8AB8',
    color: '#4A3D63',
  },
  SPARK: {
    bg: '#FFF5F0',
    border: '#D4A090',
    color: '#8B4A32',
  },
  IGNITE: {
    bg: '#F9F0F6',
    border: '#B5659A',
    color: '#6B2058',
  },
  FREELANCER: {
    bg: '#F2FAF6',
    border: '#6FA894',
    color: '#2D5C4A',
  },
};

const NETWORK_FILTERS: {
  id: NetworkTier;
  label: string;
  bg: string;
  color: string;
  border: string;
}[] = (
  [
    ['REGISTERED', 'Registered'],
    ['SPARK_LITE', 'Spark lite'],
    ['SPARK', 'Spark'],
    ['IGNITE', 'Ignite'],
    ['FREELANCER', 'Freelancer'],
  ] as const
).map(([id, label]) => ({
  id,
  label,
  ...TIER_STYLE[id],
}));

type TeacherRow = {
  tid: number;
  name: string;
  mobile: string;
  trainer: string;
  status: string;
  billing: string;
  doj: string;
  seDate: string;
  std: number;
  ly: number;
  l6m: number;
  l3m: number;
  lms: number;
  lastScan: string;
  network: NetworkTier;
};

const TEACHERS: TeacherRow[] = [
  {
    tid: 505,
    name: 'Sample Teacher A',
    mobile: '9876543210',
    trainer: 'Rathinaswamy A',
    status: 'Yes',
    billing: '40%',
    doj: '2024-01-15',
    seDate: '2026-12-31',
    std: 12,
    ly: 8,
    l6m: 3,
    l3m: 1,
    lms: 0,
    lastScan: '2026-03-10',
    network: 'REGISTERED',
  },
  {
    tid: 536,
    name: 'Sample Teacher B',
    mobile: '9123456789',
    trainer: 'Dharani Rajendran',
    status: 'Yes',
    billing: '50%',
    doj: '2023-06-01',
    seDate: '2027-06-01',
    std: 20,
    ly: 15,
    l6m: 5,
    l3m: 2,
    lms: 1,
    lastScan: '2026-04-01',
    network: 'SPARK_LITE',
  },
  {
    tid: 541,
    name: 'Sample Teacher C',
    mobile: '9988776655',
    trainer: 'Rathinaswamy A',
    status: 'Yes',
    billing: '60%',
    doj: '2022-03-20',
    seDate: '2025-12-31',
    std: 8,
    ly: 6,
    l6m: 2,
    l3m: 0,
    lms: 0,
    lastScan: '2026-02-28',
    network: 'SPARK',
  },
  {
    tid: 548,
    name: 'Sample Teacher D',
    mobile: '9812345678',
    trainer: 'Mentor Team',
    status: 'Yes',
    billing: '40%',
    doj: '2025-01-10',
    seDate: '2028-01-10',
    std: 5,
    ly: 4,
    l6m: 1,
    l3m: 1,
    lms: 0,
    lastScan: '2026-03-25',
    network: 'IGNITE',
  },
  {
    tid: 552,
    name: 'Sample Teacher E',
    mobile: '9344455667',
    trainer: 'Freelance Pool',
    status: 'Yes',
    billing: '50%',
    doj: '2021-11-05',
    seDate: '2026-11-05',
    std: 30,
    ly: 22,
    l6m: 8,
    l3m: 3,
    lms: 2,
    lastScan: '2026-04-05',
    network: 'FREELANCER',
  },
  {
    tid: 560,
    name: 'Sample Teacher F',
    mobile: '9000011122',
    trainer: 'Rathinaswamy A',
    status: 'Yes',
    billing: '40%',
    doj: '2024-08-12',
    seDate: '2027-08-12',
    std: 10,
    ly: 7,
    l6m: 4,
    l3m: 2,
    lms: 0,
    lastScan: '2026-03-15',
    network: 'REGISTERED',
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

export default function SRAPage() {
  const [activeNetwork, setActiveNetwork] = useState<NetworkTier | null>(null);
  const [pageSize, setPageSize] = useState(20);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState('');

  const filtered = useMemo(() => {
    let rows = TEACHERS;
    if (activeNetwork) {
      rows = rows.filter((r) => r.network === activeNetwork);
    }
    const q = search.trim().toLowerCase();
    if (q) {
      rows = rows.filter(
        (r) =>
          String(r.tid).includes(q) ||
          r.name.toLowerCase().includes(q) ||
          r.mobile.includes(q) ||
          r.trainer.toLowerCase().includes(q)
      );
    }
    return rows;
  }, [activeNetwork, search]);

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

  const clearFilters = () => {
    setActiveNetwork(null);
    setSearch('');
    setCurrentPage(1);
  };

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
      <div style={{ marginBottom: spacing[5] }}>
        <h2
          style={{
            margin: 0,
            fontSize: typography.sizes.xl.fontSize,
            fontWeight: typography.fonts.heading.fontWeight,
            fontFamily: typography.fonts.heading.family,
            color: theme['text-primary'],
          }}
        >
          NLA Network
        </h2>
      </div>

      <div style={{ marginBottom: spacing[4] }}>
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            gap: spacing[2],
          }}
        >
          {NETWORK_FILTERS.map((f) => {
            const active = activeNetwork === f.id;
            return (
              <button
                key={f.id}
                type="button"
                onClick={() => {
                  setActiveNetwork(f.id);
                  setCurrentPage(1);
                }}
                style={{
                  padding: `${spacing[2]} ${spacing[3]}`,
                  borderRadius: radius.sm,
                  border: active ? `2px solid ${theme.primary}` : `1px solid ${f.border}`,
                  background: f.bg,
                  color: f.color,
                  fontSize: typography.sizes.xs.fontSize,
                  fontWeight: 700,
                  fontFamily: typography.fonts.sans.family,
                  cursor: 'pointer',
                  textTransform: 'uppercase',
                  letterSpacing: '0.04em',
                  boxShadow: active ? `0 0 0 1px ${theme['primary-soft']}` : 'none',
                }}
              >
                {f.label}
              </button>
            );
          })}
          <button
            type="button"
            onClick={clearFilters}
            style={{
              padding: `${spacing[2]} ${spacing[3]}`,
              borderRadius: radius.sm,
              border: `1px solid ${theme.border}`,
              background: theme['table-header-gray'],
              color: theme['text-secondary'],
              fontSize: typography.sizes.xs.fontSize,
              fontWeight: 600,
              fontFamily: typography.fonts.sans.family,
              cursor: 'pointer',
            }}
          >
            Clear
          </button>
        </div>
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
      <div style={{ overflowX: 'auto', borderRadius: radius.sm, border: `1px solid ${theme.border}` }}>
        <table
          style={{
            width: '100%',
            borderCollapse: 'collapse',
            fontFamily: typography.fonts.sans.family,
            minWidth: 1100,
          }}
        >
          <thead>
            <tr>
              <Th align="center">TID</Th>
              <Th>Name</Th>
              <Th>Mobile</Th>
              <Th>Trainer</Th>
              <Th align="center">Status</Th>
              <Th align="right">Billing</Th>
              <Th>DOJ</Th>
              <Th>SE date</Th>
              <Th align="right">STD</Th>
              <Th align="right">LY</Th>
              <Th align="right">L6M</Th>
              <Th align="right">L3M</Th>
              <Th align="right">LMS</Th>
              <Th>Last scan</Th>
            </tr>
          </thead>
          <tbody className="ledger-table-body">
            {pageRows.map((row) => (
              <tr key={row.tid} style={{ height: '40px' }}>
                <td style={{ ...tdStyle, textAlign: 'center' }}>{row.tid}</td>
                <td style={tdStyle}>{row.name}</td>
                <td style={tdStyle}>{row.mobile}</td>
                <td style={tdStyle}>{row.trainer}</td>
                <td style={{ ...tdStyle, textAlign: 'center' }}>{row.status}</td>
                <td style={{ ...tdStyle, textAlign: 'right' }}>{row.billing}</td>
                <td style={tdStyle}>{row.doj}</td>
                <td style={tdStyle}>{row.seDate}</td>
                <td style={{ ...tdStyle, textAlign: 'right' }}>{row.std}</td>
                <td style={{ ...tdStyle, textAlign: 'right' }}>{row.ly}</td>
                <td style={{ ...tdStyle, textAlign: 'right' }}>{row.l6m}</td>
                <td style={{ ...tdStyle, textAlign: 'right' }}>{row.l3m}</td>
                <td style={{ ...tdStyle, textAlign: 'right' }}>{row.lms}</td>
                <td style={tdStyle}>{row.lastScan}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <TablePaginationFooter
        summary={
          totalEntries === 0
            ? 'No records match your filters.'
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
  );
}
