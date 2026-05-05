import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Search, Eye, X } from 'lucide-react';
import AdminSidebar from '../components/AdminSidebar';
import AdminNavbar from '../components/AdminNavbar';
import { updateOrderStatus } from '../../redux/ordersSlice';

const AdminOrders = () => {
  const dispatch = useDispatch();
  const orders = useSelector(state => state.orders.items);
  const [filter, setFilter] = useState('All');
  const [search, setSearch] = useState('');
  const [viewOrder, setViewOrder] = useState(null);

  const tabs = ['All', 'Pending', 'Confirmed', 'Shipped', 'Delivered', 'Cancelled'];

  const filteredOrders = orders.filter(o => {
    const matchesFilter = filter === 'All' || o.status === filter;
    const matchesSearch = o.customerName.toLowerCase().includes(search.toLowerCase()) || 
                          o.phone.includes(search) || 
                          o.id.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const handleStatusUpdate = (id, newStatus) => {
    dispatch(updateOrderStatus({ id, status: newStatus }));
    if(viewOrder) setViewOrder({...viewOrder, status: newStatus});
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'Delivered': return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'Cancelled': return 'bg-red-500/20 text-red-400 border-red-500/30';
      case 'Pending': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      default: return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
    }
  };

  return (
    <div className="min-h-screen bg-background flex">
      <AdminSidebar />
      <div className="flex-1 ml-64 flex flex-col">
        <AdminNavbar />
        <main className="flex-1 p-8 overflow-y-auto">
          
          <div className="flex flex-col mb-8 gap-4">
            <div className="flex gap-2 overflow-x-auto pb-2">
              {tabs.map(tab => (
                <button
                  key={tab}
                  onClick={() => setFilter(tab)}
                  className={`px-4 py-2 rounded font-bold uppercase text-sm whitespace-nowrap transition-colors ${
                    filter === tab ? 'bg-primary text-primary-foreground glow-cyan' : 'bg-card border border-border text-muted-foreground hover:border-primary'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            <div className="relative w-full max-w-md">
              <input
                type="text"
                placeholder="SEARCH RECRUIT OR ID..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-card border border-border rounded px-4 py-2 pl-10 focus:outline-none focus:border-primary font-sans uppercase text-sm"
              />
              <Search size={18} className="absolute left-3 top-2.5 text-muted-foreground" />
            </div>
          </div>

          <div className="bg-card border border-border rounded-xl overflow-hidden">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-background/50 border-b border-border text-muted-foreground text-xs uppercase tracking-wider">
                  <th className="py-4 px-6 font-bold">Order ID</th>
                  <th className="py-4 px-6 font-bold">Recruit Info</th>
                  <th className="py-4 px-6 font-bold">Location</th>
                  <th className="py-4 px-6 font-bold">Payment</th>
                  <th className="py-4 px-6 font-bold">Total</th>
                  <th className="py-4 px-6 font-bold">Status</th>
                  <th className="py-4 px-6 font-bold text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredOrders.map(order => (
                  <tr key={order.id} className="border-b border-border/50 hover:bg-background/50 transition-colors">
                    <td className="py-4 px-6 font-mono text-sm">{order.id}</td>
                    <td className="py-4 px-6">
                      <div className="font-bold">{order.customerName}</div>
                      <div className="text-xs text-muted-foreground">{order.phone}</div>
                    </td>
                    <td className="py-4 px-6 uppercase text-sm">{order.city}</td>
                    <td className="py-4 px-6 text-sm font-bold uppercase">{order.paymentMethod}</td>
                    <td className="py-4 px-6 text-primary font-bold">Rs. {order.totalAmount.toLocaleString()}</td>
                    <td className="py-4 px-6">
                      <span className={`px-3 py-1 rounded text-xs font-bold uppercase border ${getStatusColor(order.status)}`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-right">
                      <button 
                        onClick={() => setViewOrder(order)}
                        className="border border-border p-2 rounded text-muted-foreground hover:text-primary hover:border-primary transition-colors inline-flex items-center gap-1 text-xs font-bold uppercase"
                      >
                        <Eye size={14} /> VIEW
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

        </main>
      </div>

      {/* Detail Modal */}
      {viewOrder && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-card border border-border rounded-xl w-full max-w-3xl max-h-[90vh] overflow-y-auto shadow-[0_0_50px_rgba(0,255,255,0.05)]">
            <div className="p-6 border-b border-border flex justify-between items-center sticky top-0 bg-card z-10">
              <h2 className="text-[35px] font-heading font-bold uppercase text-white flex items-center gap-3">
                MISSION BRIEF: <span className="font-mono text-primary text-lg">{viewOrder.id}</span>
              </h2>
              <button onClick={() => setViewOrder(null)} className="text-muted-foreground hover:text-primary"><X size={24} /></button>
            </div>
            
            <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div>
                  <h3 className="font-bold uppercase text-muted-foreground text-sm border-b border-border pb-2 mb-3">Recruit Intel</h3>
                  <div className="space-y-2 text-sm">
                    <p><span className="text-muted-foreground font-bold uppercase mr-2">Name:</span> {viewOrder.customerName}</p>
                    <p><span className="text-muted-foreground font-bold uppercase mr-2">Comm:</span> {viewOrder.phone}</p>
                    <p><span className="text-muted-foreground font-bold uppercase mr-2">Base:</span> {viewOrder.address}, {viewOrder.city}</p>
                  </div>
                </div>

                <div>
                  <h3 className="font-bold uppercase text-muted-foreground text-sm border-b border-border pb-2 mb-3">Mission Status</h3>
                  <div className="flex items-center gap-4">
                    <select 
                      value={viewOrder.status}
                      onChange={(e) => handleStatusUpdate(viewOrder.id, e.target.value)}
                      className={`bg-background border rounded px-4 py-2 font-bold uppercase outline-none focus:border-primary ${getStatusColor(viewOrder.status)}`}
                    >
                      <option value="Pending">Pending</option>
                      <option value="Confirmed">Confirmed</option>
                      <option value="Shipped">Shipped</option>
                      <option value="Delivered">Delivered</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-bold uppercase text-muted-foreground text-sm border-b border-border pb-2 mb-3">Loadout</h3>
                <div className="space-y-4 mb-4">
                  {viewOrder.items.map((item, idx) => (
                    <div key={idx} className="flex justify-between items-center text-sm border border-border p-3 rounded bg-background">
                      <div>
                        <div className="font-bold">{item.name}</div>
                        <div className="text-muted-foreground uppercase text-xs">QTY: {item.qty} x Rs. {item.price}</div>
                      </div>
                      <div className="font-bold text-primary">Rs. {(item.price * item.qty).toLocaleString()}</div>
                    </div>
                  ))}
                </div>
                <div className="border-t border-border pt-4 flex justify-between items-center text-xl font-bold">
                  <span className="uppercase">Total Deployed</span>
                  <span className="text-primary">Rs. {viewOrder.totalAmount.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminOrders;
