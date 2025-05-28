import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';                
import { BrowserRouter as Router } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'; // ✅ Import here
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; // Optional
import 'bootstrap-icons/font/bootstrap-icons.css';
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Router basename='/biblioteca-front'>
      <App />
    </Router>
  </StrictMode>,
)
