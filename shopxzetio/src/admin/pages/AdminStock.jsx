import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Check, Edit2 } from 'lucide-react';
import AdminSidebar from '../components/AdminSidebar';
import AdminNavbar from '../components/AdminNavbar';
import { updateStock } from '../../redux/productsSlice';
import { showToast } from '../../components/ToastNotification';

const AdminStock = () => {
  const dispatch = useDispatch();
  const products = useSelector(state => state.products.items);
  const [editingId, setEditingId] = useState(null);
  const [tempStock, setTempStock] = useState('');

  const handleEdit = (product) => {
    setEditingId(product.id);
    setTempStock(product.stock.toString());
  };

  const handleSave = (id) => {
    const val = parseInt(tempStock);
    if (!isNaN(val) && val >= 0) {
      dispatch(updateStock({ id, stock: val }));
      showToast('STOCK UPDATED!');
    }
    setEditingId(null);
  };

  return (
    <div className="min-h-screen bg-background flex">
      <AdminSidebar />
      <div className="flex-1 ml-64 flex flex-col">
        <AdminNavbar />
        <main className="flex-1 p-8 overflow-y-auto">
          
          <h2 className="text-[35px] font-heading font-black mb-8 uppercase text-white">Inventory Control</h2>

          <div className="bg-card border border-border rounded-xl overflow-hidden">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-background/50 border-b border-border text-muted-foreground text-xs uppercase tracking-wider">
                  <th className="py-4 px-6 font-bold w-16">Item</th>
                  <th className="py-4 px-6 font-bold">Designation</th>
                  <th className="py-4 px-6 font-bold">Category</th>
                  <th className="py-4 px-6 font-bold w-48">Current Stock</th>
                  <th className="py-4 px-6 font-bold text-right w-32">Override</th>
                </tr>
              </thead>
              <tbody>
                {products.map(product => (
                  <tr 
                    key={product.id} 
                    className={`border-b border-border/50 transition-colors ${
                      product.stock === 0 ? 'bg-red-500/5' : 
                      product.stock < 5 ? 'bg-yellow-500/5' : 'hover:bg-background/50'
                    }`}
                  >
                    <td className="py-3 px-6">
                      <div className="w-10 h-10 bg-muted rounded overflow-hidden">
                        <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                      </div>
                    </td>
                    <td className="py-3 px-6 font-bold">{product.name}</td>
                    <td className="py-3 px-6 text-muted-foreground uppercase text-sm">{product.category}</td>
                    <td className="py-3 px-6">
                      {editingId === product.id ? (
                        <div className="flex items-center gap-2">
                          <input 
                            type="number" 
                            min="0"
                            value={tempStock}
                            onChange={(e) => setTempStock(e.target.value)}
                            className="w-20 bg-background border border-primary rounded px-2 py-1 focus:outline-none font-bold"
                          />
                        </div>
                      ) : (
                        <div className="flex items-center gap-3">
                          <span className={`font-bold text-lg ${
                            product.stock === 0 ? 'text-destructive' : 
                            product.stock < 5 ? 'text-yellow-400' : 'text-foreground'
                          }`}>
                            {product.stock}
                          </span>
                          {product.stock === 0 && <span className="bg-destructive text-white text-[10px] px-2 py-0.5 rounded font-bold uppercase tracking-wider">Out of Stock</span>}
                          {product.stock > 0 && product.stock < 5 && <span className="bg-yellow-500 text-black text-[10px] px-2 py-0.5 rounded font-bold uppercase tracking-wider">Low Stock</span>}
                        </div>
                      )}
                    </td>
                    <td className="py-3 px-6 text-right">
                      {editingId === product.id ? (
                        <button 
                          onClick={() => handleSave(product.id)}
                          className="bg-primary text-primary-foreground p-1.5 rounded hover:glow-cyan transition-all"
                        >
                          <Check size={16} />
                        </button>
                      ) : (
                        <button 
                          onClick={() => handleEdit(product)}
                          className="border border-border p-1.5 rounded text-muted-foreground hover:text-primary hover:border-primary transition-colors"
                        >
                          <Edit2 size={16} />
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

        </main>
      </div>
    </div>
  );
};

export default AdminStock;
