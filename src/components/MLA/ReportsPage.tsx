import { useMemo, useState } from 'react';
import {
  colors,
  spacing,
  radius,
  typography,
  buttonTokens,
  modalTokens,
} from '../../styles/theme';
import Pagination from '../ui/Pagination';
import TablePaginationFooter from '../ui/TablePaginationFooter';
import CustomDateRangeModal from '../ui/CustomDateRangeModal';
import AppModal, { APP_MODAL_FIELD_ATTR } from '../ui/AppModal';

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
    report: 'ready',
    amount: '3000.00',
  },
  {
    sno: 2,
    scanId: 'S39420',
    scanDate: '2025-12-18',
    name: 'KARTHIK R / Male / 21',
    clientType: 'Individual / DDS-Xx',
    sra: 'SELF',
    report: 'ready',
    amount: '2000.00',
  },
];

export default function ReportsPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(20);
  const [search, setSearch] = useState('');
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [showCustomDateForm, setShowCustomDateForm] = useState(false);
  const [selectedScan, setSelectedScan] = useState<(typeof sampleData)[number] | null>(null);
  const [upgradeRow, setUpgradeRow] = useState<(typeof sampleData)[number] | null>(null);
  const todayIso = new Date().toISOString().slice(0, 10);
  const filteredData = useMemo(() => {
    const q = search.trim().toLowerCase();
    return sampleData.filter((row) => {
      const searchMatch = !q || row.scanId.toLowerCase().includes(q);
      const dateMatch =
        (!fromDate || row.scanDate >= fromDate) &&
        (!toDate || row.scanDate <= toDate);
      return searchMatch && dateMatch;
    });
  }, [search, fromDate, toDate]);
  const totalEntries = filteredData.length;
  const totalPages = Math.max(1, Math.ceil(totalEntries / pageSize));
  const from = totalEntries === 0 ? 0 : (currentPage - 1) * pageSize + 1;
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
          My Reports
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
          Search Scan Id:
          <input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by scan id..."
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
        <button
          type="button"
          onClick={() => setShowCustomDateForm(true)}
          style={{
            padding: `${spacing[2]} ${spacing[4]}`,
            borderRadius: radius.sm,
            border: `1px solid ${theme.primary}`,
            background: theme['primary-soft'],
            color: theme.primary,
            fontSize: typography.sizes.sm.fontSize,
            fontFamily: typography.fonts.sans.family,
            fontWeight: 600,
            cursor: 'pointer',
          }}
        >
          Select custom date range
        </button>
        <div
          style={{
            display: 'none',
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
              <th style={{ ...thStyle, textAlign: 'center' }}>Upgrade Journal</th>
              <th style={{ ...thStyle, textAlign: 'right' }}>Amount</th>
              <th style={{ ...thStyle, textAlign: 'center' }}>Scan</th>
            </tr>
          </thead>
          <tbody className="reports-table-body">
            {filteredData.map((row) => (
              <tr key={row.scanId} style={{ height: '40px' }}>
                <td style={{ ...tdStyle, textAlign: 'center' }}>{row.sno}</td>
                <td style={tdStyle}>
                  <button
                    type="button"
                    onClick={() => setSelectedScan(row)}
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
                    {row.scanId}
                  </button>
                </td>
                <td style={tdStyle}>{row.scanDate}</td>
                <td style={tdStyle}>{row.name}</td>
                <td style={tdStyle}>{row.clientType}</td>
                <td style={tdStyle}>{row.sra}</td>
                <td style={{ ...tdStyle, textAlign: 'center' }}>
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
                    Download
                  </span>
                </td>
                <td style={{ ...tdStyle, textAlign: 'center' }}>
                  <button
                    type="button"
                    onClick={() => setUpgradeRow(row)}
                    style={{
                      display: 'inline-block',
                      padding: `${spacing[1]} ${spacing[3]}`,
                      border: `1px solid ${theme.primary}`,
                      background: theme['primary-soft'],
                      color: theme.primary,
                      borderRadius: radius.pill,
                      fontSize: typography.sizes.xs.fontSize,
                      fontFamily: typography.fonts.sans.family,
                      fontWeight: 500,
                      cursor: 'pointer',
                    }}
                  >
                    Request
                  </button>
                </td>
                <td style={{ ...tdStyle, textAlign: 'right' }}>{row.amount}</td>
                <td style={{ ...tdStyle, textAlign: 'center' }}>
                  <span
                    style={{
                      display: 'inline-block',
                      padding: `${spacing[1]} ${spacing[3]}`,
                      border: `1px solid ${theme.error}`,
                      background: theme['error-bg'],
                      color: theme.error,
                      borderRadius: radius.pill,
                      fontSize: typography.sizes.xs.fontSize,
                      fontFamily: typography.fonts.sans.family,
                      fontWeight: 500,
                    }}
                  >
                    Delete
                  </span>
                </td>
              </tr>
            ))}
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

      <AppModal
        open={!!selectedScan}
        onClose={() => setSelectedScan(null)}
        titleId="reports-fp-images-title"
        ariaLabel="Scan images"
        size="3xl"
        maxHeight="88vh"
        headerContent={
          selectedScan ? (
            <div>
              <h2
                id="reports-fp-images-title"
                style={{
                  margin: 0,
                  fontSize: typography.sizes.xl.fontSize,
                  fontFamily: typography.fonts.heading.family,
                  fontWeight: typography.fonts.heading.fontWeight,
                  color: theme['text-primary'],
                }}
              >
                Finger Print Images
              </h2>
              <p
                style={{
                  margin: `${spacing[1]} 0 0 0`,
                  color: theme['text-secondary'],
                  fontSize: typography.sizes.sm.fontSize,
                  fontFamily: typography.fonts.sans.family,
                }}
              >
                Scan ID : {selectedScan.scanId} . Name : {selectedScan.name.split('/')[0].trim()}
              </p>
            </div>
          ) : null
        }
        headerActions={
          <button
            type="button"
            onClick={() => window.print()}
            style={{
              border: `1px solid ${theme.primary}`,
              background: theme['primary-soft'],
              color: theme.primary,
              fontSize: typography.sizes.xs.fontSize,
              fontFamily: typography.fonts.sans.family,
              fontWeight: 600,
              cursor: 'pointer',
              borderRadius: radius.pill,
              padding: `${spacing[1]} ${spacing[3]}`,
            }}
          >
            Print
          </button>
        }
      >
        {selectedScan
          ? (['Left Hand', 'Right Hand'] as const).map((hand) => (
              <div key={hand} style={{ marginBottom: spacing[5] }}>
                <h4
                  style={{
                    margin: `0 0 ${spacing[2]} 0`,
                    textAlign: 'center',
                    fontSize: typography.sizes.lg.fontSize,
                    color: theme['text-primary'],
                    fontFamily: typography.fonts.heading.family,
                  }}
                >
                  {hand}
                </h4>
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(5, minmax(110px, 1fr))',
                    gap: spacing[2],
                  }}
                >
                  {Array.from({ length: 5 }).map((_, idx) => (
                    <div
                      key={`${hand}-${idx}`}
                      style={{
                        height: 140,
                        borderRadius: radius.sm,
                        background:
                          'radial-gradient(circle at 50% 50%, #f6f6f6 0%, #d6d6d6 14%, #9c9c9c 28%, #2c2c2c 45%, #000 70%)',
                        border: `1px solid ${theme.border}`,
                        boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.06)',
                      }}
                    />
                  ))}
                </div>
              </div>
            ))
          : null}
      </AppModal>

      <AppModal
        open={!!upgradeRow}
        onClose={() => setUpgradeRow(null)}
        titleId="reports-upgrade-journal-title"
        ariaLabel="Upgrade journal"
        title="Upgrade Journal"
        subtitle="Update journal and MRP for this record."
        size="2xl"
        footer={
          <button
            type="submit"
            form="reports-upgrade-journal-form"
            style={{
              height: buttonTokens.height.md,
              padding: buttonTokens.padding.md,
              borderRadius: radius.pill,
              border: 'none',
              background: theme['btn-primary-bg'],
              color: theme['btn-primary-text'],
              fontSize: typography.sizes.sm.fontSize,
              fontFamily: typography.fonts.sans.family,
              fontWeight: 600,
              cursor: 'pointer',
              boxShadow: modalTokens.primaryActionBoxShadow,
            }}
          >
            Upgrade
          </button>
        }
      >
        {upgradeRow ? (
          <form
            id="reports-upgrade-journal-form"
            onSubmit={(e) => {
              e.preventDefault();
              setUpgradeRow(null);
            }}
            style={{ display: 'grid', gap: spacing[3], margin: 0, padding: 0 }}
          >
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: spacing[3] }}>
              <label
                style={{
                  display: 'grid',
                  gap: spacing[1],
                  fontSize: typography.sizes.xs.fontSize,
                  color: theme['text-secondary'],
                }}
              >
                From
                <select
                  {...APP_MODAL_FIELD_ATTR}
                  style={{
                    padding: `${spacing[2]} ${spacing[2]}`,
                    borderRadius: radius.md,
                    border: `1px solid ${theme.border}`,
                    fontSize: typography.sizes.sm.fontSize,
                    fontFamily: typography.fonts.sans.family,
                  }}
                >
                  <option>Rathinaswamy A</option>
                </select>
              </label>
              <label
                style={{
                  display: 'grid',
                  gap: spacing[1],
                  fontSize: typography.sizes.xs.fontSize,
                  color: theme['text-secondary'],
                }}
              >
                To
                <select
                  {...APP_MODAL_FIELD_ATTR}
                  style={{
                    padding: `${spacing[2]} ${spacing[2]}`,
                    borderRadius: radius.md,
                    border: `1px solid ${theme.border}`,
                    fontSize: typography.sizes.sm.fontSize,
                    fontFamily: typography.fonts.sans.family,
                  }}
                >
                  <option>Rathinaswamy A</option>
                </select>
              </label>
              <label
                style={{
                  display: 'grid',
                  gap: spacing[1],
                  fontSize: typography.sizes.xs.fontSize,
                  color: theme['text-secondary'],
                }}
              >
                Journal Date
                <input
                  {...APP_MODAL_FIELD_ATTR}
                  type="date"
                  value={todayIso}
                  readOnly
                  style={{
                    padding: `${spacing[2]} ${spacing[2]}`,
                    borderRadius: radius.md,
                    border: `1px solid ${theme.border}`,
                    fontSize: typography.sizes.sm.fontSize,
                    fontFamily: typography.fonts.sans.family,
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
                Type
                <select
                  value="Debit"
                  disabled
                  style={{
                    padding: `${spacing[2]} ${spacing[2]}`,
                    borderRadius: radius.md,
                    border: `1px solid ${theme.border}`,
                    fontSize: typography.sizes.sm.fontSize,
                    fontFamily: typography.fonts.sans.family,
                  }}
                >
                  <option>Debit</option>
                </select>
              </label>
            </div>
            <div style={{ fontSize: typography.sizes.xs.fontSize, color: theme['text-secondary'] }}>
              (OLD MRP 2000.00) Select New MRP
            </div>
            <input
              {...APP_MODAL_FIELD_ATTR}
              type="number"
              min={2000}
              max={5000}
              placeholder="Enter amount (2000.00 - 5000.00)"
              style={{
                width: '100%',
                padding: `${spacing[2]} ${spacing[2]}`,
                borderRadius: radius.md,
                border: `1px solid ${theme.border}`,
                fontSize: typography.sizes.sm.fontSize,
                fontFamily: typography.fonts.sans.family,
              }}
            />
            <label
              style={{
                display: 'grid',
                gap: spacing[1],
                fontSize: typography.sizes.xs.fontSize,
                color: theme['text-secondary'],
              }}
            >
              Remarks
              <input
                {...APP_MODAL_FIELD_ATTR}
                type="text"
                defaultValue={`DDS - ${upgradeRow.name.split('/')[0].trim()} - Upgrade - Rathinaswamy A`}
                style={{
                  padding: `${spacing[2]} ${spacing[2]}`,
                  borderRadius: radius.md,
                  border: `1px solid ${theme.border}`,
                  fontSize: typography.sizes.sm.fontSize,
                  fontFamily: typography.fonts.sans.family,
                }}
              />
            </label>
          </form>
        ) : null}
      </AppModal>

      <CustomDateRangeModal
        open={showCustomDateForm}
        onClose={() => setShowCustomDateForm(false)}
        fromDate={fromDate}
        toDate={toDate}
        titleId="reports-custom-date-range-title"
        onApply={({ from, to }) => {
          setFromDate(from);
          setToDate(to);
          setCurrentPage(1);
          setShowCustomDateForm(false);
        }}
      />
    </div>
  );
}
