import { useEffect } from 'react'
import './App.css'
import { colors, getThemeCssVars, radius, spacing, typography } from './styles/theme'

function App() {
  useEffect(() => {
    const vars = getThemeCssVars('light')
    Object.entries(vars).forEach(([key, value]) => {
      document.documentElement.style.setProperty(key, value)
    })
  }, [])

  const theme = colors.light

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'grid',
        placeItems: 'center',
        padding: spacing[6],
        background: theme['bg-base'],
        color: theme['text-primary'],
        fontFamily: typography.fonts.sans.family,
      }}
    >
      <div
        style={{
          maxWidth: 420,
          width: '100%',
          padding: spacing[6],
          borderRadius: radius.lg,
          background: theme['bg-surface'],
          border: `1px solid ${theme.border}`,
          boxShadow: 'var(--shadow-card)',
        }}
      >
        <p
          style={{
            margin: 0,
            marginBottom: spacing[2],
            fontSize: typography.sizes.sm.fontSize,
            fontWeight: 600,
            color: theme.primary,
          }}
        >
          Midna design system
        </p>
        <h1
          style={{
            margin: 0,
            marginBottom: spacing[3],
            fontSize: typography.sizes['2xl'].fontSize,
            fontFamily: typography.fonts.heading.family,
            letterSpacing: typography.fonts.heading.letterSpacing,
          }}
        >
          Donezo tokens ready
        </h1>
        <p
          style={{
            margin: 0,
            color: theme['text-secondary'],
            fontSize: typography.sizes.sm.fontSize,
            lineHeight: typography.sizes.sm.lineHeight,
          }}
        >
          Theme lives in <code>src/styles/theme.ts</code>. Build pages from those tokens —
          primary is <strong>#CA317A</strong>.
        </p>
      </div>
    </div>
  )
}

export default App
