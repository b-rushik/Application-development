import React from 'react';
import { NavLink } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

const SuperUserMenu = () => {
  const location = useLocation();
  
  return (
    <nav className="role-menu">
      <ul>
        <li>
          <NavLink 
            to="/super-user" 
            className={location.pathname === '/super-user' ? 'active' : ''}
          >
            Dashboard
          </NavLink>
        </li>
        <li>
          <NavLink 
            to="/super-user/data-access"
            className={location.pathname === '/super-user/data-access' ? 'active' : ''}
          >
            Data Access
          </NavLink>
        </li>
        <li>
          <NavLink 
            to="/super-user/system-config"
            className={location.pathname === '/super-user/system-config' ? 'active' : ''}
          >
            System Config
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default SuperUserMenu;