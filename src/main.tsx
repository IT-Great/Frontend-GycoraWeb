// import { StrictMode } from 'react'
// import { createRoot } from 'react-dom/client'
// import './index.css'
// import App from './App.tsx'

// createRoot(document.getElementById('root')!).render(
//   <StrictMode>
//     <App />
//   </StrictMode>,
// )

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
// [BARU] Import HelmetProvider dari react-helmet-async
import { HelmetProvider } from 'react-helmet-async'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {/* [BARU] Bungkus komponen App dengan HelmetProvider */}
    <HelmetProvider>
      <App />
    </HelmetProvider>
  </StrictMode>,
)