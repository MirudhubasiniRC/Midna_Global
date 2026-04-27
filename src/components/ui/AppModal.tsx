import { useEffect, type ReactNode } from 'react';
import {
  colors,
  spacing,
  radius,
  typography,
  modalTokens,
  type ModalSize,
} from '../../styles/theme';

const theme = colors.light;

const ROOT_CLASS = 'app-modal-root';

export type AppModalProps = {
  open: boolean;
  onClose: () => void;
  /** `aria-labelledby` id */
  titleId: string;
  /** Optional `aria-label` when title is not plain text */
  ariaLabel?: string;
  title?: ReactNode;
  subtitle?: ReactNode;
  /** Replaces default title + subtitle block (e.g. icon + multi-line header) */
  headerContent?: ReactNode;
  /** Extra controls before the close button (e.g. Print) */
  headerActions?: ReactNode;
  children: ReactNode;
  footer?: ReactNode;
  size?: ModalSize;
  /** Overrides `size` max-width (px) */
  maxWidthPx?: number;
  maxHeight?: string;
  showCloseButton?: boolean;
  /** `false` = flat header (no brand gradient) */
  headerVariant?: 'brand' | 'plain';
  /** `useEffect` friendly: body becomes scroll region when `maxHeight` is set */
  scrollBody?: boolean;
  /** `stack` = full-width column (e.g. date range primary + secondary) */
  footerLayout?: 'row' | 'stack';
};

function modalMaxW(size: ModalSize | undefined, maxWidthPx: number | undefined) {
  if (typeof maxWidthPx === 'number') return maxWidthPx;
  return modalTokens.maxWidth[size ?? 'md'];
}

export default function AppModal({
  open,
  onClose,
  titleId,
  ariaLabel,
  title,
  subtitle,
  headerContent,
  headerActions,
  children,
  footer,
  size = 'md',
  maxWidthPx,
  maxHeight,
  showCloseButton = true,
  headerVariant = 'brand',
  scrollBody = true,
  footerLayout = 'row',
}: AppModalProps) {
  const maxW = modalMaxW(size, maxWidthPx);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  if (!open) return null;

  const headerBackground =
    headerVariant === 'brand'
      ? `linear-gradient(180deg, ${theme['table-header-bg']} 0%, ${theme['bg-surface']} 100%)`
      : theme['bg-surface'];

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
      aria-label={ariaLabel}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: modalTokens.zIndex,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: spacing[4],
        background: modalTokens.overlayBackground,
        backdropFilter: modalTokens.overlayBackdropBlur,
      }}
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        className={ROOT_CLASS}
        onMouseDown={(e) => e.stopPropagation()}
        style={{
          width: '100%',
          maxWidth: maxW,
          maxHeight: maxHeight ?? 'none',
          display: 'flex',
          flexDirection: 'column',
          background: theme['bg-surface'],
          borderRadius: radius.lg,
          border: `1px solid ${theme.border}`,
          boxShadow: modalTokens.cardBoxShadow,
          overflow: 'hidden',
        }}
      >
        <style>{`
          .${ROOT_CLASS} [data-app-modal-field]:focus {
            outline: none;
            border-color: ${theme.primary};
            box-shadow: 0 0 0 3px ${theme['primary-soft']};
          }
        `}</style>
        <div
          style={{
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'space-between',
            gap: spacing[3],
            padding: modalTokens.headerPadding,
            background: headerBackground,
            borderBottom: `1px solid ${theme.border}`,
            flexShrink: 0,
          }}
        >
          {headerContent ? (
            <div style={{ flex: 1, minWidth: 0 }}>{headerContent}</div>
          ) : (
            <div style={{ flex: 1, minWidth: 0 }}>
              {title != null && title !== false ? (
                <h2
                  id={titleId}
                  style={{
                    margin: 0,
                    fontSize: typography.sizes.xl.fontSize,
                    fontWeight: typography.fonts.heading.fontWeight,
                    fontFamily: typography.fonts.heading.family,
                    color: theme['text-primary'],
                    letterSpacing: typography.fonts.heading.letterSpacing,
                  }}
                >
                  {title}
                </h2>
              ) : null}
              {subtitle ? (
                <p
                  style={{
                    margin: title != null && title !== false ? `${spacing[2]} 0 0 0` : 0,
                    fontSize: typography.sizes.sm.fontSize,
                    color: theme['text-secondary'],
                    fontFamily: typography.fonts.sans.family,
                    lineHeight: 1.45,
                  }}
                >
                  {subtitle}
                </p>
              ) : null}
            </div>
          )}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: spacing[2],
              flexShrink: 0,
            }}
          >
            {headerActions}
            {showCloseButton ? (
              <button
                type="button"
                onClick={onClose}
                aria-label="Close"
                style={{
                  width: modalTokens.closeButtonSize,
                  height: modalTokens.closeButtonSize,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: 'none',
                  borderRadius: radius.pill,
                  background: theme['bg-surface'],
                  color: theme['text-secondary'],
                  fontSize: typography.sizes.base.fontSize,
                  lineHeight: 1,
                  cursor: 'pointer',
                  boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = theme['bg-base'];
                  e.currentTarget.style.color = theme['text-primary'];
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = theme['bg-surface'];
                  e.currentTarget.style.color = theme['text-secondary'];
                }}
              >
                ×
              </button>
            ) : null}
          </div>
        </div>

        <div
          style={{
            flex: maxHeight && scrollBody ? 1 : undefined,
            overflow: maxHeight && scrollBody ? 'auto' : undefined,
            minHeight: 0,
            padding: modalTokens.contentPadding,
          }}
        >
          {children}
        </div>

        {footer ? (
          <div
            style={{
              flexShrink: 0,
              display: 'flex',
              flexDirection: footerLayout === 'stack' ? 'column' : 'row',
              justifyContent: footerLayout === 'stack' ? 'flex-start' : 'flex-end',
              flexWrap: 'wrap',
              alignItems: footerLayout === 'stack' ? 'stretch' : 'center',
              gap: spacing[3],
              padding: modalTokens.footerPadding,
              borderTop: `1px solid ${theme.border}`,
              background: theme['table-zebra'],
            }}
          >
            {footer}
          </div>
        ) : null}
      </div>
    </div>
  );
}

/** Use on native inputs in modal forms to get focus ring from `AppModal` */
export const APP_MODAL_FIELD_ATTR = { 'data-app-modal-field': true as const };
