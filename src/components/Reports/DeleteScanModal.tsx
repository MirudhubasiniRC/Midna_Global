import { useEffect } from 'react';
import type { ReportRecord } from './reportTypes';

type DeleteScanModalProps = {
  open: boolean;
  record: ReportRecord | null;
  onClose: () => void;
  onConfirm: (record: ReportRecord) => void;
};

export function DeleteScanModal({ open, record, onClose, onConfirm }: DeleteScanModalProps) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [open, onClose]);

  if (!open || !record) return null;

  return (
    <div
      className="modal-overlay"
      role="presentation"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        className="modal-panel reports-delete-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="delete-scan-title"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-header">
          <div>
            <h2 id="delete-scan-title" className="modal-title">
              Delete scan?
            </h2>
            <p className="modal-subtitle">
              Scan {record.scanId} · {record.details.name || 'Client'}
            </p>
          </div>
          <button type="button" className="btn-icon" aria-label="Close" onClick={onClose}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
              <path d="M18 6 6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="modal-body">
          <p className="reports-delete-warning">
            This removes the scan, its report, and any counselling audio bytes from your account. This action
            cannot be undone.
          </p>
        </div>

        <div className="modal-footer">
          <button type="button" className="btn-pill-secondary" onClick={onClose}>
            Cancel
          </button>
          <button
            type="button"
            className="btn-pill-primary reports-delete-confirm"
            onClick={() => {
              onConfirm(record);
              onClose();
            }}
          >
            Delete scan
          </button>
        </div>
      </div>
    </div>
  );
}
