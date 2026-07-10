import { useEffect, useState } from 'react';

type EditProfileModalProps = {
  open: boolean;
  onClose: () => void;
};

type FormState = {
  name: string;
  mobileAccounts: string;
  mobileCounselling: string;
  city: string;
  state: string;
  pincode: string;
  address: string;
  uid: string;
  mailId: string;
  nurturingServices: string;
};

const initialForm: FormState = {
  name: 'MiDNA (H.O)',
  mobileAccounts: '9364233342',
  mobileCounselling: '9791770205',
  city: 'Coimbatore',
  state: 'Tamil Nadu',
  pincode: '641024',
  address: '123 Sample Street, Coimbatore',
  uid: 'C3C3x | C3xA1 | A1A1 | C3C3 | A1A1',
  mailId: 'midna.global@gmail.com',
  nurturingServices: 'MiDNA Global, 123 Sample Street, Coimbatore – 641024, Tamil Nadu, India',
};

const stateOptions = [
  'Tamil Nadu',
  'Kerala',
  'Karnataka',
  'Andhra Pradesh',
  'Telangana',
  'Maharashtra',
  'Delhi',
];

type FieldKey = keyof Omit<FormState, 'nurturingServices'>;

const textFields: { key: FieldKey; label: string; type?: string }[] = [
  { key: 'name', label: 'Name' },
  { key: 'mobileAccounts', label: 'Mobile (for accounts)', type: 'tel' },
  { key: 'mobileCounselling', label: 'Mobile (for counselling)', type: 'tel' },
  { key: 'city', label: 'City' },
  { key: 'pincode', label: 'Pincode' },
  { key: 'address', label: 'Address' },
  { key: 'uid', label: 'UID' },
  { key: 'mailId', label: 'Mail ID', type: 'email' },
];

export function EditProfileModal({ open, onClose }: EditProfileModalProps) {
  const [form, setForm] = useState<FormState>(initialForm);

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

  const update = (key: keyof FormState) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setForm((f) => ({ ...f, [key]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onClose();
  };

  return (
    <div
      className="modal-overlay"
      role="presentation"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="modal-panel" role="dialog" aria-modal="true" aria-label="Edit your profile">
        <div className="modal-header">
          <div>
            <h2 className="modal-title">Edit your profile</h2>
            <p className="modal-subtitle">Update your contact details, photo, and certificate.</p>
          </div>
          <button type="button" className="btn-icon" aria-label="Close" onClick={onClose}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 6 6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="modal-body">
            <div className="form-grid">
              {textFields.map((field) => (
                <label key={field.key} className="form-field">
                  <span className="form-label">{field.label}</span>
                  <input
                    type={field.type ?? 'text'}
                    className="form-input"
                    value={form[field.key]}
                    onChange={update(field.key)}
                  />
                </label>
              ))}

              <label className="form-field">
                <span className="form-label">State</span>
                <div className="form-select-wrap">
                  <select className="form-input form-select" value={form.state} onChange={update('state')}>
                    {stateOptions.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                  <svg
                    className="form-select-chevron"
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="m6 9 6 6 6-6" />
                  </svg>
                </div>
              </label>
            </div>

            <label className="form-field" style={{ marginTop: 18 }}>
              <span className="form-label">My nurturing services</span>
              <textarea
                className="form-input form-textarea"
                rows={3}
                value={form.nurturingServices}
                onChange={update('nurturingServices')}
              />
            </label>
          </div>

          <div className="modal-footer">
            <button type="button" className="btn-pill-secondary" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn-pill-primary">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
