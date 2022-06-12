import React, { useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { store, Context } from './store';

const root = ReactDOM.createRoot(document.getElementById('root'));
function Layout() {
  useEffect(() => {
      store.checkAuth();
  }, [])

  return (
    <Context.Provider value={store}>
      <App />
    </Context.Provider>
  );
}
root.render(
  <React.StrictMode>
    <Layout />
  </React.StrictMode>
);
