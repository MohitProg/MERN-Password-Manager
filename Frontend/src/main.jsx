import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { PasswordProvider } from './Context/PasswordContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <PasswordProvider>

    <App />
    </PasswordProvider>
  </StrictMode>,
)
