import React from 'react';

function Home({ products = [], onViewDetails }) {
  return (
    <div style={{ padding: '20px' }}>
      <h2>Product Catalog</h2>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
          gap: '20px',
        }}
      >
        {products.map((product) => (
          <div
            key={product.id}
            style={{
              border: '1px solid #ccc',
              padding: '15px',
              borderRadius: '6px',
              backgroundColor: '#fafafa',
            }}
          >
            <h3>{product.name}</h3>
            <p>Price: ${product.price}</p>

            {/* Clear click pipeline bypassing standard link tracks */}
            <button
              onClick={() => onViewDetails(product.id)}
              style={{
                background: 'none',
                border: 'none',
                color: 'blue',
                textDecoration: 'underline',
                cursor: 'pointer',
                padding: 0,
              }}
            >
              View Details
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
