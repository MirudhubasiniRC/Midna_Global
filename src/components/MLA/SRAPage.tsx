import { useEffect, useMemo, useState } from 'react';
import {
  colors,
  spacing,
  radius,
  typography,
  inputTokens,
  buttonTokens,
  modalTokens,
} from '../../styles/theme';
import Pagination from '../ui/Pagination';
import TablePaginationFooter from '../ui/TablePaginationFooter';
import AppModal from '../ui/AppModal';
import FilterPillButton from '../ui/FilterPillButton';

const theme = colors.light;

type NetworkTier =
  | 'REGISTERED'
  | 'SPARK_LITE'
  | 'SPARK'
  | 'IGNITE'
  | 'FREELANCER';

const NETWORK_FILTERS: {
  id: NetworkTier | 'ALL';
  label: string;
}[] = [
  { id: 'ALL', label: 'Show all' },
  { id: 'REGISTERED', label: 'Registered' },
  { id: 'SPARK_LITE', label: 'Spark lite' },
  { id: 'SPARK', label: 'Spark' },
  { id: 'IGNITE', label: 'Ignite' },
  { id: 'FREELANCER', label: 'Freelancer' },
];

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

const STATE_OPTIONS = [
  'Tamil Nadu',
  'Andhra Pradesh',
  'Karnataka',
  'Kerala',
  'Telangana',
  'Maharashtra',
  'Delhi',
  'Goa',
];

const BILLING_OPTIONS = ['30%', '40%', '50%', '60%'];
const SCANNER_OPTIONS = ['1', 'No', 'Yes'];
const STATUS_OPTIONS = ['Registered', 'Spark Lite', 'Spark', 'Ignite', 'Freelancer'];
const PEOPLE_OPTIONS = [
  'Rathinaswamy A',
  'AavishkarA (Anil B+)',
  'Dhiya Kannan',
  'Shreshta Minds (RB)',
  'MIDNA (H.O)',
  'Skill Masters Academy',
  'Devi PL',
  'Panchapakesan',
  'Bhuvana Pasupathi',
  'Sureshbabu L',
  'Priya Chhabra',
  'The Path Finder (SEEMA)',
  'Manju Anand',
  'Krutika Ramkumar',
  'Rachana Mittal',
  'Dr Ravi Perumal',
  'Nithiyananthi S (PVM)',
  'Tejvir Singh Sadana',
  'Harish K Raju',
  'Vanitha Venkatasubbu',
  'Sindhu Dinesh',
  'Jayashree Ganesan',
  'Vijeyalakshme Shivakumar',
  'Jeyalakshmi',
  'Vinodhini J',
  'Renuka Devi',
  'Soumya R',
  'Visukumar G',
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
  const [editingRow, setEditingRow] = useState<TeacherRow | null>(null);

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
          role="group"
          aria-label="Filter by network tier"
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            gap: spacing[2],
          }}
        >
          {NETWORK_FILTERS.map((f) => {
            const active = f.id === 'ALL' ? activeNetwork === null : activeNetwork === f.id;
            return (
              <FilterPillButton
                key={f.id}
                active={active}
                onClick={() => {
                  setActiveNetwork(f.id === 'ALL' ? null : f.id);
                  setCurrentPage(1);
                }}
              >
                {f.label}
              </FilterPillButton>
            );
          })}
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
              <Th align="center">Action</Th>
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
                <td style={{ ...tdStyle, textAlign: 'center' }}>
                  <button
                    type="button"
                    onClick={() => setEditingRow(row)}
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
                    Edit
                  </button>
                </td>
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

      <AppModal
        open={!!editingRow}
        onClose={() => setEditingRow(null)}
        titleId="sra-slc-training-title"
        title="SLC Training Data"
        subtitle="View or update trainer and billing details."
        size="2xl"
        maxWidthPx={980}
        maxHeight="88vh"
        footer={
          <>
            <button
              type="button"
              onClick={() => setEditingRow(null)}
              style={{
                height: buttonTokens.height.md,
                padding: buttonTokens.padding.md,
                borderRadius: radius.pill,
                border: `1px solid ${theme.border}`,
                background: theme['bg-surface'],
                color: theme['text-primary'],
                fontSize: typography.sizes.sm.fontSize,
                fontWeight: 600,
                fontFamily: typography.fonts.sans.family,
                cursor: 'pointer',
              }}
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={() => setEditingRow(null)}
              style={{
                height: buttonTokens.height.md,
                padding: buttonTokens.padding.md,
                borderRadius: radius.pill,
                border: 'none',
                background: theme['btn-primary-bg'],
                color: theme['btn-primary-text'],
                fontSize: typography.sizes.sm.fontSize,
                fontWeight: 600,
                fontFamily: typography.fonts.sans.family,
                cursor: 'pointer',
                boxShadow: modalTokens.primaryActionBoxShadow,
              }}
            >
              Save
            </button>
            <button
              type="button"
              onClick={() => setEditingRow(null)}
              style={{
                height: buttonTokens.height.md,
                padding: buttonTokens.padding.md,
                borderRadius: radius.pill,
                border: 'none',
                background: theme.error,
                color: theme['text-inverse'],
                fontSize: typography.sizes.sm.fontSize,
                fontWeight: 600,
                fontFamily: typography.fonts.sans.family,
                cursor: 'pointer',
              }}
            >
              Delete
            </button>
          </>
        }
      >
        {editingRow ? (
          <>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: spacing[3] }}>
                <label
                  style={{
                    display: 'grid',
                    gap: spacing[1],
                    fontSize: typography.sizes.xs.fontSize,
                    color: theme['text-secondary'],
                  }}
                >
                  Name
                  <input
                    type="text"
                    defaultValue={editingRow.name}
                    style={{
                      height: inputTokens.height.sm,
                      padding: `${spacing[1]} ${spacing[2]}`,
                      borderRadius: radius.sm,
                      border: `1px solid ${theme.border}`,
                      fontSize: typography.sizes.sm.fontSize,
                      fontFamily: typography.fonts.sans.family,
                      color: theme['text-primary'],
                      background: theme['bg-surface'],
                    }}
                  />
                </label>
                <label
                  style={{
                    display: 'grid',
                    gap: spacing[1],
                    fontSize: typography.sizes.xs.fontSize,
                    color: theme['text-secondary'],
                  }}
                >
                  Date of Joining [T00505]
                  <input
                    type="date"
                    defaultValue={editingRow.doj}
                    style={{
                      height: inputTokens.height.sm,
                      padding: `${spacing[1]} ${spacing[2]}`,
                      borderRadius: radius.sm,
                      border: `1px solid ${theme.border}`,
                      fontSize: typography.sizes.sm.fontSize,
                      fontFamily: typography.fonts.sans.family,
                      color: theme['text-primary'],
                      background: theme['bg-surface'],
                    }}
                  />
                </label>
                <label
                  style={{
                    display: 'grid',
                    gap: spacing[1],
                    fontSize: typography.sizes.xs.fontSize,
                    color: theme['text-secondary'],
                  }}
                >
                  Contact 1
                  <input
                    type="tel"
                    defaultValue={editingRow.mobile}
                    inputMode="numeric"
                    pattern="[0-9]*"
                    maxLength={10}
                    onInput={(e) => {
                      const target = e.currentTarget;
                      target.value = target.value.replace(/\D/g, '').slice(0, 10);
                    }}
                    style={{
                      height: inputTokens.height.sm,
                      padding: `${spacing[1]} ${spacing[2]}`,
                      borderRadius: radius.sm,
                      border: `1px solid ${theme.border}`,
                      fontSize: typography.sizes.sm.fontSize,
                      fontFamily: typography.fonts.sans.family,
                      color: theme['text-primary'],
                      background: theme['bg-surface'],
                    }}
                  />
                </label>
                <label
                  style={{
                    display: 'grid',
                    gap: spacing[1],
                    fontSize: typography.sizes.xs.fontSize,
                    color: theme['text-secondary'],
                  }}
                >
                  Contact 2
                  <input
                    type="tel"
                    defaultValue="9600227643"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    maxLength={10}
                    onInput={(e) => {
                      const target = e.currentTarget;
                      target.value = target.value.replace(/\D/g, '').slice(0, 10);
                    }}
                    style={{
                      height: inputTokens.height.sm,
                      padding: `${spacing[1]} ${spacing[2]}`,
                      borderRadius: radius.sm,
                      border: `1px solid ${theme.border}`,
                      fontSize: typography.sizes.sm.fontSize,
                      fontFamily: typography.fonts.sans.family,
                      color: theme['text-primary'],
                      background: theme['bg-surface'],
                    }}
                  />
                </label>
                <label
                  style={{
                    display: 'grid',
                    gap: spacing[1],
                    fontSize: typography.sizes.xs.fontSize,
                    color: theme['text-secondary'],
                  }}
                >
                  Email
                  <input
                    type="email"
                    defaultValue={`${editingRow.name.toLowerCase().replace(/\s+/g, '.')}@gmail.com`}
                    style={{
                      height: inputTokens.height.sm,
                      padding: `${spacing[1]} ${spacing[2]}`,
                      borderRadius: radius.sm,
                      border: `1px solid ${theme.border}`,
                      fontSize: typography.sizes.sm.fontSize,
                      fontFamily: typography.fonts.sans.family,
                      color: theme['text-primary'],
                      background: theme['bg-surface'],
                    }}
                  />
                </label>
                <label
                  style={{
                    display: 'grid',
                    gap: spacing[1],
                    fontSize: typography.sizes.xs.fontSize,
                    color: theme['text-secondary'],
                  }}
                >
                  Qualification
                  <input
                    type="text"
                    defaultValue="DCT, BSc Computer science, Dip in Nutrition"
                    style={{
                      height: inputTokens.height.sm,
                      padding: `${spacing[1]} ${spacing[2]}`,
                      borderRadius: radius.sm,
                      border: `1px solid ${theme.border}`,
                      fontSize: typography.sizes.sm.fontSize,
                      fontFamily: typography.fonts.sans.family,
                      color: theme['text-primary'],
                      background: theme['bg-surface'],
                    }}
                  />
                </label>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: spacing[3], marginTop: spacing[3] }}>
                <label style={{ display: 'grid', gap: spacing[1], fontSize: typography.sizes.xs.fontSize, color: theme['text-secondary'] }}>
                  BioData
                  <textarea
                    rows={4}
                    defaultValue={`Ref By - ${editingRow.trainer}\nI am a Health coach and a Consultant Nutritionist`}
                    style={{
                      width: '100%',
                      boxSizing: 'border-box',
                      padding: spacing[2],
                      borderRadius: radius.sm,
                      border: `1px solid ${theme.border}`,
                      fontSize: typography.sizes.sm.fontSize,
                      fontFamily: typography.fonts.sans.family,
                    }}
                  />
                </label>
                <label style={{ display: 'grid', gap: spacing[1], fontSize: typography.sizes.xs.fontSize, color: theme['text-secondary'] }}>
                  Postal address
                  <textarea
                    rows={4}
                    defaultValue={'151 First Floor\nBhuvaneshwari Nagar 2nd Street\nDr Ambedkar Road'}
                    style={{
                      width: '100%',
                      boxSizing: 'border-box',
                      padding: spacing[2],
                      borderRadius: radius.sm,
                      border: `1px solid ${theme.border}`,
                      fontSize: typography.sizes.sm.fontSize,
                      fontFamily: typography.fonts.sans.family,
                    }}
                  />
                </label>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: spacing[3], marginTop: spacing[3] }}>
                <label style={{ display: 'grid', gap: spacing[1], fontSize: typography.sizes.xs.fontSize, color: theme['text-secondary'] }}>
                  State
                  <select
                    defaultValue="Tamil Nadu"
                    style={{
                      height: inputTokens.height.sm,
                      padding: `${spacing[1]} ${spacing[2]}`,
                      borderRadius: radius.sm,
                      border: `1px solid ${theme.border}`,
                      fontSize: typography.sizes.sm.fontSize,
                      fontFamily: typography.fonts.sans.family,
                      color: theme['text-primary'],
                      background: theme['bg-surface'],
                    }}
                  >
                    {STATE_OPTIONS.map((state) => (
                      <option key={state} value={state}>
                        {state}
                      </option>
                    ))}
                  </select>
                </label>
                <label style={{ display: 'grid', gap: spacing[1], fontSize: typography.sizes.xs.fontSize, color: theme['text-secondary'] }}>
                  District
                  <input
                    type="text"
                    defaultValue="Coimbatore"
                    style={{
                      height: inputTokens.height.sm,
                      padding: `${spacing[1]} ${spacing[2]}`,
                      borderRadius: radius.sm,
                      border: `1px solid ${theme.border}`,
                      fontSize: typography.sizes.sm.fontSize,
                      fontFamily: typography.fonts.sans.family,
                    }}
                  />
                </label>
                <label style={{ display: 'grid', gap: spacing[1], fontSize: typography.sizes.xs.fontSize, color: theme['text-secondary'] }}>
                  Pincode
                  <input
                    type="text"
                    defaultValue="641025"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    maxLength={6}
                    onInput={(e) => {
                      const target = e.currentTarget;
                      target.value = target.value.replace(/\D/g, '').slice(0, 6);
                    }}
                    style={{
                      height: inputTokens.height.sm,
                      padding: `${spacing[1]} ${spacing[2]}`,
                      borderRadius: radius.sm,
                      border: `1px solid ${theme.border}`,
                      fontSize: typography.sizes.sm.fontSize,
                      fontFamily: typography.fonts.sans.family,
                    }}
                  />
                </label>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: spacing[3], marginTop: spacing[3] }}>
                <label style={{ display: 'grid', gap: spacing[1], fontSize: typography.sizes.xs.fontSize, color: theme['text-secondary'] }}>
                  NLA Billing
                  <select
                    defaultValue={editingRow.billing}
                    style={{
                      height: inputTokens.height.sm,
                      padding: `${spacing[1]} ${spacing[2]}`,
                      borderRadius: radius.sm,
                      border: `1px solid ${theme.border}`,
                      fontSize: typography.sizes.sm.fontSize,
                      fontFamily: typography.fonts.sans.family,
                      color: theme['text-primary'],
                      background: theme['bg-surface'],
                    }}
                  >
                    {BILLING_OPTIONS.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                </label>
                <label style={{ display: 'grid', gap: spacing[1], fontSize: typography.sizes.xs.fontSize, color: theme['text-secondary'] }}>
                  Scanner
                  <select
                    defaultValue="Yes"
                    style={{
                      height: inputTokens.height.sm,
                      padding: `${spacing[1]} ${spacing[2]}`,
                      borderRadius: radius.sm,
                      border: `1px solid ${theme.border}`,
                      fontSize: typography.sizes.sm.fontSize,
                      fontFamily: typography.fonts.sans.family,
                      color: theme['text-primary'],
                      background: theme['bg-surface'],
                    }}
                  >
                    {SCANNER_OPTIONS.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                </label>
                <label style={{ display: 'grid', gap: spacing[1], fontSize: typography.sizes.xs.fontSize, color: theme['text-secondary'] }}>
                  Expiry Date
                  <input
                    type="date"
                    defaultValue={editingRow.seDate}
                    style={{
                      height: inputTokens.height.sm,
                      padding: `${spacing[1]} ${spacing[2]}`,
                      borderRadius: radius.sm,
                      border: `1px solid ${theme.border}`,
                      fontSize: typography.sizes.sm.fontSize,
                      fontFamily: typography.fonts.sans.family,
                      color: theme['text-primary'],
                      background: theme['bg-surface'],
                    }}
                  />
                </label>
                <label style={{ display: 'grid', gap: spacing[1], fontSize: typography.sizes.xs.fontSize, color: theme['text-secondary'] }}>
                  Status
                  <select
                    defaultValue="Freelancer"
                    style={{
                      height: inputTokens.height.sm,
                      padding: `${spacing[1]} ${spacing[2]}`,
                      borderRadius: radius.sm,
                      border: `1px solid ${theme.border}`,
                      fontSize: typography.sizes.sm.fontSize,
                      fontFamily: typography.fonts.sans.family,
                      color: theme['text-primary'],
                      background: theme['bg-surface'],
                    }}
                  >
                    {STATUS_OPTIONS.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                </label>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: spacing[3], marginTop: spacing[3] }}>
                {[
                  ['Managed By', editingRow.trainer],
                  ['Admin By', 'Rathinaswamy A'],
                  ['Referred By', editingRow.trainer],
                ].map(([label, value]) => (
                  <label key={label} style={{ display: 'grid', gap: spacing[1], fontSize: typography.sizes.xs.fontSize, color: theme['text-secondary'] }}>
                    {label}
                    <select
                      defaultValue={value}
                      style={{
                        height: inputTokens.height.sm,
                        padding: `${spacing[1]} ${spacing[2]}`,
                        borderRadius: radius.sm,
                        border: `1px solid ${theme.border}`,
                        fontSize: typography.sizes.sm.fontSize,
                        fontFamily: typography.fonts.sans.family,
                        color: theme['text-primary'],
                        background: theme['bg-surface'],
                      }}
                    >
                      {PEOPLE_OPTIONS.map((person) => (
                        <option key={person} value={person}>
                          {person}
                        </option>
                      ))}
                    </select>
                  </label>
                ))}
              </div>
          </>
        ) : null}
      </AppModal>
    </div>
  );
}
