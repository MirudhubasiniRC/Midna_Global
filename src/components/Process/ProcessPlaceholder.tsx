import { colors, spacing, typography } from '../../styles/theme';

const theme = colors.light;

export default function ProcessPlaceholder({ title }: { title: string }) {
  return (
    <>
      <h1
        style={{
          fontSize: typography.sizes.xl.fontSize,
          fontWeight: typography.fonts.heading.fontWeight,
          fontFamily: typography.fonts.heading.family,
          marginBottom: spacing[4],
          color: theme['text-primary'],
        }}
      >
        {title}
      </h1>
      <p
        style={{
          color: theme['text-secondary'],
          fontSize: typography.sizes.sm.fontSize,
          fontFamily: typography.fonts.sans.family,
          lineHeight: 1.5,
        }}
      >
        Content for {title} will be added here.
      </p>
    </>
  );
}
