import { useState } from 'react';
import {
  colors,
  spacing,
  radius,
  typography,
} from '../../styles/theme';
import Pagination from '../ui/Pagination';
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
  color: theme['text-primary'],
  fontSize: typography.sizes.xs.fontSize,
  fontWeight: 400,
  borderBottom: `1px solid ${theme['table-border']}`,
  fontFamily: typography.fonts.sans.family,
  whiteSpace: 'nowrap' as const,
} as const;

const sampleData = [
  {
    sno: 1,
    scanId: 'S39350',
    scanDate: '2025-12-15',
    name: 'ARADHANA.AA / Female / 15',
    clientType: 'Individual / Normal',
    sra: 'Dharani Rajendran-9443336325',
    report: '',
    amount: '3000.00',
  },
];

const TOTAL_ENTRIES = 1;
const PAGE_SIZE = 20;
const TOTAL_PAGES = Math.max(1, Math.ceil(TOTAL_ENTRIES / PAGE_SIZE));

export default function ReportsPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(20);
  const [search, setSearch] = useState('');
  const from = (currentPage - 1) * pageSize + 1;
  const to = Math.min(currentPage * pageSize, TOTAL_ENTRIES);

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
            textAlign: 'left',
          }}
        >
          My reports
        </h2>
        <p
          style={{
            margin: `${spacing[2]} 0 0 0`,
            fontSize: typography.sizes.sm.fontSize,
            fontWeight: 400,
            fontFamily: typography.fonts.sans.family,
            color: theme['text-secondary'],
            lineHeight: 1.5,
          }}
        >
          GBP reports and scan data
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
            onChange={(e) => setSearch(e.target.value)}
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
            onChange={(e) => setPageSize(Number(e.target.value))}
            style={{
              padding: `${spacing[1]} ${spacing[2]}`,
              borderRadius: radius.sm,
              border: `1px solid ${theme.border}`,
              fontSize: typography.sizes.sm.fontSize,
              fontFamily: typography.fonts.sans.family,
              color: theme['text-primary'],
              background: theme['bg-surface'],
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
        .reports-table-body tr:nth-child(even) { background: ${theme['table-zebra']}; }
        .reports-table-body tr:hover { background: ${theme['table-row-hover']}; }
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
              <th style={{ ...thStyle, textAlign: 'left' }}>Scan Date</th>
              <th style={{ ...thStyle, textAlign: 'left' }}>Name</th>
              <th style={{ ...thStyle, textAlign: 'left' }}>Client Type / DDS</th>
              <th style={{ ...thStyle, textAlign: 'left' }}>SRA</th>
              <th style={{ ...thStyle, textAlign: 'center' }}>Report</th>
              <th style={{ ...thStyle, textAlign: 'center' }}>Upgrade</th>
              <th style={{ ...thStyle, textAlign: 'center' }}>DDS</th>
              <th style={{ ...thStyle, textAlign: 'right' }}>Amount</th>
              <th style={{ ...thStyle, textAlign: 'center' }}>Scan</th>
            </tr>
          </thead>
          <tbody className="reports-table-body">
            {sampleData.map((row) => (
              <tr key={row.scanId} style={{ height: '40px' }}>
                <td style={{ ...tdStyle, textAlign: 'center' }}>{row.sno}</td>
                <td style={tdStyle}>{row.scanId}</td>
                <td style={tdStyle}>{row.scanDate}</td>
                <td style={tdStyle}>{row.name}</td>
                <td style={tdStyle}>{row.clientType}</td>
                <td style={tdStyle}>{row.sra}</td>
                <td style={tdStyle} />
                <td style={{ ...tdStyle, textAlign: 'center' }}>
                  <span
                    style={{
                      display: 'inline-block',
                      padding: `${spacing[1]} ${spacing[3]}`,
                      background: theme['primary-soft'],
                      color: theme.primary,
                      borderRadius: radius.pill,
                      fontSize: typography.sizes.xs.fontSize,
                      fontFamily: typography.fonts.sans.family,
                      fontWeight: 500,
                    }}
                  >
                    Request
                  </span>
                </td>
                <td style={{ ...tdStyle, textAlign: 'center' }}>
                  <span
                    style={{
                      display: 'inline-block',
                      padding: `${spacing[1]} ${spacing[3]}`,
                      background: theme['warning-bg'],
                      color: theme.warning,
                      borderRadius: radius.pill,
                      fontSize: typography.sizes.xs.fontSize,
                      fontFamily: typography.fonts.sans.family,
                      fontWeight: 500,
                    }}
                  >
                    Request
                  </span>
                </td>
                <td style={{ ...tdStyle, textAlign: 'right' }}>{row.amount}</td>
                <td style={tdStyle} />
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <TablePaginationFooter
        summary={`Showing ${from} to ${to} of ${TOTAL_ENTRIES} entries`}
        pagination={
          <Pagination
            currentPage={currentPage}
            totalPages={TOTAL_PAGES}
            onPageChange={setCurrentPage}
          />
        }
      />
    </div>
  );
}
