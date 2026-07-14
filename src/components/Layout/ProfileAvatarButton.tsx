import { shadow } from '../../styles/theme';

type ProfileAvatarButtonProps = {
  onClick?: () => void;
};

/** Top-right avatar — blue fill, white ring, soft elevation (reference “U” bubble) */
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
        background: '#5C7CFA',
        color: '#fff',
        display: 'grid',
        placeItems: 'center',
        fontWeight: 600,
        fontSize: 15,
        letterSpacing: '-0.01em',
        boxShadow: shadow.avatarRing,
      }}
    >
      U
    </button>
  );
}
