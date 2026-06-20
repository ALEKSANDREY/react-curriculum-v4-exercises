import { useState } from 'react';
import Home from './pages/Home';
import Checkout from './pages/Checkout';
import ProductDetails from './pages/ProductDetails';
import Account from './pages/Account';

import { products as productsData } from './data/products.js';

function StudentWork() {
  const [products] = useState(productsData);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Clean component tracking view switch parameters
  const [currentView, setCurrentView] = useState('home');
  const [selectedProductId, setSelectedProductId] = useState(null);

  return (
    <div>
      {/* Exercise Control Board Simulation Layout Links */}
      <div
        style={{
          padding: '12px',
          background: '#e0e0e0',
          textAlign: 'center',
          marginBottom: '20px',
          borderRadius: '4px',
        }}
      >
        <button
          onClick={() => setIsLoggedIn(!isLoggedIn)}
          style={{ marginRight: '10px' }}
        >
          {isLoggedIn ? '🔒 Log Out' : '🔓 Log In'}
        </button>
        <button
          onClick={() => setCurrentView('home')}
          style={{ marginRight: '10px' }}
        >
          🏠 Home Component
        </button>
        <button
          onClick={() => setCurrentView('checkout')}
          style={{ marginRight: '10px' }}
        >
          🛒 Checkout
        </button>
        {isLoggedIn && (
          <button onClick={() => setCurrentView('account')}>
            👤 Account Profile
          </button>
        )}

        <span style={{ marginLeft: '15px' }}>
          Status: <strong>{isLoggedIn ? 'Online' : 'Offline'}</strong>
        </span>
      </div>

      <main>
        {/* Render View Matrices Dynamically to Bypass the Broken 404 Shell Guard */}
        {currentView === 'home' && (
          <Home
            products={products}
            onViewDetails={(id) => {
              setSelectedProductId(id);
              setCurrentView('details');
            }}
          />
        )}

        {currentView === 'details' && (
          <ProductDetails
            products={products}
            simulatedId={selectedProductId}
            onNavigateHome={() => setCurrentView('home')}
          />
        )}

        {currentView === 'checkout' && (
          <Checkout onNavigateHome={() => setCurrentView('home')} />
        )}

        {currentView === 'account' && isLoggedIn && <Account />}
      </main>
    </div>
  );
}

export default StudentWork;
