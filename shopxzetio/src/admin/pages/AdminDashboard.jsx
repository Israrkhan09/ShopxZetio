import React from 'react';
import { useSelector } from 'react-redux';
import AdminSidebar from '../components/AdminSidebar';
import AdminNavbar from '../components/AdminNavbar';
import StatCard from '../components/StatCard';
import { Package, ShoppingCart, Clock, DollarSign, CheckCircle } from 'lucide-react';

const AdminDashboard = () => {
  const products = useSelector(state => state.products.items);
  const orders = useSelector(state => state.orders.items);

  const totalProducts = products.length;
  const totalOrders = orders.length;
  const pendingOrders = orders.filter(o => o.status === 'Pending').length;
  const deliveredOrders = orders.filter(o => o.status === 'Delivered').length;
  const totalRevenue = orders.filter(o => o.status !== 'Cancelled').reduce((sum, o) => sum + o.totalAmount, 0);

  // Calculate status distribution for the simple bar chart
  const statusCounts = {
    Pending: orders.filter(o => o.status === 'Pending').length,
    Confirmed: orders.filter(o => o.status === 'Confirmed').length,
    Shipped: orders.filter(o => o.status === 'Shipped').length,
    Delivered: orders.filter(o => o.status === 'Delivered').length,
    Cancelled: orders.filter(o => o.status === 'Cancelled').length,
  };

  const statusColors = {
    Pending: 'bg-yellow-500',
    Confirmed: 'bg-blue-500',
    Shipped: 'bg-purple-500',
    Delivered: 'bg-green-500',
    Cancelled: 'bg-red-500',
  };

  return (
    <div className="min-h-screen bg-background flex">
      <AdminSidebar />
      <div className="flex-1 ml-64 flex flex-col">
        <AdminNavbar />
        <main className="flex-1 p-8 overflow-y-auto">
          
          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
            <StatCard title="TOTAL GEAR" value={totalProducts} icon={Package} delay={0.1} />
            <StatCard title="TOTAL ORDERS" value={totalOrders} icon={ShoppingCart} delay={0.2} color="text-blue-400" />
            <StatCard title="PENDING DEPLOYMENTS" value={pendingOrders} icon={Clock} delay={0.3} color="text-yellow-400" />
            <StatCard title="REVENUE" value={`Rs. ${(totalRevenue/1000).toFixed(1)}K`} icon={DollarSign} delay={0.4} color="text-green-400" />
            <StatCard title="DELIVERED" value={deliveredOrders} icon={CheckCircle} delay={0.5} color="text-purple-400" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Status Chart */}
            <div className="bg-card border border-border rounded-xl p-6 col-span-1 lg:col-span-1">
              <h3 className="font-heading font-bold text-lg mb-6 uppercase border-b border-border pb-4">Logistics Status</h3>
              <div className="space-y-6">
                {Object.entries(statusCounts).map(([status, count]) => {
                  const percentage = totalOrders === 0 ? 0 : (count / totalOrders) * 100;
                  return (
                    <div key={status}>
                      <div className="flex justify-between items-center mb-2 text-sm font-bold">
                        <span className="uppercase">{status}</span>
                        <span>{count}</span>
                      </div>
                      <div className="w-full bg-background rounded-full h-3 border border-border overflow-hidden">
                        <div 
                          className={`h-full rounded-full ${statusColors[status]}`} 
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Recent Orders */}
            <div className="bg-card border border-border rounded-xl p-6 col-span-1 lg:col-span-2 overflow-hidden">
              <h3 className="font-heading font-bold text-lg mb-6 uppercase border-b border-border pb-4">Recent Comm Logs</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-border text-muted-foreground text-xs uppercase tracking-wider">
                      <th className="pb-3 font-bold">Order ID</th>
                      <th className="pb-3 font-bold">Recruit</th>
                      <th className="pb-3 font-bold">Total</th>
                      <th className="pb-3 font-bold">Status</th>
                      <th className="pb-3 font-bold">Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.slice(0, 5).map((order) => (
                      <tr key={order.id} className="border-b border-border/50 hover:bg-background/50 transition-colors">
                        <td className="py-4 font-mono text-sm">{order.id}</td>
                        <td className="py-4 font-bold">{order.customerName}</td>
                        <td className="py-4 text-primary">Rs. {order.totalAmount.toLocaleString()}</td>
                        <td className="py-4">
                          <span className={`text-xs px-2 py-1 rounded font-bold uppercase ${
                            order.status === 'Delivered' ? 'bg-green-500/20 text-green-400' :
                            order.status === 'Cancelled' ? 'bg-red-500/20 text-red-400' :
                            order.status === 'Pending' ? 'bg-yellow-500/20 text-yellow-400' :
                            'bg-blue-500/20 text-blue-400'
                          }`}>
                            {order.status}
                          </span>
                        </td>
                        <td className="py-4 text-muted-foreground text-sm">
                          {new Date(order.createdAt).toLocaleDateString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
