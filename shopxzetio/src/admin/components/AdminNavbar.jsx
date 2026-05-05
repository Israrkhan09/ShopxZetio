import React from 'react';
import { useLocation } from 'react-router-dom';
import { Shield } from 'lucide-react';

const AdminNavbar = () => {
  const location = useLocation();
  
  const getTitle = () => {
    switch(location.pathname) {
      case '/admin/dashboard': return 'COMMAND CENTER';
      case '/admin/products': return 'PRODUCT ARSENAL';
      case '/admin/orders': return 'ORDER LOGISTICS';
      case '/admin/stock': return 'INVENTORY CONTROL';
      default: return 'ADMIN PANEL';
    }
  };

  return (
    <header className="bg-sidebar border-b border-sidebar-border h-16 flex items-center justify-between px-8 sticky top-0 z-10 ml-64">
      <h2 className="font-heading font-bold text-xl uppercase tracking-wider">{getTitle()}</h2>
      
      <div className="flex items-center gap-3 bg-background border border-border px-4 py-1.5 rounded-full">
        <Shield size={16} className="text-primary" />
        <span className="text-sm font-bold uppercase text-primary">SYS ADMIN</span>
      </div>
    </header>
  );
};

export default AdminNavbar;
