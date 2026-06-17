import { NavLink } from 'react-router';

function Header({ isLoggedIn }) {
  // Custom active styling function
  const activeStyle = ({ isActive }) => ({
    fontWeight: isActive ? 'bold' : 'normal',
    color: isActive ? 'blue' : 'black',
    textDecoration: isActive ? 'underline' : 'none',
  });

  return (
    <header>
      <nav style={{ display: 'flex', gap: '15px' }}>
        <NavLink to="/" style={activeStyle}>
          Home
        </NavLink>
        <NavLink to="/checkout" style={activeStyle}>
          Checkout
        </NavLink>

        {/* EXERCISE 2 REQUIREMENT: Only show link when logged on */}
        {isLoggedIn && (
          <NavLink to="/account" style={activeStyle}>
            Account
          </NavLink>
        )}
      </nav>
    </header>
  );
}

export default Header;
