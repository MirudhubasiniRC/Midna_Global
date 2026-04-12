import type { ReactNode } from 'react';
import { colors, spacing, typography } from '../../styles/theme';

const theme = colors.light;

export type TablePaginationFooterProps = {
  /** Top line, e.g. “Showing 1 to 20 of 24 entries” (left-aligned) */
  summary: ReactNode;
  /** Centered row below summary, usually `<Pagination />` */
  pagination?: ReactNode;
};

/**
 * Bar below a table: summary on the first row (left), pagination centered on the second row
 * (same pattern as the ledger page). Place inside the same bordered wrapper as the table.
 */
export default function TablePaginationFooter({ summary, pagination }: TablePaginationFooterProps) {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'stretch',
        gap: spacing[2],
        padding: `${spacing[3]} ${spacing[2]}`,
        borderTop: `1px solid ${theme['table-border']}`,
        background: theme['bg-surface'],
      }}
    >
      <div
        style={{
          color: theme['text-secondary'],
          fontSize: typography.sizes.xs.fontSize,
          fontFamily: typography.fonts.sans.family,
        }}
      >
        {summary}
      </div>
      {pagination ? (
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            width: '100%',
          }}
        >
          {pagination}
        </div>
      ) : null}
    </div>
  );
}
