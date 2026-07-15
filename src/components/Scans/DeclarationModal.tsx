import { useEffect } from 'react';

export const DECLARATION_POINTS = [
  'I have explained to the Client / Parent about the process of Fingerprint scanning & the scope of Genetic Brain Profiling Reports',
  'I have taken the due consent form Signed and will retain them as long as it is needed.',
  'I have inspected the Finger Prints carefully and found it meeting the guidelines.',
  'I am aware that the CW processing is available between 8 AM to 6 PM only.',
  'Bulk scans if any will be Uploaded after getting due consent from the Head Office.',
  'I am aware that the fingerprints can be deleted from the webserver by me once the report is generated/counseled.',
  'I take the full responsibility of housekeeping of my scans and archiving of reports.',
  'I would comply with the guidelines for Service delivery expected by MiDNA Global.',
] as const;

type DeclarationModalProps = {
  open: boolean;
  onClose: () => void;
  onAccept: () => void;
};

export function DeclarationModal({ open, onClose, onAccept }: DeclarationModalProps) {
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

  if (!open) return null;

  return (
    <div
      className="modal-overlay"
      role="presentation"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        className="modal-panel"
        role="dialog"
        aria-modal="true"
        aria-labelledby="declaration-title"
        style={{ maxWidth: 560 }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-header">
          <div>
            <h2 id="declaration-title" className="modal-title">
              Declaration
            </h2>
            <p className="modal-subtitle">Read and accept before submitting your zip upload.</p>
          </div>
          <button type="button" className="btn-icon" aria-label="Close" onClick={onClose}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
              <path d="M18 6 6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="modal-body">
          <ol
            style={{
              margin: 0,
              paddingLeft: 22,
              display: 'flex',
              flexDirection: 'column',
              gap: 12,
              fontSize: 14,
              lineHeight: 1.5,
              color: 'var(--color-text-secondary, #495057)',
            }}
          >
            {DECLARATION_POINTS.map((point) => (
              <li key={point}>{point}</li>
            ))}
          </ol>
        </div>

        <div className="modal-footer">
          <button type="button" className="btn-pill-secondary" onClick={onClose}>
            Cancel
          </button>
          <button
            type="button"
            className="btn-pill-primary"
            onClick={() => {
              onAccept();
              onClose();
            }}
          >
            I agree
          </button>
        </div>
      </div>
    </div>
  );
}
