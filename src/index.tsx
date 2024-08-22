import React from 'react';
import App from './App';
import { createRoot } from 'react-dom/client'; 
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';

import { ToastContainer } from 'react-toastify';

const container:any = document.getElementById('root');

const root = createRoot(container); 

root.render(
  <React.StrictMode>
    <App />
    <ToastContainer />
  </React.StrictMode>
);
