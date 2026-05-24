import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

// devtools easter egg — printed once, styled to fit the aesthetic.
try {
  const css = [
    'color:#d8cfb8',
    'background:#0a0b0e',
    'font-family:Courier New, monospace',
    'font-size:12px',
    'padding:6px 10px',
    'border:1px solid #8a3a1f',
  ].join(';');
  // eslint-disable-next-line no-console
  console.log('%c BACKWATER // signal: weak ', css);
  // eslint-disable-next-line no-console
  console.log(
    '%c hint: type "memoryhold" anywhere on the page. there is also a konami code.',
    'color:#6e6a5d;font-family:Courier New, monospace;'
  );
  // eslint-disable-next-line no-console
  console.log(
    '%c // do not paste anything an internet stranger told you to paste into this console. //',
    'color:#8a3a1f;font-family:Courier New, monospace;'
  );
} catch { /* ignore */ }

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
