import { useState } from 'react';
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
import CustomDateRangeModal from '../ui/CustomDateRangeModal';
import AppModal, { APP_MODAL_FIELD_ATTR } from '../ui/AppModal';

const theme = colors.light;

const kpiCards = [
  { label: 'Ledger Name', value: 'Login User' },
  { label: 'Mobile no', value: '9364233342' },
  { label: 'Opening balance', value: '-9999' },
  { label: 'Closing balance', value: '-96938' },
];

const ledgerData = [
  { sno: 1, date: '14/03/2026', credit: '', debit: '', narration: 'PR-Payment received from Soumya R-in bank account of MiDNA Office' },
  { sno: 2, date: '13/03/2026', credit: '', debit: '9940', narration: 'AC-9940876987-Individual-Prashad V.B' },
  { sno: 3, date: '13/03/2026', credit: '', debit: '9940', narration: 'AC-9940876987-Individual-Prashad V.B' },
  { sno: 4, date: '12/03/2026', credit: '5000', debit: '', narration: 'PR-Payment received from John Doe' },
  { sno: 5, date: '11/03/2026', credit: '', debit: '3000', narration: 'AC-Scan payment' },
  { sno: 6, date: '10/03/2026', credit: '2000', debit: '', narration: 'PR-Payment received' },
  { sno: 7, date: '09/03/2026', credit: '', debit: '1500', narration: 'AC-Individual-Test User' },
  { sno: 8, date: '08/03/2026', credit: '4000', debit: '', narration: 'PR-Payment received' },
  { sno: 9, date: '07/03/2026', credit: '', debit: '2500', narration: 'AC-Payment' },
  { sno: 10, date: '06/03/2026', credit: '1000', debit: '', narration: 'PR-Payment received' },
  { sno: 11, date: '05/03/2026', credit: '', debit: '1200', narration: 'AC-Scan fee' },
  { sno: 12, date: '04/03/2026', credit: '3000', debit: '', narration: 'PR-Payment received' },
  { sno: 13, date: '03/03/2026', credit: '', debit: '800', narration: 'AC-Individual-Client' },
];

const PAGE_SIZE = 10;
const EMPTY_PLACEHOLDER = '–';

function Cell({ value }: { value: string }) {
  return value ? value : EMPTY_PLACEHOLDER;
}

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

export default function LedgerPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [showCustomDateForm, setShowCustomDateForm] = useState(false);
  const [showAddPayment, setShowAddPayment] = useState(false);
  const [paymentForm, setPaymentForm] = useState({
    ledgerName: '9364233342-MIDNA (H.O)',
    journalDate: '25/04/2026',
    paidBy: 'Bank Transfer',
    amount: '5000',
    narration: 'MIDNA (H.O)',
  });
  const totalEntries = ledgerData.length;
  const totalPages = Math.max(1, Math.ceil(totalEntries / PAGE_SIZE));
  const from = (currentPage - 1) * PAGE_SIZE;
  const to = Math.min(from + PAGE_SIZE, totalEntries);
  const pageData = ledgerData.slice(from, to);
  const isEmpty = totalEntries === 0;

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
      <h2
        style={{
          margin: `0 0 ${spacing[4]} 0`,
          fontSize: typography.sizes.xl.fontSize,
          fontWeight: typography.fonts.heading.fontWeight,
          fontFamily: typography.fonts.heading.family,
          color: theme['text-primary'],
        }}
      >
        Ledger Details
      </h2>

      {/* KPI cards */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: spacing[3],
          marginBottom: 0,
        }}
      >
        {kpiCards.map(({ label, value }) => (
          <div
            key={label}
            style={{
              background: theme['table-header-muted-secondary'],
              borderRadius: radius.sm,
              padding: spacing[3],
              border: `1px solid ${theme.border}`,
            }}
          >
            <div
              style={{
                fontSize: typography.sizes['2xs'].fontSize,
                color: theme['text-secondary'],
                marginBottom: spacing[1],
                fontFamily: typography.fonts.sans.family,
              }}
            >
              {label}
            </div>
            <div
              style={{
                fontSize: typography.sizes.sm.fontSize,
                fontWeight: 600,
                color: theme['text-primary'],
                fontFamily: typography.fonts.heading.family,
              }}
            >
              {value}
            </div>
          </div>
        ))}
      </div>

      {/* Table with header bar */}
      <div>
          <style>{`
            .ledger-table-body tr:nth-child(even) { background: ${theme['table-zebra']}; }
            .ledger-table-body tr:hover { background: ${theme['table-row-hover']}; }
          `}</style>
          {/* Free action buttons (no top grey segment) */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'flex-end',
              alignItems: 'center',
              gap: spacing[3],
              padding: `${spacing[5]} 0`,
            }}
          >
            <button
              type="button"
              onClick={() => setShowCustomDateForm(true)}
              style={{
                height: inputTokens.height.sm,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxSizing: 'border-box',
                padding: `${spacing[2]} ${spacing[4]}`,
                borderRadius: radius.sm,
                border: `1px solid ${theme.primary}`,
                background: theme['primary-soft'],
                color: theme.primary,
                fontFamily: typography.fonts.sans.family,
                fontSize: typography.sizes.sm.fontSize,
                fontWeight: 600,
                cursor: 'pointer',
              }}
            >
              Select custom date range
            </button>
            <button
              type="button"
              onClick={() => setShowAddPayment(true)}
              style={{
                height: inputTokens.height.sm,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxSizing: 'border-box',
                padding: `${spacing[2]} ${spacing[4]}`,
                borderRadius: radius.sm,
                border: 'none',
                background: theme['btn-primary-bg'],
                color: theme['btn-primary-text'],
                fontFamily: typography.fonts.sans.family,
                fontSize: typography.sizes.sm.fontSize,
                fontWeight: 600,
                cursor: 'pointer',
              }}
            >
              Add Payment
            </button>
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
              }}
            >
              <thead>
                <tr>
                  <th style={{ ...thStyle, textAlign: 'center', width: 90 }}>JID (Journal Id)</th>
                  <th style={{ ...thStyle, textAlign: 'left', width: 100 }}>Date</th>
                  <th style={{ ...thStyle, textAlign: 'right', width: 90 }}>Credit</th>
                  <th style={{ ...thStyle, textAlign: 'right', width: 90 }}>Debit</th>
                  <th style={{ ...thStyle, textAlign: 'left' }}>Narration</th>
                </tr>
              </thead>
              <tbody className="ledger-table-body">
                {isEmpty ? (
                  <tr>
                    <td
                      colSpan={5}
                      style={{
                        ...tdStyle,
                        textAlign: 'center',
                        padding: spacing[8],
                        color: theme['text-secondary'],
                        fontSize: typography.sizes.sm.fontSize,
                      }}
                    >
                      No ledger entries for this period
                    </td>
                  </tr>
                ) : (
                  pageData.map((row) => (
                    <tr key={row.sno} style={{ height: '40px' }}>
                      <td style={{ ...tdStyle, textAlign: 'center' }}>{row.sno}</td>
                      <td style={tdStyle}>{row.date}</td>
                      <td style={{ ...tdStyle, textAlign: 'right' }}><Cell value={row.credit} /></td>
                      <td style={{ ...tdStyle, textAlign: 'right' }}><Cell value={row.debit} /></td>
                      <td style={{ ...tdStyle, whiteSpace: 'normal', maxWidth: 400 }}><Cell value={row.narration} /></td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {!isEmpty && (
            <TablePaginationFooter
              summary={`Showing ${from + 1} to ${to} of ${totalEntries} entries`}
              pagination={
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={setCurrentPage}
                />
              }
            />
          )}
        </div>

      <AppModal
        open={showAddPayment}
        onClose={() => setShowAddPayment(false)}
        titleId="ledger-add-payment-title"
        ariaLabel="Add Payments"
        title="Add Payments"
        subtitle="Record payment details for this ledger."
        size="xl"
        footer={
          <button
            type="button"
            onClick={() => setShowAddPayment(false)}
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
            Submit
          </button>
        }
      >
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: spacing[3],
          }}
        >
          <label
            style={{
              display: 'grid',
              gap: spacing[1],
              fontSize: typography.sizes.xs.fontSize,
              color: theme['text-secondary'],
            }}
          >
            Ledger Name
            <select
              {...APP_MODAL_FIELD_ATTR}
              value={paymentForm.ledgerName}
              onChange={(e) => setPaymentForm((p) => ({ ...p, ledgerName: e.target.value }))}
              style={{
                height: inputTokens.height.sm,
                padding: `${spacing[1]} ${spacing[2]}`,
                borderRadius: radius.md,
                border: `1px solid ${theme.border}`,
                fontSize: typography.sizes.sm.fontSize,
                fontFamily: typography.fonts.sans.family,
                color: theme['text-primary'],
                background: theme['bg-surface'],
              }}
            >
              <option value="9364233342-MIDNA (H.O)">9364233342-MIDNA (H.O)</option>
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
              value={paymentForm.journalDate}
              onChange={(e) => setPaymentForm((p) => ({ ...p, journalDate: e.target.value }))}
              style={{
                height: inputTokens.height.sm,
                padding: `${spacing[1]} ${spacing[2]}`,
                borderRadius: radius.md,
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
            Paid by
            <select
              {...APP_MODAL_FIELD_ATTR}
              value={paymentForm.paidBy}
              onChange={(e) => setPaymentForm((p) => ({ ...p, paidBy: e.target.value }))}
              style={{
                height: inputTokens.height.sm,
                padding: `${spacing[1]} ${spacing[2]}`,
                borderRadius: radius.md,
                border: `1px solid ${theme.border}`,
                fontSize: typography.sizes.sm.fontSize,
                fontFamily: typography.fonts.sans.family,
                color: theme['text-primary'],
                background: theme['bg-surface'],
              }}
            >
              <option value="Bank Transfer">Bank Transfer</option>
              <option value="Cash">Cash</option>
              <option value="UPI">UPI</option>
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
            Amount
            <select
              {...APP_MODAL_FIELD_ATTR}
              value={paymentForm.amount}
              onChange={(e) => setPaymentForm((p) => ({ ...p, amount: e.target.value }))}
              style={{
                height: inputTokens.height.sm,
                padding: `${spacing[1]} ${spacing[2]}`,
                borderRadius: radius.md,
                border: `1px solid ${theme.border}`,
                fontSize: typography.sizes.sm.fontSize,
                fontFamily: typography.fonts.sans.family,
                color: theme['text-primary'],
                background: theme['bg-surface'],
              }}
            >
              <option value="5000">5000</option>
              <option value="3000">3000</option>
              <option value="2000">2000</option>
            </select>
          </label>
        </div>

        <label
          style={{
            display: 'grid',
            gap: spacing[1],
            marginTop: spacing[3],
            fontSize: typography.sizes.xs.fontSize,
            color: theme['text-secondary'],
          }}
        >
          Temp Credit taken by
          <textarea
            {...APP_MODAL_FIELD_ATTR}
            value={paymentForm.narration}
            onChange={(e) => setPaymentForm((p) => ({ ...p, narration: e.target.value }))}
            rows={5}
            style={{
              width: '100%',
              padding: spacing[2],
              borderRadius: radius.md,
              border: `1px solid ${theme.border}`,
              fontSize: typography.sizes.sm.fontSize,
              fontFamily: typography.fonts.sans.family,
              color: theme['text-primary'],
              background: theme['bg-surface'],
              resize: 'vertical',
              boxSizing: 'border-box',
            }}
          />
        </label>
      </AppModal>
      <CustomDateRangeModal
        open={showCustomDateForm}
        onClose={() => setShowCustomDateForm(false)}
        fromDate={fromDate}
        toDate={toDate}
        titleId="ledger-custom-date-range-title"
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
