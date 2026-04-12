import type { CSSProperties } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { colors, spacing, radius, typography } from '../../styles/theme';

const theme = colors.light;

export type PaginationProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

function getPageNumbers(currentPage: number, totalPages: number): (number | 'ellipsis')[] {
  if (totalPages <= 5) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }
  const pages: (number | 'ellipsis')[] = [1];
  const showLeftEllipsis = currentPage > 3;
  const showRightEllipsis = currentPage < totalPages - 2;
  if (showLeftEllipsis) pages.push('ellipsis');
  const start = Math.max(2, currentPage - 1);
  const end = Math.min(totalPages - 1, currentPage + 1);
  for (let i = start; i <= end; i++) {
    if (!pages.includes(i)) pages.push(i);
  }
  if (showRightEllipsis) pages.push('ellipsis');
  if (totalPages > 1 && !pages.includes(totalPages)) pages.push(totalPages);
  return pages;
}

export default function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  const pages = getPageNumbers(currentPage, totalPages);
  const isFirstPage = currentPage <= 1;
  const isLastPage = currentPage >= totalPages;

  const baseButtonStyle: CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: spacing[1],
    padding: `${spacing[1]} ${spacing[2]}`,
    borderRadius: radius.sm,
    border: `1px solid ${theme.border}`,
    background: 'transparent',
    color: theme['text-primary'],
    fontSize: typography.sizes.sm.fontSize,
    fontFamily: typography.fonts.sans.family,
    cursor: 'pointer',
  };

  const disabledStyle: CSSProperties = {
    ...baseButtonStyle,
    color: theme['text-muted'],
    cursor: 'not-allowed',
  };

  const pageButtonStyle = (active: boolean): CSSProperties => ({
    ...baseButtonStyle,
    padding: `${spacing[1]} ${spacing[3]}`,
    minWidth: 36,
    justifyContent: 'center',
    borderRadius: radius.sm,
    ...(active
      ? {
          border: `1px solid ${theme['btn-primary-bg']}`,
          background: theme['btn-primary-bg'],
          color: theme['btn-primary-text'],
          fontWeight: 600,
        }
      : {
          border: `1px solid ${theme.border}`,
          background: theme['bg-surface'],
          color: theme['text-primary'],
        }),
  });

  return (
    <nav
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: spacing[2],
      }}
      aria-label="Pagination"
    >
      <button
        type="button"
        onClick={() => !isFirstPage && onPageChange(currentPage - 1)}
        disabled={isFirstPage}
        style={isFirstPage ? disabledStyle : baseButtonStyle}
        aria-label="Previous page"
      >
        <ChevronLeft size={16} />
        Previous
      </button>
      <div style={{ display: 'flex', alignItems: 'center', gap: spacing[2] }}>
        {pages.map((page, i) =>
          page === 'ellipsis' ? (
            <span
              key={`ellipsis-${i}`}
              style={{
                color: theme['text-primary'],
                fontSize: typography.sizes.sm.fontSize,
                padding: `0 ${spacing[1]}`,
              }}
            >
              ...
            </span>
          ) : (
            <button
              key={page}
              type="button"
              onClick={() => onPageChange(page)}
              style={pageButtonStyle(page === currentPage)}
              aria-label={`Page ${page}`}
              aria-current={page === currentPage ? 'page' : undefined}
            >
              {page}
            </button>
          )
        )}
      </div>
      <button
        type="button"
        onClick={() => !isLastPage && onPageChange(currentPage + 1)}
        disabled={isLastPage}
        style={isLastPage ? disabledStyle : baseButtonStyle}
        aria-label="Next page"
      >
        Next
        <ChevronRight size={16} />
      </button>
    </nav>
  );
}
