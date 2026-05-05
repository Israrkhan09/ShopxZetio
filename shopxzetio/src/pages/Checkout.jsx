import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { ArrowLeft } from 'lucide-react';
import { addOrder } from '../redux/ordersSlice';
import { clearCart } from '../redux/cartSlice';
import { decreaseStock } from '../redux/productsSlice';

const checkoutSchema = z.object({
  fullName: z.string().min(3, { message: "Name must be at least 3 characters" }),
  phone: z.string().regex(/^03\d{9}$/, { message: "Invalid phone format (e.g. 03001234567)" }),
  address: z.string().min(10, { message: "Please provide a complete address" }),
  city: z.string().min(2, { message: "City is required" }),
  paymentMethod: z.enum(['COD', 'JazzCash', 'EasyPaisa'])
});

const Checkout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cartItems = useSelector(state => state.cart.items);
  
  const subtotal = cartItems.reduce((acc, item) => acc + (item.product.price * item.qty), 0);
  const deliveryFee = 200;
  const total = subtotal + deliveryFee;

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      paymentMethod: 'COD'
    }
  });

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen pt-32 flex flex-col items-center px-4 text-center">
        <h2 className="text-[35px] font-heading font-bold text-white mb-4">CANNOT PROCEED</h2>
        <p className="text-[18px] text-muted-foreground uppercase mb-8">Your cart is empty.</p>
        <Link to="/shop" className="bg-primary text-primary-foreground px-8 py-3 rounded font-bold uppercase hover:glow-cyan">
          RETURN TO SHOP
        </Link>
      </div>
    );
  }

  const onSubmit = (data) => {
    const orderId = `ORD-${Math.floor(1000 + Math.random() * 9000)}`;
    const orderItems = cartItems.map(item => ({
      productId: item.product.id,
      name: item.product.name,
      qty: item.qty,
      price: item.product.price
    }));

    const newOrder = {
      id: orderId,
      customerName: data.fullName,
      phone: data.phone,
      address: data.address,
      city: data.city,
      paymentMethod: data.paymentMethod,
      status: 'Pending',
      items: orderItems,
      totalAmount: total,
      createdAt: new Date().toISOString()
    };

    dispatch(addOrder(newOrder));
    dispatch(decreaseStock(cartItems.map(item => ({ id: item.product.id, qty: item.qty }))));
    dispatch(clearCart());
    
    navigate('/order-confirmation', { 
      state: { orderId, customerName: data.fullName, totalAmount: total } 
    });
  };

  return (
    <div className="min-h-screen pt-24 pb-12">
      <div className="container mx-auto px-4 md:px-6">
        <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-muted-foreground hover:text-primary mb-8 font-bold uppercase transition-colors">
          <ArrowLeft size={18} /> BACK TO CART
        </button>

        <h1 className="text-[45px] font-heading font-black text-white uppercase mb-8">SECURE CHECKOUT</h1>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Form */}
          <div className="flex-1 bg-card border border-border p-6 md:p-8 rounded-xl">
            <h2 className="font-heading font-bold text-[35px] text-white mb-6 border-b border-border pb-4">SHIPPING DETAILS</h2>
            
            <form id="checkout-form" onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div>
                <label className="block text-sm font-bold uppercase mb-2">FULL NAME</label>
                <input
                  {...register('fullName')}
                  className="w-full bg-background border border-border rounded px-4 py-3 focus:outline-none focus:border-primary transition-colors"
                  placeholder="John Doe"
                />
                {errors.fullName && <p className="text-destructive text-sm mt-1">{errors.fullName.message}</p>}
              </div>

              <div>
                <label className="block text-sm font-bold uppercase mb-2">PHONE NUMBER (11 DIGITS)</label>
                <input
                  {...register('phone')}
                  className="w-full bg-background border border-border rounded px-4 py-3 focus:outline-none focus:border-primary transition-colors"
                  placeholder="03XXXXXXXXX"
                />
                {errors.phone && <p className="text-destructive text-sm mt-1">{errors.phone.message}</p>}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                  <label className="block text-sm font-bold uppercase mb-2">DELIVERY ADDRESS</label>
                  <textarea
                    {...register('address')}
                    rows={3}
                    className="w-full bg-background border border-border rounded px-4 py-3 focus:outline-none focus:border-primary transition-colors resize-none"
                    placeholder="House, Street, Area..."
                  />
                  {errors.address && <p className="text-destructive text-sm mt-1">{errors.address.message}</p>}
                </div>

                <div>
                  <label className="block text-sm font-bold uppercase mb-2">CITY</label>
                  <input
                    {...register('city')}
                    className="w-full bg-background border border-border rounded px-4 py-3 focus:outline-none focus:border-primary transition-colors"
                    placeholder="Lahore"
                  />
                  {errors.city && <p className="text-destructive text-sm mt-1">{errors.city.message}</p>}
                </div>
              </div>

              <h2 className="font-heading font-bold text-[35px] text-white mb-6 border-b border-border pb-4 mt-12">PAYMENT METHOD</h2>
              
              <div className="space-y-3">
                {['COD', 'JazzCash', 'EasyPaisa'].map(method => (
                  <label key={method} className={`flex items-center gap-3 p-4 border rounded cursor-pointer transition-colors ${
                    errors.paymentMethod ? 'border-destructive' : 'border-border hover:border-primary'
                  }`}>
                    <div className="relative flex items-center justify-center w-5 h-5 rounded-full border border-border">
                      <input
                        type="radio"
                        value={method}
                        {...register('paymentMethod')}
                        className="appearance-none w-full h-full rounded-full border border-transparent checked:border-primary transition-colors cursor-pointer"
                      />
                      <div className="absolute w-2.5 h-2.5 bg-primary rounded-full pointer-events-none opacity-0 toggle-checked:opacity-100" />
                    </div>
                    <span className="font-bold uppercase">{method === 'COD' ? 'CASH ON DELIVERY' : method}</span>
                  </label>
                ))}
              </div>
            </form>
          </div>

          {/* Summary */}
          <div className="w-full lg:w-[400px]">
            <div className="bg-card border border-border p-6 rounded-xl sticky top-24">
              <h2 className="font-heading font-bold text-[35px] text-white mb-6 border-b border-border pb-4">ORDER SUMMARY</h2>
              
              <div className="space-y-4 mb-6 max-h-[300px] overflow-y-auto pr-2">
                {cartItems.map(item => (
                  <div key={item.product.id} className="flex justify-between items-center gap-4 text-sm">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-muted rounded overflow-hidden flex-shrink-0">
                        <img src={item.product.image} alt={item.product.name} className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <div className="font-bold truncate max-w-[150px]">{item.product.name}</div>
                        <div className="text-muted-foreground">QTY: {item.qty}</div>
                      </div>
                    </div>
                    <div className="font-bold text-primary shrink-0">Rs. {(item.product.price * item.qty).toLocaleString()}</div>
                  </div>
                ))}
              </div>

              <div className="space-y-3 text-sm border-t border-border pt-4">
                <div className="flex justify-between font-bold uppercase">
                  <span className="text-muted-foreground">SUBTOTAL</span>
                  <span>Rs. {subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between font-bold uppercase">
                  <span className="text-muted-foreground">DELIVERY FEE</span>
                  <span>Rs. {deliveryFee.toLocaleString()}</span>
                </div>
              </div>

              <div className="flex justify-between font-bold text-xl border-t border-border mt-4 pt-4 mb-8">
                <span>TOTAL</span>
                <span className="text-primary">Rs. {total.toLocaleString()}</span>
              </div>

              <button
                type="submit"
                form="checkout-form"
                className="w-full bg-primary text-primary-foreground py-4 rounded font-bold uppercase tracking-wider hover:glow-cyan transition-all text-lg"
                data-testid="btn-place-order"
              >
                PLACE ORDER
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
