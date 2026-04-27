import type { ButtonHTMLAttributes } from 'react';
import { colors } from '../../styles/theme';

const theme = colors.light;

export type FilterPillButtonProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'type'> & {
  /** When true, filled primary; when false, soft fill with primary border and text */
  active: boolean;
};

/**
 * Shared pill filter used e.g. NLA Network (SRA) and GBP resources — same active/hover behavior.
 */
export default function FilterPillButton({
  active,
  className = '',
  style,
  'aria-pressed': ariaPressed,
  children,
  ...rest
}: FilterPillButtonProps) {
  return (
    <button
      type="button"
      className={`midna-filter-pill ${active ? 'midna-filter-pill--on' : 'midna-filter-pill--off'} ${className}`.trim()}
      aria-pressed={ariaPressed ?? active}
      style={{
        ['--mp-primary' as string]: theme.primary,
        ['--mp-soft' as string]: theme['primary-soft'],
        ['--mp-inverse' as string]: theme['text-inverse'],
        ['--mp-primary-hover' as string]: theme['primary-hover'],
        ...style,
      }}
      {...rest}
    >
      {children}
    </button>
  );
}
