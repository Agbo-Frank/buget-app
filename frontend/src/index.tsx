import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { StoreProvider } from './hooks/use-store';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <StoreProvider>
        <ToastContainer
          position="top-right"
          hideProgressBar
          autoClose={3000}
        />
        <App />
      </StoreProvider>
    </BrowserRouter>
  </React.StrictMode>
)
