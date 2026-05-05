import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Search, Plus, Edit2, Trash2, X } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import AdminSidebar from '../components/AdminSidebar';
import AdminNavbar from '../components/AdminNavbar';
import { addProduct, editProduct, deleteProduct } from '../../redux/productsSlice';

const productSchema = z.object({
  name: z.string().min(3),
  description: z.string().min(10),
  price: z.coerce.number().min(1),
  category: z.string().min(2),
  stock: z.coerce.number().min(0),
  image: z.string().url(),
  rating: z.coerce.number().min(1).max(5),
  badge: z.string().nullable().optional(),
  isTrending: z.boolean(),
  isNew: z.boolean(),
  isSale: z.boolean(),
});

const AdminProducts = () => {
  const dispatch = useDispatch();
  const products = useSelector(state => state.products.items);
  const [search, setSearch] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm({
    resolver: zodResolver(productSchema)
  });

  const filteredProducts = products.filter(p => p.name.toLowerCase().includes(search.toLowerCase()));

  const openModal = (product = null) => {
    if (product) {
      setEditingId(product.id);
      Object.keys(product).forEach(key => {
        if(key !== 'id' && key !== 'reviews') setValue(key, product[key]);
      });
      if(!product.badge) setValue('badge', '');
    } else {
      setEditingId(null);
      reset({
        name: '', description: '', price: 0, category: 'Headphones', stock: 0, image: '', rating: 5, badge: '', isTrending: false, isNew: false, isSale: false
      });
    }
    setIsModalOpen(true);
  };

  const onSubmit = (data) => {
    const payload = {
      ...data,
      badge: data.badge === '' ? null : data.badge,
      id: editingId || `p${Date.now()}`,
      reviews: editingId ? products.find(p=>p.id === editingId).reviews : 0
    };

    if (editingId) {
      dispatch(editProduct(payload));
    } else {
      dispatch(addProduct(payload));
    }
    setIsModalOpen(false);
  };

  const handleDelete = (id) => {
    if(window.confirm('DELETE THIS GEAR FROM ARMORY?')) {
      dispatch(deleteProduct(id));
    }
  };

  return (
    <div className="min-h-screen bg-background flex">
      <AdminSidebar />
      <div className="flex-1 ml-64 flex flex-col">
        <AdminNavbar />
        <main className="flex-1 p-8 overflow-y-auto">
          
          <div className="flex justify-between items-center mb-8">
            <div className="relative w-72">
              <input
                type="text"
                placeholder="SEARCH INVENTORY..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-card border border-border rounded px-4 py-2 pl-10 focus:outline-none focus:border-primary font-sans uppercase text-sm"
              />
              <Search size={18} className="absolute left-3 top-2.5 text-muted-foreground" />
            </div>
            
            <button 
              onClick={() => openModal()}
              className="bg-primary text-primary-foreground px-6 py-2 rounded font-bold uppercase flex items-center gap-2 hover:glow-cyan transition-all"
            >
              <Plus size={18} /> ADD NEW GEAR
            </button>
          </div>

          <div className="bg-card border border-border rounded-xl overflow-hidden">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-background/50 border-b border-border text-muted-foreground text-xs uppercase tracking-wider">
                  <th className="py-4 px-6 font-bold">Image</th>
                  <th className="py-4 px-6 font-bold">Name</th>
                  <th className="py-4 px-6 font-bold">Category</th>
                  <th className="py-4 px-6 font-bold">Price</th>
                  <th className="py-4 px-6 font-bold">Stock</th>
                  <th className="py-4 px-6 font-bold">Tags</th>
                  <th className="py-4 px-6 font-bold text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredProducts.map(product => (
                  <tr key={product.id} className="border-b border-border/50 hover:bg-background/50 transition-colors">
                    <td className="py-3 px-6">
                      <div className="w-12 h-12 bg-muted rounded overflow-hidden">
                        <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                      </div>
                    </td>
                    <td className="py-3 px-6 font-bold">{product.name}</td>
                    <td className="py-3 px-6 text-muted-foreground uppercase text-sm">{product.category}</td>
                    <td className="py-3 px-6 text-primary font-bold">Rs. {product.price.toLocaleString()}</td>
                    <td className="py-3 px-6">
                      <span className={`px-2 py-1 rounded text-xs font-bold ${product.stock > 0 ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                        {product.stock}
                      </span>
                    </td>
                    <td className="py-3 px-6 flex gap-1">
                      {product.badge && <span className="px-2 py-0.5 bg-blue-500/20 text-blue-400 rounded text-xs font-bold">{product.badge}</span>}
                      {product.isTrending && <span className="px-2 py-0.5 bg-primary/20 text-primary rounded text-xs font-bold">TRENDING</span>}
                    </td>
                    <td className="py-3 px-6 text-right">
                      <button onClick={() => openModal(product)} className="p-2 text-muted-foreground hover:text-primary transition-colors inline-block mr-2"><Edit2 size={16} /></button>
                      <button onClick={() => handleDelete(product.id)} className="p-2 text-muted-foreground hover:text-destructive transition-colors inline-block"><Trash2 size={16} /></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

        </main>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-card border border-border rounded-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-border flex justify-between items-center sticky top-0 bg-card z-10">
              <h2 className="text-xl font-heading font-bold uppercase">{editingId ? 'CONFIGURE GEAR' : 'ADD NEW GEAR'}</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-muted-foreground hover:text-primary"><X size={24} /></button>
            </div>
            
            <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div className="col-span-2">
                  <label className="block text-sm font-bold uppercase mb-2">Item Name</label>
                  <input {...register('name')} className="w-full bg-background border border-border rounded px-4 py-2 focus:border-primary focus:outline-none" />
                  {errors.name && <p className="text-destructive text-xs mt-1">{errors.name.message}</p>}
                </div>
                
                <div className="col-span-2">
                  <label className="block text-sm font-bold uppercase mb-2">Description</label>
                  <textarea {...register('description')} rows={3} className="w-full bg-background border border-border rounded px-4 py-2 focus:border-primary focus:outline-none resize-none" />
                </div>

                <div>
                  <label className="block text-sm font-bold uppercase mb-2">Category</label>
                  <select {...register('category')} className="w-full bg-background border border-border rounded px-4 py-2 focus:border-primary focus:outline-none">
                    <option>Headphones</option>
                    <option>Earbuds</option>
                    <option>Splitters</option>
                    <option>Cooling Fans</option>
                    <option>Mobile Accessories</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-bold uppercase mb-2">Price (PKR)</label>
                  <input type="number" {...register('price')} className="w-full bg-background border border-border rounded px-4 py-2 focus:border-primary focus:outline-none" />
                </div>

                <div>
                  <label className="block text-sm font-bold uppercase mb-2">Stock</label>
                  <input type="number" {...register('stock')} className="w-full bg-background border border-border rounded px-4 py-2 focus:border-primary focus:outline-none" />
                </div>

                <div>
                  <label className="block text-sm font-bold uppercase mb-2">Rating (1-5)</label>
                  <input type="number" step="1" {...register('rating')} className="w-full bg-background border border-border rounded px-4 py-2 focus:border-primary focus:outline-none" />
                </div>

                <div className="col-span-2">
                  <label className="block text-sm font-bold uppercase mb-2">Image URL (Unsplash)</label>
                  <input {...register('image')} className="w-full bg-background border border-border rounded px-4 py-2 focus:border-primary focus:outline-none" />
                </div>

                <div>
                  <label className="block text-sm font-bold uppercase mb-2">Badge</label>
                  <select {...register('badge')} className="w-full bg-background border border-border rounded px-4 py-2 focus:border-primary focus:outline-none">
                    <option value="">None</option>
                    <option value="NEW">NEW</option>
                    <option value="TRENDING">TRENDING</option>
                    <option value="SALE">SALE</option>
                  </select>
                </div>

                <div className="col-span-2 flex gap-6">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" {...register('isTrending')} className="accent-primary w-4 h-4" />
                    <span className="font-bold uppercase text-sm">Trending</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" {...register('isNew')} className="accent-primary w-4 h-4" />
                    <span className="font-bold uppercase text-sm">New</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" {...register('isSale')} className="accent-primary w-4 h-4" />
                    <span className="font-bold uppercase text-sm">Sale</span>
                  </label>
                </div>
              </div>

              <div className="pt-4 border-t border-border flex justify-end gap-4">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-6 py-2 rounded font-bold uppercase border border-border hover:bg-background">Cancel</button>
                <button type="submit" className="bg-primary text-primary-foreground px-6 py-2 rounded font-bold uppercase hover:glow-cyan">Save Gear</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminProducts;
