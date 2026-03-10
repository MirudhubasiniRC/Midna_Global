import { useEffect } from 'react'
import PentLogin from './components/Login/PentLogin'
import { getThemeCssVars } from './styles/theme'
import './App.css'

function App() {
  useEffect(() => {
    const vars = getThemeCssVars('light')
    Object.entries(vars).forEach(([key, value]) => {
      document.documentElement.style.setProperty(key, value)
    })
  }, [])

  return <PentLogin />
}

export default App
