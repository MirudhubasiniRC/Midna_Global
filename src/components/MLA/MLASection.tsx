import { useParams } from 'react-router-dom';
import { colors, spacing, typography } from '../../styles/theme';

const theme = colors.light;

const sectionTitles: Record<string, string> = {
  scan: 'My Scan',
  reports: 'My Reports',
  ledger: 'My Ledger',
  profile: 'My Profile',
  sra: 'My SRA',
  transactions: 'My Transactions',
  testimonials: 'My Testimonials',
  feedbacks: 'My Feedbacks',
  'google-review': 'My Google Review',
  'abc-ledger': 'My ABC Ledger',
};

export default function MLASection() {
  const { section } = useParams<{ section: string }>();
  const title = section ? sectionTitles[section] ?? section : 'MLA';

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
        {title}
      </h1>
      <p style={{ color: theme['text-secondary'] }}>
        Content for {title} will be added here.
      </p>
    </>
  );
}
