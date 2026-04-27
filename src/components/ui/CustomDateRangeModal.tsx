import { useEffect, useMemo, useState, type CSSProperties, type FormEvent } from 'react';
import {
  colors,
  spacing,
  radius,
  typography,
  inputTokens,
  buttonTokens,
  modalTokens,
} from '../../styles/theme';
import AppModal, { APP_MODAL_FIELD_ATTR } from './AppModal';

const theme = colors.light;

const ISO_DATE = /^\d{4}-\d{2}-\d{2}$/;

/** Valid when both are non-empty YYYY-MM-DD, parseable, and start ≤ end */
export function isValidDateRange(from: string, to: string): boolean {
  const a = from.trim();
  const b = to.trim();
  if (!a || !b) return false;
  if (!ISO_DATE.test(a) || !ISO_DATE.test(b)) return false;
  const start = new Date(`${a}T12:00:00`);
  const end = new Date(`${b}T12:00:00`);
  if (Number.isNaN(start.getTime()) || Number.isNaN(end.getTime())) return false;
  return start <= end;
}

export type CustomDateRangeModalProps = {
  open: boolean;
  onClose: () => void;
  fromDate: string;
  toDate: string;
  onApply: (range: { from: string; to: string }) => void;
  titleId?: string;
};

const labelStyle: CSSProperties = {
  display: 'block',
  marginBottom: spacing[2],
  fontSize: typography.sizes.sm.fontSize,
  fontWeight: 600,
  fontFamily: typography.fonts.sans.family,
  color: theme['text-secondary'],
};

export default function CustomDateRangeModal({
  open,
  onClose,
  fromDate,
  toDate,
  onApply,
  titleId = 'custom-date-range-title',
}: CustomDateRangeModalProps) {
  const [draftFrom, setDraftFrom] = useState(fromDate);
  const [draftTo, setDraftTo] = useState(toDate);
  const formId = `${titleId}-form`;

  useEffect(() => {
    if (open) {
      setDraftFrom(fromDate);
      setDraftTo(toDate);
    }
  }, [open, fromDate, toDate]);

  const rangeOk = useMemo(
    () => isValidDateRange(draftFrom, draftTo),
    [draftFrom, draftTo]
  );

  const showOrderError =
    Boolean(draftFrom.trim() && draftTo.trim()) && !rangeOk;
  const fieldBorder = showOrderError ? theme.error : theme.border;

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!isValidDateRange(draftFrom, draftTo)) return;
    onApply({ from: draftFrom.trim(), to: draftTo.trim() });
  };

  return (
    <AppModal
      open={open}
      onClose={onClose}
      titleId={titleId}
      title="Custom Date Range"
      subtitle="Select start and end dates for custom range"
      size="md"
      footerLayout="stack"
      footer={
        <>
          <button
            type="submit"
            form={formId}
            disabled={!rangeOk}
            style={{
              width: '100%',
              height: buttonTokens.height.md,
              border: 'none',
              borderRadius: radius.pill,
              background: rangeOk ? theme['btn-primary-bg'] : theme['btn-disabled-bg'],
              color: rangeOk ? theme['btn-primary-text'] : theme['btn-disabled-text'],
              fontSize: typography.sizes.sm.fontSize,
              fontFamily: typography.fonts.sans.family,
              fontWeight: 600,
              cursor: rangeOk ? 'pointer' : 'not-allowed',
              boxShadow: rangeOk ? modalTokens.primaryActionBoxShadow : 'none',
            }}
          >
            Apply range
          </button>
          <button
            type="button"
            onClick={onClose}
            style={{
              width: '100%',
              height: buttonTokens.height.sm,
              border: `1px solid ${theme.border}`,
              borderRadius: radius.pill,
              background: theme['bg-surface'],
              color: theme['text-secondary'],
              fontSize: typography.sizes.sm.fontSize,
              fontFamily: typography.fonts.sans.family,
              fontWeight: 500,
              cursor: 'pointer',
            }}
          >
            Cancel
          </button>
        </>
      }
    >
      <form id={formId} onSubmit={onSubmit} style={{ margin: 0, display: 'grid', gap: spacing[4] }}>
        <div>
          <label htmlFor={`${titleId}-start`} style={labelStyle}>
            Start date
          </label>
          <input
            {...APP_MODAL_FIELD_ATTR}
            id={`${titleId}-start`}
            type="date"
            value={draftFrom}
            onChange={(e) => setDraftFrom(e.target.value)}
            style={{
              width: '100%',
              boxSizing: 'border-box',
              height: inputTokens.height.md,
              padding: `0 ${spacing[3]}`,
              borderRadius: radius.md,
              border: `1px solid ${fieldBorder}`,
              fontSize: typography.sizes.sm.fontSize,
              fontFamily: typography.fonts.sans.family,
              color: theme['text-primary'],
              background: theme['bg-surface'],
            }}
          />
        </div>
        <div>
          <label htmlFor={`${titleId}-end`} style={labelStyle}>
            End date
          </label>
          <input
            {...APP_MODAL_FIELD_ATTR}
            id={`${titleId}-end`}
            type="date"
            value={draftTo}
            onChange={(e) => setDraftTo(e.target.value)}
            min={draftFrom && ISO_DATE.test(draftFrom.trim()) ? draftFrom.trim() : undefined}
            style={{
              width: '100%',
              boxSizing: 'border-box',
              height: inputTokens.height.md,
              padding: `0 ${spacing[3]}`,
              borderRadius: radius.md,
              border: `1px solid ${fieldBorder}`,
              fontSize: typography.sizes.sm.fontSize,
              fontFamily: typography.fonts.sans.family,
              color: theme['text-primary'],
              background: theme['bg-surface'],
            }}
          />
        </div>
        {showOrderError ? (
          <p
            role="alert"
            style={{
              margin: 0,
              fontSize: typography.sizes.sm.fontSize,
              color: theme.error,
              fontFamily: typography.fonts.sans.family,
            }}
          >
            End date must be on or after the start date.
          </p>
        ) : null}
      </form>
    </AppModal>
  );
}
