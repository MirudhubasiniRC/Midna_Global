import { useEffect } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Login from './components/Login/Login'
import Home from './components/Home/Home'
import MLAPage from './components/MLA/MLAPage'
import MLASection from './components/MLA/MLASection'
import ScanPage from './components/MLA/ScanPage'
import ReportsPage from './components/MLA/ReportsPage'
import LedgerPage from './components/MLA/LedgerPage'
import ProfilePage from './components/MLA/ProfilePage'
import { getThemeCssVars } from './styles/theme'
import './App.css'

function App() {
  useEffect(() => {
    const vars = getThemeCssVars('light')
    Object.entries(vars).forEach(([key, value]) => {
      document.documentElement.style.setProperty(key, value)
    })
  }, [])

  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/home" element={<Home />} />
      <Route path="/mla" element={<MLAPage />}>
        <Route index element={<Navigate to="/mla/scan" replace />} />
        <Route path="scan" element={<ScanPage />} />
        <Route path="reports" element={<ReportsPage />} />
        <Route path="ledger" element={<LedgerPage />} />
        <Route path="profile" element={<ProfilePage />} />
        <Route path=":section" element={<MLASection />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default App
