import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { GlobalContextProvider } from './stores/GlobalContext.jsx'
createRoot(document.getElementById('root')).render(
  <GlobalContextProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </GlobalContextProvider>

)
