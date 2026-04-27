import { useState } from 'react';
import { colors, spacing, radius, typography, tableTokens } from '../../styles/theme';
import Pagination from '../ui/Pagination';
import TablePaginationFooter from '../ui/TablePaginationFooter';

const theme = colors.light;

const performanceData = [
  { ledgerName: 'Murugesan', billing: 20, tds: 0, cms: 49, cqs: 214, cys: 214 },
  { ledgerName: 'AavishkarA (Anil B+)', billing: 18, tds: 0, cms: 24, cqs: 96, cys: 96 },
  { ledgerName: 'Jayalakshmi', billing: 16, tds: 1, cms: 16, cqs: 72, cys: 72 },
  { ledgerName: 'Sureshbabu L', billing: 12, tds: 0, cms: 15, cqs: 70, cys: 70 },
  { ledgerName: 'Shreshta Minds (RB)', billing: 16, tds: 0, cms: 9, cqs: 37, cys: 37 },
  { ledgerName: 'Jayashree Ganesan', billing: 20, tds: 0, cms: 5, cqs: 13, cys: 13 },
  { ledgerName: 'Vinodhini J', billing: 16, tds: 0, cms: 5, cqs: 38, cys: 38 },
  { ledgerName: 'Sifti Ahluwalia', billing: 25, tds: 0, cms: 5, cqs: 12, cys: 12 },
  { ledgerName: 'Soumya R', billing: 20, tds: 0, cms: 4, cqs: 20, cys: 20 },
  { ledgerName: 'Visukumar G', billing: 20, tds: 0, cms: 4, cqs: 12, cys: 12 },
];

const TOTAL_ENTRIES = 36;
const PAGE_SIZE = 10;
const TOTAL_PAGES = Math.ceil(TOTAL_ENTRIES / PAGE_SIZE);

export default function NestPerformance() {
  const [currentPage, setCurrentPage] = useState(1);
  const from = (currentPage - 1) * PAGE_SIZE + 1;
  const to = Math.min(currentPage * PAGE_SIZE, TOTAL_ENTRIES);

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
          NEST Performance
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
          Ledger billing and scan metrics
        </p>
      </div>
      <style>{`
        .nest-table-body tr:nth-child(even) { background: ${theme['table-zebra']}; }
        .nest-table-body tr:hover { background: ${theme['table-row-hover']}; }
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
              <th
                style={{
                  padding: spacing[2],
                  height: tableTokens.rowHeight,
                  background: theme['table-header-muted-secondary'],
                  color: theme['text-primary'],
                  fontSize: typography.sizes.sm.fontSize,
                  fontWeight: 600,
                  borderBottom: `1px solid ${theme['table-border']}`,
                  textAlign: 'left',
                }}
              >
                Ledger Name
              </th>
              <th
                style={{
                  padding: spacing[2],
                  height: tableTokens.rowHeight,
                  background: theme['table-header-muted-secondary'],
                  color: theme['text-primary'],
                  fontSize: typography.sizes.sm.fontSize,
                  fontWeight: 600,
                  borderBottom: `1px solid ${theme['table-border']}`,
                  textAlign: 'center',
                }}
              >
                %Billing
              </th>
              <th
                style={{
                  padding: spacing[2],
                  height: tableTokens.rowHeight,
                  background: theme['table-header-muted-secondary'],
                  color: theme['text-primary'],
                  fontSize: typography.sizes.sm.fontSize,
                  fontWeight: 600,
                  borderBottom: `1px solid ${theme['table-border']}`,
                  textAlign: 'center',
                }}
              >
                TDS
              </th>
              <th
                style={{
                  padding: spacing[2],
                  height: tableTokens.rowHeight,
                  background: theme['table-header-muted-secondary'],
                  color: theme['text-primary'],
                  fontSize: typography.sizes.sm.fontSize,
                  fontWeight: 600,
                  borderBottom: `1px solid ${theme['table-border']}`,
                  textAlign: 'center',
                }}
              >
                CMS
              </th>
              <th
                style={{
                  padding: spacing[2],
                  height: tableTokens.rowHeight,
                  background: theme['table-header-muted-secondary'],
                  color: theme['text-primary'],
                  fontSize: typography.sizes.sm.fontSize,
                  fontWeight: 600,
                  borderBottom: `1px solid ${theme['table-border']}`,
                  textAlign: 'center',
                }}
              >
                CQS
              </th>
              <th
                style={{
                  padding: spacing[2],
                  height: tableTokens.rowHeight,
                  background: theme['table-header-muted-secondary'],
                  color: theme['text-primary'],
                  fontSize: typography.sizes.sm.fontSize,
                  fontWeight: 600,
                  borderBottom: `1px solid ${theme['table-border']}`,
                  textAlign: 'center',
                }}
              >
                CYS
              </th>
            </tr>
          </thead>
          <tbody className="nest-table-body">
            {performanceData.map((row, i) => (
              <tr key={i} style={{ height: tableTokens.rowHeight }}>
                <td
                  style={{
                    padding: spacing[2],
                    color: theme['text-primary'],
                    fontSize: typography.sizes.sm.fontSize,
                    fontWeight: 400,
                    borderBottom: `1px solid ${theme['table-border']}`,
                  }}
                >
                  {row.ledgerName}
                </td>
                <td
                  style={{
                    padding: spacing[2],
                    color: theme['text-primary'],
                    fontSize: typography.sizes.sm.fontSize,
                    fontWeight: 400,
                    textAlign: 'center',
                    borderBottom: `1px solid ${theme['table-border']}`,
                  }}
                >
                  {row.billing}
                </td>
                <td
                  style={{
                    padding: spacing[2],
                    color: theme['text-primary'],
                    fontSize: typography.sizes.sm.fontSize,
                    fontWeight: 400,
                    textAlign: 'center',
                    borderBottom: `1px solid ${theme['table-border']}`,
                  }}
                >
                  {row.tds}
                </td>
                <td
                  style={{
                    padding: spacing[2],
                    color: theme['text-primary'],
                    fontSize: typography.sizes.sm.fontSize,
                    fontWeight: 400,
                    textAlign: 'center',
                    borderBottom: `1px solid ${theme['table-border']}`,
                  }}
                >
                  {row.cms}
                </td>
                <td
                  style={{
                    padding: spacing[2],
                    color: theme['text-primary'],
                    fontSize: typography.sizes.sm.fontSize,
                    fontWeight: 400,
                    textAlign: 'center',
                    borderBottom: `1px solid ${theme['table-border']}`,
                  }}
                >
                  {row.cqs}
                </td>
                <td
                  style={{
                    padding: spacing[2],
                    color: theme['text-primary'],
                    fontSize: typography.sizes.sm.fontSize,
                    fontWeight: 400,
                    textAlign: 'center',
                    borderBottom: `1px solid ${theme['table-border']}`,
                  }}
                >
                  {row.cys}
                </td>
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
