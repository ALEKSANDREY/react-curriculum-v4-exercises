import { useNavigate } from 'react-router';

function Checkout() {
  const navigate = useNavigate();

  return (
    <div>
      <h2>Checkout Screen</h2>
      <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
        {/* EXERCISE 4A REQUIREMENT: Programmatic routing */}
        <button onClick={() => navigate('/')}>Go Home</button>
        <button onClick={() => navigate(-1)}>Back</button>
      </div>
    </div>
  );
}

export default Checkout;
