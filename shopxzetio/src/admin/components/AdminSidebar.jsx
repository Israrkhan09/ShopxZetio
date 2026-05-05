import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { 
  LayoutDashboard, 
  Package, 
  ShoppingCart, 
  Database, 
  LogOut 
} from 'lucide-react';
import { logout } from '../../redux/adminSlice';

const AdminSidebar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/admin/login');
  };

  const navItems = [
    { name: 'Dashboard', path: '/admin/dashboard', icon: LayoutDashboard },
    { name: 'Products', path: '/admin/products', icon: Package },
    { name: 'Orders', path: '/admin/orders', icon: ShoppingCart },
    { name: 'Stock', path: '/admin/stock', icon: Database },
  ];

  return (
    <aside className="w-64 bg-sidebar border-r border-sidebar-border flex flex-col h-screen fixed left-0 top-0 z-20">
      <div className="p-6 border-b border-sidebar-border">
        <h1 className="text-[22px] font-heading font-black text-primary tracking-wider">
          XZETIO ADMIN
        </h1>
      </div>

      <nav className="flex-1 overflow-y-auto py-6 px-4 space-y-2">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) => `
              flex items-center gap-3 px-4 py-3 rounded-lg font-bold uppercase text-sm transition-colors
              ${isActive 
                ? 'bg-primary/10 text-primary border border-primary/20 shadow-[inset_4px_0_0_0_rgba(0,255,255,1)]' 
                : 'text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground'
              }
            `}
          >
            <item.icon size={18} />
            {item.name}
          </NavLink>
        ))}
      </nav>

      <div className="p-4 border-t border-sidebar-border">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 w-full px-4 py-3 rounded-lg font-bold uppercase text-sm text-destructive hover:bg-destructive/10 transition-colors"
        >
          <LogOut size={18} />
          LOGOUT
        </button>
      </div>
    </aside>
  );
};

export default AdminSidebar;
