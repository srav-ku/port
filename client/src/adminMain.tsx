import React from 'react';
import ReactDOM from 'react-dom/client';
import AdminApp from './admin/AdminApp';
import './index.css';

// Import setup utilities for development
import './lib/setupAdmin';
import './lib/testFirestore';
import './lib/debugFirestore';
import './lib/enhancedFirestore';

ReactDOM.createRoot(document.getElementById('admin-root')!).render(
  <React.StrictMode>
    <AdminApp />
  </React.StrictMode>
);