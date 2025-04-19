import React from 'react';
import { NavLink } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

const PaperSetterMenu = () => {
  const location = useLocation();
  
  return (
    <nav className="role-menu">
      <ul>
        <li>
          <NavLink 
            to="/paper-setter" 
            className={location.pathname === '/paper-setter' ? 'active' : ''}
          >
            Dashboard
          </NavLink>
        </li>
        <li>
          <NavLink 
            to="/paper-setter/profile"
            className={location.pathname === '/paper-setter/profile' ? 'active' : ''}
          >
            Profile
          </NavLink>
        </li>
        <li>
          <NavLink 
            to="/paper-setter/history"
            className={location.pathname === '/paper-setter/history' ? 'active' : ''}
          >
            History
          </NavLink>
        </li>
        <li>
          <NavLink 
            to="/paper-setter/updates"
            className={location.pathname === '/paper-setter/updates' ? 'active' : ''}
          >
            Updates
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default PaperSetterMenu;