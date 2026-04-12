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
import SRAPage from './components/MLA/SRAPage'
import TransactionsPage from './components/MLA/TransactionsPage'
import TestimonialsPage from './components/MLA/TestimonialsPage'
import FeedbackPage from './components/MLA/FeedbackPage'
import GoogleReviewPage from './components/MLA/GoogleReviewPage'
import ABCLedgerPage from './components/MLA/ABCLedgerPage'
import ProcessPage from './components/Process/ProcessPage'
import ProcessPlaceholder from './components/Process/ProcessPlaceholder'
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
        <Route path="sra" element={<SRAPage />} />
        <Route path="transactions" element={<TransactionsPage />} />
        <Route path="testimonials" element={<TestimonialsPage />} />
        <Route path="feedbacks" element={<FeedbackPage />} />
        <Route path="google-review" element={<GoogleReviewPage />} />
        <Route path="abc-ledger" element={<ABCLedgerPage />} />
        <Route path=":section" element={<MLASection />} />
      </Route>
      <Route path="/process" element={<ProcessPage />}>
        <Route index element={<ProcessPlaceholder title="Process" />} />
        <Route path="data-review" element={<ProcessPlaceholder title="Data Review" />} />
        <Route path="data-process" element={<ProcessPlaceholder title="Data Process" />} />
        <Route path="upload-report" element={<ProcessPlaceholder title="Upload Report" />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default App
