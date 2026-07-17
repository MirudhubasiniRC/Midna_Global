import { useEffect } from 'react';
import type { ReportRecord } from './reportTypes';

type UpgradeReportModalProps = {
  open: boolean;
  record: ReportRecord | null;
  onClose: () => void;
  onConfirm: (record: ReportRecord) => void;
};

const premiumPerks = [
  'Extended 40+ page premium report',
  'Detailed intelligence & personality mapping',
  'Extra counselling audio bytes (CAB) included',
  'Priority processing at Head Office',
];

export function UpgradeReportModal({ open, record, onClose, onConfirm }: UpgradeReportModalProps) {
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
        className="modal-panel reports-upgrade-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="upgrade-report-title"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-header">
          <div>
            <h2 id="upgrade-report-title" className="modal-title">
              Upgrade to Premium
            </h2>
            <p className="modal-subtitle">
              Scan {record.scanId} · {record.details.name || 'Client'} — currently on the {record.plan} plan.
            </p>
          </div>
          <button type="button" className="btn-icon" aria-label="Close" onClick={onClose}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
              <path d="M18 6 6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="modal-body">
          <div className="reports-upgrade-price">
            <span className="reports-upgrade-price-value">₹1,000</span>
            <span className="reports-upgrade-price-meta">one-time upgrade · debited from your ledger</span>
          </div>
          <ul className="reports-upgrade-perks">
            {premiumPerks.map((perk) => (
              <li key={perk}>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 6 9 17l-5-5" />
                </svg>
                {perk}
              </li>
            ))}
          </ul>
        </div>

        <div className="modal-footer">
          <button type="button" className="btn-pill-secondary" onClick={onClose}>
            Not now
          </button>
          <button
            type="button"
            className="btn-pill-primary"
            onClick={() => {
              onConfirm(record);
              onClose();
            }}
          >
            Upgrade report
          </button>
        </div>
      </div>
    </div>
  );
}
