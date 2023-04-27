import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <div className='logo'>
      <h1>Selectr</h1>
      <h1 className='dot'>.</h1>
    </div>
    
    <App />
  </React.StrictMode>,
)
