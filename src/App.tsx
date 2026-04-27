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
import GoogleReviewPage from './components/MLA/GoogleReviewPage'
import PromotionsPage from './components/MLA/PromotionsPage'
import ABCLedgerPage from './components/MLA/ABCLedgerPage'
import ProcessPage from './components/Process/ProcessPage'
import PreProcessPage from './components/Process/PreProcessPage'
import DataReviewPage from './components/Process/DataReviewPage'
import DataProcessPage from './components/Process/DataProcessPage'
import UploadReportPage from './components/Process/UploadReportPage'
import ResourcesPage from './components/Resources/ResourcesPage'
import SoftwaresPage from './components/Softwares/SoftwaresPage'
import SectionWorkspacePage from './components/Sections/SectionWorkspacePage'
import { getThemeCssVars } from './styles/theme'
import './App.css'

const mentorItems = [
  { label: 'Web Enquiries', path: '/mentor/web-enquiries' },
  { label: 'Pre Process', path: '/mentor/pre-process' },
  { label: 'MIS ABC', path: '/mentor/mis-abc' },
  { label: 'NLA Data', path: '/mentor/nla-data' },
  { label: 'SLC Domain', path: '/mentor/slc-domain' },
  { label: 'MIS Scans', path: '/mentor/mis-scans' },
  { label: 'MIS DDS', path: '/mentor/mis-dds' },
  { label: 'MIS GBP Plus', path: '/mentor/mis-gbp-plus' },
]

const adminItems = [
  { label: 'Ledger', path: '/admin/ledger' },
  { label: 'Resources', path: '/admin/resources' },
  { label: 'Notifications', path: '/admin/notifications' },
  { label: 'Feedbacks', path: '/admin/feedbacks' },
  { label: 'Testimonials', path: '/admin/testimonials' },
  { label: 'MIS Ledger', path: '/admin/mis-ledger' },
  { label: 'Bank Account', path: '/admin/bank-account' },
  { label: 'Print Label', path: '/admin/print-label' },
  { label: 'ABC Ledger', path: '/admin/abc-ledger' },
]

const masterItems = [
  { label: 'Associate Master', path: '/master/associate-master' },
  { label: 'Patterns', path: '/master/patterns' },
  { label: 'Database', path: '/master/database' },
  { label: 'MIS Transactions', path: '/master/mis-transactions' },
  { label: 'Master Journal', path: '/master/master-journal' },
  { label: 'MIS Special Offer', path: '/master/mis-special-offer' },
  { label: 'MIS Network', path: '/master/mis-network' },
  { label: 'MIS ABC Transactions', path: '/master/mis-abc-transactions' },
  { label: 'MIS-MNA', path: '/master/mis-mna' },
]

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
        {/* <Route path="transactions" element={<TransactionsPage />} /> */}
        {/* <Route path="testimonials" element={<TestimonialsPage />} /> */}
        {/* <Route path="feedbacks" element={<FeedbackPage />} /> */}
        <Route path="google-review" element={<GoogleReviewPage />} />
        <Route path="promotions" element={<PromotionsPage />} />
        <Route path="abc-ledger" element={<ABCLedgerPage />} />
        <Route path=":section" element={<MLASection />} />
      </Route>
      <Route path="/process" element={<ProcessPage />}>
        <Route index element={null} />
        <Route path="pre-process" element={<PreProcessPage />} />
        <Route path="data-review" element={<DataReviewPage />} />
        <Route path="data-process" element={<DataProcessPage />} />
        <Route path="upload-report" element={<UploadReportPage />} />
      </Route>
      <Route path="/resources" element={<ResourcesPage />} />
      <Route path="/softwares" element={<SoftwaresPage />} />
      <Route path="/mentor" element={<Navigate to={mentorItems[0].path} replace />} />
      <Route path="/mentor/:section" element={<SectionWorkspacePage title="Mentor" items={mentorItems} />} />
      <Route path="/admin" element={<Navigate to={adminItems[0].path} replace />} />
      <Route path="/admin/:section" element={<SectionWorkspacePage title="Admin" items={adminItems} />} />
      <Route path="/master" element={<Navigate to={masterItems[0].path} replace />} />
      <Route path="/master/:section" element={<SectionWorkspacePage title="Master" items={masterItems} />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default App
