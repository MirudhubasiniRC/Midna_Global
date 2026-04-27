import { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { colors, spacing, typography, radius } from '../../styles/theme';
import TopBar from '../Layout/TopBar';
import ProcessSidebar from './ProcessSidebar';
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

function ProcessListView() {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(20);
  const [search, setSearch] = useState('');
  const totalEntries = 1;
  const totalPages = Math.max(1, Math.ceil(totalEntries / pageSize));
  const from = (currentPage - 1) * pageSize + 1;
  const to = Math.min(currentPage * pageSize, totalEntries);

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
      <h1
        style={{
          margin: 0,
          fontSize: typography.sizes.xl.fontSize,
          fontWeight: typography.fonts.heading.fontWeight,
          fontFamily: typography.fonts.heading.family,
          color: theme['text-primary'],
        }}
      >
        Processing
      </h1>
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: spacing[4],
          marginTop: spacing[4],
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
            display: 'none',
            alignItems: 'center',
            gap: spacing[2],
            flexShrink: 0,
            marginLeft: 'auto',
          }}
        >
          <span style={{ fontSize: typography.sizes.sm.fontSize, color: theme['text-secondary'] }}>Show</span>
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
          <span style={{ fontSize: typography.sizes.sm.fontSize, color: theme['text-secondary'] }}>records per page</span>
        </div>
      </div>

      <style>{`
        .process-table-body tr:nth-child(even) { background: ${theme['table-zebra']}; }
        .process-table-body tr:hover { background: ${theme['table-row-hover']}; }
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
              <th style={{ ...thStyle, textAlign: 'center' }}>SRA</th>
              <th style={{ ...thStyle, textAlign: 'left' }}>Reffered By</th>
              <th style={{ ...thStyle, textAlign: 'right' }}>Cost</th>
              <th style={{ ...thStyle, textAlign: 'center' }}>Images</th>
              <th style={{ ...thStyle, textAlign: 'center' }}>Edit</th>
              <th style={{ ...thStyle, textAlign: 'center' }}>Process</th>
              <th style={{ ...thStyle, textAlign: 'left' }}>Processed by</th>
              <th style={{ ...thStyle, textAlign: 'left' }}>Status</th>
              <th style={{ ...thStyle, textAlign: 'center' }}>Assign</th>
            </tr>
          </thead>
          <tbody className="process-table-body">
            <tr style={{ height: '40px' }}>
              <td style={{ padding: `${spacing[1]} ${spacing[2]}`, textAlign: 'center', fontSize: typography.sizes.xs.fontSize }}>1</td>
              <td style={{ padding: `${spacing[1]} ${spacing[2]}` }}>
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
                  S41347
                </span>
              </td>
              <td style={{ padding: `${spacing[1]} ${spacing[2]}`, fontSize: typography.sizes.xs.fontSize }}>ASHWIN - MALE /21</td>
              <td style={{ padding: `${spacing[1]} ${spacing[2]}`, textAlign: 'center', fontSize: typography.sizes.xs.fontSize }}>SELF</td>
              <td style={{ padding: `${spacing[1]} ${spacing[2]}`, fontSize: typography.sizes.xs.fontSize }}>Bhuvana Pasupathi</td>
              <td style={{ padding: `${spacing[1]} ${spacing[2]}`, textAlign: 'right', fontSize: typography.sizes.xs.fontSize }}>2000.00</td>
              <td style={{ padding: `${spacing[1]} ${spacing[2]}`, textAlign: 'center' }}>
                <span style={{ display: 'inline-block', padding: `${spacing[1]} ${spacing[3]}`, border: `1px solid ${theme.info}`, background: theme['info-bg'], color: theme.info, borderRadius: radius.pill, fontSize: typography.sizes.xs.fontSize, fontFamily: typography.fonts.sans.family, fontWeight: 500 }}>View</span>
              </td>
              <td style={{ padding: `${spacing[1]} ${spacing[2]}`, textAlign: 'center' }}>
                <span style={{ display: 'inline-block', padding: `${spacing[1]} ${spacing[3]}`, border: `1px solid ${theme.primary}`, background: theme['primary-soft'], color: theme.primary, borderRadius: radius.pill, fontSize: typography.sizes.xs.fontSize, fontFamily: typography.fonts.sans.family, fontWeight: 500 }}>Edit</span>
              </td>
              <td style={{ padding: `${spacing[1]} ${spacing[2]}`, textAlign: 'center' }}>
                <span style={{ display: 'inline-block', padding: `${spacing[1]} ${spacing[3]}`, border: `1px solid ${theme.success}`, background: theme['success-bg'], color: theme.success, borderRadius: radius.pill, fontSize: typography.sizes.xs.fontSize, fontFamily: typography.fonts.sans.family, fontWeight: 500 }}>Process</span>
              </td>
              <td style={{ padding: `${spacing[1]} ${spacing[2]}`, fontSize: typography.sizes.xs.fontSize }}>976544899</td>
              <td style={{ padding: `${spacing[1]} ${spacing[2]}`, fontSize: typography.sizes.xs.fontSize }}>Not Processed</td>
              <td style={{ padding: `${spacing[1]} ${spacing[2]}`, textAlign: 'center' }}>
                <span style={{ display: 'inline-block', padding: `${spacing[1]} ${spacing[3]}`, border: `1px solid ${theme.warning}`, background: theme['warning-bg'], color: theme.warning, borderRadius: radius.pill, fontSize: typography.sizes.xs.fontSize, fontFamily: typography.fonts.sans.family, fontWeight: 500 }}>Assign</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <TablePaginationFooter
        summary={`Showing ${from} to ${to} of ${totalEntries} entries`}
        pagination={<Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />}
      />
    </div>
  );
}

/** Layout mirrors `MLAPage`: top bar + collapsible sidebar + main */
export default function ProcessPage() {
  const location = useLocation();
  const outlet = <Outlet />;
  const showDefaultProcessList = location.pathname === '/process';

  return (
    <div
      style={{
        minHeight: '100vh',
        background: theme['bg-base'],
        fontFamily: typography.fonts.sans.family,
        fontSize: typography.sizes.base.fontSize,
        color: theme['text-primary'],
      }}
    >
      <TopBar />
      <div style={{ display: 'flex', minHeight: 'calc(100vh - 65px)' }}>
        <ProcessSidebar />
        <main
          style={{
            flex: 1,
            padding: spacing[6],
            overflow: 'auto',
          }}
        >
          {showDefaultProcessList ? <ProcessListView /> : outlet}
        </main>
      </div>
    </div>
  );
}
