import React from 'react';
import { Link } from 'react-router-dom';
import { Auth } from 'aws-amplify';
import { getCurrentUser } from '../../utils/auth';

const Header = () => {
  const [user, setUser] = React.useState(null);

  React.useEffect(() => {
    const fetchUser = async () => {
      try {
        const currentUser = await getCurrentUser();
        setUser(currentUser);
      } catch (error) {
        setUser(null);
      }
    };
    fetchUser();
  }, []);

  const handleSignOut = async () => {
    try {
      await Auth.signOut();
      window.location.reload();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <header className="app-header">
      <div className="header-container">
        <div className="logo-container">
          <Link to="/" className="logo-link">
            <img src="/assets/logo.png" alt="Question Paper System" className="logo" />
          </Link>
        </div>
        
        <nav className="main-nav">
          <ul>
            <li><Link to="/">Home</Link></li>
            {user && (
              <>
                <li>
                  <Link to={
                    user.attributes['custom:role'] === 'PAPER_SETTER' ? '/paper-setter' :
                    user.attributes['custom:role'] === 'PAPER_GETTER' ? '/paper-getter' :
                    user.attributes['custom:role'] === 'ADMIN' ? '/admin' :
                    user.attributes['custom:role'] === 'SUPER_USER' ? '/super-user' : '/'
                  }>
                    Dashboard
                  </Link>
                </li>
                <li>
                  <button onClick={handleSignOut} className="btn btn-link">
                    Sign Out
                  </button>
                </li>
              </>
            )}
            {!user && (
              <li><Link to="/login">Login</Link></li>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;