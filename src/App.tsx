import { useEffect } from 'react'
import Login from './components/Login/Login'
import { getThemeCssVars } from './styles/theme'
import './App.css'

function App() {
  useEffect(() => {
    const vars = getThemeCssVars('light')
    Object.entries(vars).forEach(([key, value]) => {
      document.documentElement.style.setProperty(key, value)
    })
  }, [])

  return <Login />
}

export default App
