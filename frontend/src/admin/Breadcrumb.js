// src/admin/Breadcrumb.js
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Breadcrumb.css';

const Breadcrumb = () => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);

  return (
    <nav className="breadcrumb">
      <Link to="/admin/dashboard">Home</Link>
      {pathnames.slice(1).map((value, index) => {
        const to = `/admin/${pathnames.slice(1, index + 2).join('/')}`;
        const isLast = index === pathnames.slice(1).length - 1;
        const name = value.replace(/-/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase());

        return isLast ? (
          <span key={to}>{name}</span>
        ) : (
          <Link key={to} to={to}>
            {name}
          </Link>
        );
      })}
    </nav>
  );
};

export default Breadcrumb;
