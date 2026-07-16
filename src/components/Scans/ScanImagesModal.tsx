import { useEffect, useState } from 'react';
import { colors, radius, shadow } from '../../styles/theme';
import type { ScanRecord } from './scanTypes';
import { fingerprintSetsForScan } from './scanImages';

const theme = colors.light;

type ScanImagesModalProps = {
  open: boolean;
  record: ScanRecord | null;
  onClose: () => void;
};

function FingerprintPreview({ slot, active }: { slot: number; active: boolean }) {
  const ridges = 7 + (slot % 4);
  return (
    <div
      className={`scan-fp-thumb${active ? ' is-active' : ''}`}
      style={{
        background: theme['bg-surface'],
        borderRadius: radius.md,
        boxShadow: active ? shadow.float : shadow.card,
        border: active ? `2px solid ${theme.primary}` : `1px solid ${theme.border}`,
        overflow: 'hidden',
        aspectRatio: '1',
        display: 'grid',
        placeItems: 'center',
        padding: 10,
      }}
    >
      <svg viewBox="0 0 80 80" width="100%" height="100%" aria-hidden="true">
        <ellipse cx="40" cy="42" rx="26" ry="30" fill="none" stroke="#2d3436" strokeWidth="1.2" opacity="0.85" />
        {Array.from({ length: ridges }, (_, i) => {
          const ry = 8 + i * 3.2;
          const opacity = 0.35 + (i % 3) * 0.15;
          return (
            <ellipse
              key={i}
              cx="40"
              cy={40 + i * 0.6}
              rx={22 - i * 2.2}
              ry={ry}
              fill="none"
              stroke="#495057"
              strokeWidth={1 + (i % 2) * 0.3}
              opacity={opacity}
              transform={`rotate(${-8 + slot * 3 + i * 2} 40 40)`}
            />
          );
        })}
        <path
          d={`M${32 + slot} ${18 + (slot % 3)} Q40 ${12 + slot % 4} ${48 - slot % 2} ${20 + slot}`}
          fill="none"
          stroke="#212529"
          strokeWidth="1.4"
          opacity="0.7"
        />
      </svg>
    </div>
  );
}

export function ScanImagesModal({ open, record, onClose }: ScanImagesModalProps) {
  const [activeSlot, setActiveSlot] = useState(0);

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

  useEffect(() => {
    if (open) setActiveSlot(0);
  }, [open, record?.id]);

  if (!open || !record) return null;

  const sets = fingerprintSetsForScan(record.scanId);
  const clientLabel = record.details.name || 'Unnamed scan';

  return (
    <div
      className="modal-overlay"
      role="presentation"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        className="modal-panel scan-images-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="scan-images-title"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-header">
          <div>
            <h2 id="scan-images-title" className="modal-title">
              Scan images
            </h2>
            <p className="modal-subtitle">
              {record.scanId} · {clientLabel} · {record.fileName}
            </p>
          </div>
          <button type="button" className="btn-icon" aria-label="Close" onClick={onClose}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
              <path d="M18 6 6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="modal-body scan-images-body">
          <div className="scan-images-preview">
            <p className="scan-images-preview-label">Preview</p>
            <FingerprintPreview slot={activeSlot} active />
            <p className="scan-images-preview-meta">
              Set {sets[Math.floor(activeSlot / 3)]?.label ?? '—'} · Finger {(activeSlot % 3) + 1}
            </p>
          </div>

          <div className="scan-images-sets">
            {sets.map((set) => (
              <section key={set.label} className="scan-images-set">
                <h3 className="scan-images-set-label">{set.label}</h3>
                <div className="scan-images-set-grid">
                  {[0, 1, 2].map((finger) => {
                    const slot = set.slot * 3 + finger;
                    return (
                      <button
                        key={finger}
                        type="button"
                        className={`scan-fp-picker${activeSlot === slot ? ' is-selected' : ''}`}
                        onClick={() => setActiveSlot(slot)}
                        aria-label={`${set.label} finger ${finger + 1}`}
                      >
                        <FingerprintPreview slot={slot} active={activeSlot === slot} />
                      </button>
                    );
                  })}
                </div>
              </section>
            ))}
          </div>
        </div>

        <div className="modal-footer scan-images-footer">
          <p className="scan-images-footnote">Fingerprint previews open in-app. Zip packages are not downloaded.</p>
          <button type="button" className="btn-pill-secondary" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
