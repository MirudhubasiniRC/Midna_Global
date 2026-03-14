import { colors, spacing, typography } from '../../styles/theme';

const theme = colors.light;

export default function MLAIndex() {
  return (
    <>
      <h1
        style={{
          fontSize: typography.sizes.xl.fontSize,
          fontWeight: typography.fonts.heading.fontWeight,
          fontFamily: typography.fonts.heading.family,
          marginBottom: spacing[4],
        }}
      >
        MLA
      </h1>
      <p style={{ color: theme['text-secondary'] }}>
        Select an option from the sidebar to get started.
      </p>
    </>
  );
}
