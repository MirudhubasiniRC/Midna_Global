type ProfileAvatarButtonProps = {
  onClick?: () => void;
};

/** Top-right avatar — Orbix reference keeps quick profile access next to the bell, not just in the sidebar */
export function ProfileAvatarButton({ onClick }: ProfileAvatarButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label="My Profile"
      style={{
        width: 42,
        height: 42,
        borderRadius: '50%',
        border: 'none',
        padding: 0,
        flexShrink: 0,
        cursor: 'pointer',
        background: 'linear-gradient(135deg, #7C93FF, #4F6AF0)',
        color: '#fff',
        display: 'grid',
        placeItems: 'center',
        fontWeight: 700,
        fontSize: 15,
        boxShadow: '0 0 0 2px #ffffff, 0 4px 10px rgba(22, 26, 46, 0.14)',
      }}
    >
      U
    </button>
  );
}
