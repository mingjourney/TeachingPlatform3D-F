import React from 'react'
import ReactDOM from 'react-dom/client'
import 'virtual:svg-icons-register'
import App from './App.tsx'
import '@/assets/styles/global.scss'
import { BrowserRouter } from 'react-router-dom'
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
)
