import { useState } from 'react';
import {
  colors,
  spacing,
  typography,
  radius,
  inputTokens,
  pageTokens,
  getTableHeaderStyle,
  getTableCellStyle,
} from '../../styles/theme';
import Pagination from '../ui/Pagination';
import TablePaginationFooter from '../ui/TablePaginationFooter';

const theme = colors.light;
const thStyle = getTableHeaderStyle(theme);
const tdBase = getTableCellStyle(theme);

export default function PreProcessPage() {
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
        borderRadius: pageTokens.cardRadius,
        overflow: 'hidden',
        border: `1px solid ${theme.border}`,
        padding: pageTokens.cardPadding,
        fontFamily: typography.fonts.sans.family,
      }}
    >
      <h1
        style={{
          margin: 0,
          fontSize: typography.sizes.xl.fontSize,
          fontWeight: typography.fonts.heading.fontWeight,
          fontFamily: typography.fonts.heading.family,
          color: theme['text-primary'],
          letterSpacing: typography.fonts.heading.letterSpacing,
        }}
      >
        Pre-process
      </h1>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          alignItems: 'center',
          gap: spacing[4],
          marginTop: pageTokens.titleToContentGap,
          marginBottom: pageTokens.toolbarToTableGap,
        }}
      >
        <label
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: pageTokens.search.labelGap,
            fontSize: typography.sizes.sm.fontSize,
            fontFamily: typography.fonts.sans.family,
            color: theme['text-secondary'],
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
              width: pageTokens.search.inputWidth,
              maxWidth: '100%',
              minWidth: pageTokens.search.inputMinWidth,
              height: inputTokens.height.sm,
              boxSizing: 'border-box',
              padding: `${spacing[1]} ${spacing[3]}`,
              borderRadius: radius.md,
              border: `1px solid ${theme.border}`,
              fontSize: typography.sizes.sm.fontSize,
              fontFamily: typography.fonts.sans.family,
              color: theme['text-primary'],
              background: theme['bg-surface'],
              outlineColor: theme['focus-ring'],
            }}
          />
        </label>
        <div
          style={{
            display: 'none',
            alignItems: 'center',
            gap: spacing[2],
            fontSize: typography.sizes.sm.fontSize,
            fontFamily: typography.fonts.sans.family,
          }}
        >
          <span style={{ color: theme['text-secondary'] }}>Show</span>
          <select
            value={pageSize}
            onChange={(e) => setPageSize(Number(e.target.value))}
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
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={50}>50</option>
          </select>
          <span style={{ color: theme['text-secondary'] }}>records per page</span>
        </div>
      </div>
      <div
        style={{
          overflowX: 'auto',
          borderRadius: radius.sm,
          border: `1px solid ${theme.border}`,
        }}
      >
        <table
          style={{
            width: '100%',
            borderCollapse: 'collapse',
            fontFamily: typography.fonts.sans.family,
            minWidth: 960,
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
          <tbody>
            <tr style={{ height: '40px' }}>
              <td style={{ ...tdBase, textAlign: 'center' }}>1</td>
              <td style={tdBase}>S41347</td>
              <td style={tdBase}>ASHWIN - MALE /21</td>
              <td style={{ ...tdBase, textAlign: 'center' }}>SELF</td>
              <td style={tdBase}>Bhuvana Pasupathi</td>
              <td style={{ ...tdBase, textAlign: 'right' }}>2000.00</td>
              <td style={{ ...tdBase, textAlign: 'center' }}>View</td>
              <td style={{ ...tdBase, textAlign: 'center' }}>Edit</td>
              <td style={{ ...tdBase, textAlign: 'center' }}>Process</td>
              <td style={tdBase}>976544899</td>
              <td style={tdBase}>Not Processed</td>
              <td style={{ ...tdBase, textAlign: 'center' }}>Assign</td>
            </tr>
          </tbody>
        </table>
      </div>
      <TablePaginationFooter
        summary={`Showing ${from} to ${to} of ${totalEntries} entries`}
        pagination={
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        }
      />
    </div>
  );
}
