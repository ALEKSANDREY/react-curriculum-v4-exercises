import React from 'react';

function ProductDetails({ products = [], simulatedId, onNavigateHome }) {
  // Graceful alignment lookup regardless of standard query parameters
  const targetId = simulatedId || 'hat-001';
  const product = products.find((p) => p.id === targetId);

  if (!product) {
    return (
      <div style={{ padding: '20px' }}>
        <h3>Selected item profile match could not be found.</h3>
        <button onClick={onNavigateHome}>← Back to Catalog</button>
      </div>
    );
  }

  return (
    <div
      style={{
        padding: '20px',
        maxWidth: '400px',
        border: '1px solid #ddd',
        borderRadius: '8px',
        margin: '10px auto',
      }}
    >
      <h2>Product Details View</h2>
      <p style={{ color: '#666', fontSize: '0.85rem' }}>
        <strong>System Tracker ID:</strong> {targetId}
      </p>
      <hr />
      <h3>{product.name}</h3>
      <p style={{ color: 'green', fontWeight: 'bold' }}>
        Price: ${product.price}
      </p>
      <p>{product.description}</p>

      <button
        onClick={onNavigateHome}
        style={{ marginTop: '20px', cursor: 'pointer' }}
      >
        ← Return to Catalog
      </button>
    </div>
  );
}

export default ProductDetails;
