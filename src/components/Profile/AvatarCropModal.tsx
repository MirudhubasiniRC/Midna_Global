import { useEffect, useRef, useState } from 'react';
import { colors, spacing } from '../../styles/theme';

const theme = colors.light;

/** Display size of the crop circle, in px */
const CROP_SIZE = 280;
/** Exported image resolution, in px */
const OUTPUT_SIZE = 480;
const MIN_ZOOM = 1;
const MAX_ZOOM = 3;

type Size = { w: number; h: number };
type Offset = { x: number; y: number };

type AvatarCropModalProps = {
  imageSrc: string;
  onCancel: () => void;
  onSave: (dataUrl: string) => void;
};

function clampOffset(next: Offset, scale: number, size: Size | null): Offset {
  if (!size) return next;
  const scaledW = size.w * scale;
  const scaledH = size.h * scale;
  const maxX = Math.max(0, (scaledW - CROP_SIZE) / 2);
  const maxY = Math.max(0, (scaledH - CROP_SIZE) / 2);
  return {
    x: Math.min(maxX, Math.max(-maxX, next.x)),
    y: Math.min(maxY, Math.max(-maxY, next.y)),
  };
}

export function AvatarCropModal({ imageSrc, onCancel, onSave }: AvatarCropModalProps) {
  const [zoom, setZoom] = useState(1);
  const [offset, setOffset] = useState<Offset>({ x: 0, y: 0 });
  const [naturalSize, setNaturalSize] = useState<Size | null>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const dragRef = useRef<{ startX: number; startY: number; offsetX: number; offsetY: number } | null>(null);

  useEffect(() => {
    const img = new Image();
    img.onload = () => setNaturalSize({ w: img.naturalWidth, h: img.naturalHeight });
    img.src = imageSrc;
  }, [imageSrc]);

  const baseScale = naturalSize ? Math.max(CROP_SIZE / naturalSize.w, CROP_SIZE / naturalSize.h) : 1;
  const scale = baseScale * zoom;

  const handlePointerDown = (e: React.PointerEvent) => {
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    dragRef.current = { startX: e.clientX, startY: e.clientY, offsetX: offset.x, offsetY: offset.y };
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!dragRef.current) return;
    const dx = e.clientX - dragRef.current.startX;
    const dy = e.clientY - dragRef.current.startY;
    setOffset(clampOffset({ x: dragRef.current.offsetX + dx, y: dragRef.current.offsetY + dy }, scale, naturalSize));
  };

  const handlePointerUp = () => {
    dragRef.current = null;
  };

  const handleZoomChange = (nextZoom: number) => {
    setZoom(nextZoom);
    setOffset((prev) => clampOffset(prev, baseScale * nextZoom, naturalSize));
  };

  const handleSave = () => {
    const img = imgRef.current;
    if (!img || !naturalSize) return;
    const canvas = document.createElement('canvas');
    canvas.width = OUTPUT_SIZE;
    canvas.height = OUTPUT_SIZE;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const exportScale = (OUTPUT_SIZE / CROP_SIZE) * scale;
    const drawW = naturalSize.w * exportScale;
    const drawH = naturalSize.h * exportScale;
    const drawX = OUTPUT_SIZE / 2 - drawW / 2 + offset.x * (OUTPUT_SIZE / CROP_SIZE);
    const drawY = OUTPUT_SIZE / 2 - drawH / 2 + offset.y * (OUTPUT_SIZE / CROP_SIZE);

    ctx.save();
    ctx.beginPath();
    ctx.arc(OUTPUT_SIZE / 2, OUTPUT_SIZE / 2, OUTPUT_SIZE / 2, 0, Math.PI * 2);
    ctx.clip();
    ctx.drawImage(img, drawX, drawY, drawW, drawH);
    ctx.restore();

    onSave(canvas.toDataURL('image/png'));
  };

  return (
    <div className="modal-overlay" role="dialog" aria-modal="true" aria-label="Adjust profile photo">
      <div className="modal-panel" style={{ maxWidth: 420 }}>
        <div className="modal-header">
          <div>
            <h2 className="modal-title">Adjust photo</h2>
            <p className="modal-subtitle">Drag to reposition, use the slider to zoom.</p>
          </div>
          <button type="button" className="btn-icon" aria-label="Cancel" onClick={onCancel}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 6 6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="modal-body" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: spacing[5] }}>
          <div
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerLeave={handlePointerUp}
            style={{
              width: CROP_SIZE,
              height: CROP_SIZE,
              borderRadius: '50%',
              overflow: 'hidden',
              position: 'relative',
              cursor: 'grab',
              background: theme['bg-muted'],
              border: `1px solid ${theme.divider}`,
              touchAction: 'none',
              flexShrink: 0,
            }}
          >
            <img
              ref={imgRef}
              src={imageSrc}
              alt=""
              draggable={false}
              style={{
                position: 'absolute',
                left: '50%',
                top: '50%',
                width: naturalSize ? naturalSize.w * scale : 'auto',
                height: naturalSize ? naturalSize.h * scale : 'auto',
                maxWidth: 'none',
                transform: `translate(-50%, -50%) translate(${offset.x}px, ${offset.y}px)`,
                userSelect: 'none',
                pointerEvents: 'none',
              }}
            />
          </div>

          <div style={{ width: '100%', display: 'flex', alignItems: 'center', gap: 12 }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={theme['text-muted']} strokeWidth="2" strokeLinecap="round">
              <circle cx="11" cy="11" r="7" />
              <path d="m21 21-4.35-4.35M8 11h6" />
            </svg>
            <input
              type="range"
              min={MIN_ZOOM}
              max={MAX_ZOOM}
              step={0.01}
              value={zoom}
              onChange={(e) => handleZoomChange(Number(e.target.value))}
              style={{ flex: 1, accentColor: theme.primary }}
              aria-label="Zoom"
            />
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={theme['text-muted']} strokeWidth="2" strokeLinecap="round">
              <circle cx="11" cy="11" r="7" />
              <path d="m21 21-4.35-4.35M11 8v6M8 11h6" />
            </svg>
          </div>
        </div>

        <div className="modal-footer">
          <button type="button" className="btn-pill-secondary" onClick={onCancel}>
            Cancel
          </button>
          <button type="button" className="btn-pill-primary" onClick={handleSave} disabled={!naturalSize}>
            Save photo
          </button>
        </div>
      </div>
    </div>
  );
}
