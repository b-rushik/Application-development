import React from 'react';
import { NavLink } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

const AdminMenu = () => {
  const location = useLocation();
  
  return (
    <nav className="role-menu">
      <ul>
        <li>
          <NavLink 
            to="/admin" 
            className={location.pathname === '/admin' ? 'active' : ''}
          >
            Dashboard
          </NavLink>
        </li>
        <li>
          <NavLink 
            to="/admin/user-management"
            className={location.pathname === '/admin/user-management' ? 'active' : ''}
          >
            User Management
          </NavLink>
        </li>
        <li>
          <NavLink 
            to="/admin/paper-review"
            className={location.pathname === '/admin/paper-review' ? 'active' : ''}
          >
            Paper Review
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default AdminMenu;