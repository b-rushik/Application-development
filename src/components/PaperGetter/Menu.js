import React from 'react';
import { NavLink } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

const PaperGetterMenu = () => {
  const location = useLocation();
  
  return (
    <nav className="role-menu">
      <ul>
        <li>
          <NavLink 
            to="/paper-getter" 
            className={location.pathname === '/paper-getter' ? 'active' : ''}
          >
            Dashboard
          </NavLink>
        </li>
        <li>
          <NavLink 
            to="/paper-getter/request-paper"
            className={location.pathname === '/paper-getter/request-paper' ? 'active' : ''}
          >
            Request Paper
          </NavLink>
        </li>
        <li>
          <NavLink 
            to="/paper-getter/history"
            className={location.pathname === '/paper-getter/history' ? 'active' : ''}
          >
            Request History
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default PaperGetterMenu;